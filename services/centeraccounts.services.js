const db = require("./db");
const helper = require("../helper");
const moment = require("moment");
moment.suppressDeprecationWarnings = true;
async function BookingDataTable(txn_id) {
  const rows = await db.query(
    `SELECT s_no,account_id, booking_id, booking_order_id,reference_id,invoice_number,partner_id, partner_sub_id, hotel_txn_id, room_txn_id, property_name, property_type, room_type, near_hospital_id, near_hospital_name,DATE_FORMAT(check_in,'%Y/%m/%d') as check_in, DATE_FORMAT(check_out,'%Y/%m/%d') as check_out, guest_count, no_of_days, room_price, discount,partner_offer,base_price, discount_price, price_after_discount, mh_offer_price, mh_offer_name, gst_percentage, gst_amount,cgst_percentage, cgst_amount,sgst_percentage, sgst_amount, total_price, country_code, country_name,phone_no,primary_no,alternate_email_id,address_line_1,address_line_2,state_id,state_name,city,property_city_id,property_city_name,property_state_id,property_state_name,email_id,alternate_no,pincode,gstin_no,booking_status,date_format(inserted_date_time,'%d/%m/%Y') as inserted_date_time,date_format(inserted_date_time,'DD MMM YYYY') as inserted_date,checkIn_time,checkOut_time,facilities,room_booked_count,   date_format(inserted_date_time,'%Y/%m/%d' ) as booked_date,partner_offer_percentage,partner_offer FROM mh_bookings_table WHERE hotel_txn_id='${txn_id}' ORDER BY inserted_date_time DESC`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  let guestData = "";
  let partner_name = "";
  let sub_partner_name = "";
  let food_details = "";
  let propertyGstNumber = "";
  let agent_commission = "";
  let travel_details = "";
  let medical_details = "";
  let mh_service_fee = "";
  let dateOfCancellationData = "";
  let cancelledAmountData = "";
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      partner_name = await helper.loadPartnerName(element.partner_id);
      food_details = await helper.loadFoodDetailsData(element.booking_order_id);
      medical_details = await helper.loadMedicalDetailsData(
        element.booking_order_id
      );
      travel_details = await helper.loadTravelDetailsData(
        element.booking_order_id
      );

      guestData = await helper.loadGuestDetailsDataFromDb(
        element.booking_order_id
      );
      mh_service_fee = await helper.getMhService(element.account_id);
      propertyGstNumber = await helper.loadpropertyGstNumberFromDb(
        element.account_id
      );
      agent_commission = await helper.loadAgentCommissionFromDb(
        element.account_id
      );
      dateOfCancellationData = await helper.loaddateOfCancellationDataFromDb(
        element.booking_order_id
      );
      cancelledAmountData = await helper.loadcancelledAmountDataFromDb(
        element.booking_order_id
      );

      const grossAmount = element.room_price || 0;
      const discountMH = element.partner_offer || 0;
      const discountPartner = element.discount_price || 0;
      let netValue = grossAmount - discountMH - discountPartner;
      const checkInDate = new Date(element.check_in);
      const checkOutDate = new Date(element.check_out);
      const durationDifference = checkOutDate - checkInDate;
      const durationOfStay = durationDifference / (1000 * 60 * 60 * 24);
      const dateOfCancellation = new Date(
        dateOfCancellationData[0]?.created_datetime
      );
      const timeDifference = dateOfCancellation - checkInDate;
      const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

      const noOfDays = parseInt(element.no_of_days);
      const priceAfterDiscount = parseInt(element.total_price);
      const singleDay = priceAfterDiscount / noOfDays;
      const gstAmount = parseInt(element.gst_amount);

      const tds = Math.round(grossAmount - discountPartner) * 0.01;
      const tdsValue = tds.toFixed(0);

      const grossPayable = parseInt(grossAmount + gstAmount - tds - tdsValue);
      let refund = 0;
      if (daysDifference >= 3) {
        refund = 0;
      } else if (daysDifference === 2) {
        refund = 0;
      } else if (daysDifference === 1) {
        if (noOfDays > 2) {
          refund = singleDay + gstAmount;
        } else {
          refund = 0.5 * singleDay + 0.5 * gstAmount;
        }
      }
      const partnerRefund = refund === 0 ? "" : refund.toFixed(0);

      const mhServiceFeePercentage =
        parseFloat(mh_service_fee[0].mh_service_fee) / 100;

      const mhCommission = Math.round(grossAmount * mhServiceFeePercentage);
      const mhCommissionpercen = Math.round(mhCommission * 0.18);

      const mhCommissionRounded = Math.round(mhCommission + mhCommissionpercen);

      const totalPayableToPartner = Math.round(
        grossPayable - mhCommissionRounded
      );

      // console.log("sasa",totalPayableToPartner);

      index = index + 1;

      data.push({
        index: index,
        partner_name: partner_name,
        sub_partner_name: sub_partner_name,
        guest_name: guestData[0].guest_name,
        mh_service_fee: mh_service_fee,
        property_gstin: propertyGstNumber[0].property_gstin,
        agent_commission: agent_commission,
        food_details: food_details,
        travel_details: travel_details,
        medical_details: medical_details,
        dateOfCancellationData: dateOfCancellationData[0]?.created_datetime,
        cancelledAmountData: cancelledAmountData[0]?.refundAmount,
        partnerAmountonCancel: cancelledAmountData[0]?.partner_amount_on_cancel,
        mhAmountonCancel: cancelledAmountData[0]?.cancellAmount,
        daysDifference: daysDifference,
        partnerRefund: partnerRefund,
        durationOfStay: durationOfStay,
        netValue: netValue,
        tdsValue: tdsValue,
        grossPayable: grossPayable,
        mhCommissionRounded: mhCommissionRounded,
        mhCommission: mhCommission,
        mhCommissionpercen: mhCommissionpercen,
        totalPayableToPartner: totalPayableToPartner,
        ...element,
      });
      // console.log("data123",data)
    }
  }

  return { data };
}

async function masterreportsdetails(accountid) {
  const rows = await db.query(
    `SELECT s_no,account_id, booking_id, booking_order_id,reference_id,invoice_number,partner_id, partner_sub_id, hotel_txn_id, room_txn_id, property_name, property_type, room_type, near_hospital_id, near_hospital_name, check_in, check_out, guest_count, no_of_days, room_price, discount, discount_price, price_after_discount, mh_offer_price, mh_offer_name, gst_percentage, gst_amount,cgst_percentage, cgst_amount,sgst_percentage, sgst_amount, total_price, country_code, country_name,phone_no,primary_no,alternate_email_id,address_line_1,address_line_2,state_id,state_name,city,property_city_id,property_city_name,property_state_id,property_state_name,email_id,alternate_no,pincode,gstin_no,booking_status,date_format(inserted_date_time,'%d/%m/%y') as inserted_date_time,date_format(inserted_date_time,'DD MMM YYYY') as inserted_date,checkIn_time,checkOut_time,facilities FROM mh_bookings_table WHERE account_id='${accountid}' ORDER BY inserted_date_time DESC`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  // let hotel_image = "";
  // let room_image1 = "";
  // let room_image2 = "";
  // let room_image3 = "";
  let guestData = "";
  let cancellationData = "";
  let propertyRoomDetails = "";
  let partner_name = "";
  let sub_partner_name = "";
  let food_details = "";
  let travel_details = "";
  let medical_details = "";
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      partner_name = await helper.loadPartnerName(element.partner_id);
      food_details = await helper.loadFoodDetailsData(element.booking_order_id);
      medical_details = await helper.loadMedicalDetailsData(
        element.booking_order_id
      );
      travel_details = await helper.loadTravelDetailsData(
        element.booking_order_id
      );
      sub_partner_name = await helper.loadSubPartnerName(
        element.partner_id,
        element.partner_sub_id
      );
      guestData = await helper.loadGuestDetailsDataFromDb(
        element.booking_order_id
      );
      cancellationData = await helper.getCancellationForMasterReport(
        element.booking_order_id
      );

      propertyRoomDetails = await helper.getPropertyRoomDetailsForMasterReport(
        element.partner_id,
        element.partner_sub_id,
        element.account_id
      );
      // hotel_image = await helper.loadHotelImageBasedonPartner(
      //   element.partner_id,
      //   element.partner_sub_id,
      //   element.hotel_txn_id
      // );
      // room_image1 = await helper.getRoomImage1(
      //   element.partner_id,
      //   element.partner_sub_id,
      //   element.hotel_txn_id,
      //   element.room_txn_id
      // );
      // room_image2 = await helper.getRoomImage2(
      //   element.partner_id,
      //   element.partner_sub_id,
      //   element.hotel_txn_id,
      //   element.room_txn_id
      // );
      // room_image3 = await helper.getRoomImage3(
      //   element.partner_id,
      //   element.partner_sub_id,
      //   element.hotel_txn_id,
      //   element.room_txn_id
      // );
      index = index + 1;

      data.push({
        sno: index,
        partner_name: partner_name,
        sub_partner_name: sub_partner_name,
        // hotel_image: hotel_image,
        // room_image1: room_image1,
        // room_image2: room_image2,
        // room_image3: room_image3,
        guestData: guestData,
        food_details: food_details,
        travel_details: travel_details,
        medical_details: medical_details,
        cancellationData: cancellationData,
        propertyRoomDetails: propertyRoomDetails,
        ...element,
      });
    }
  }

  return { data };
}
async function getAdminreportsdetails() {
  const rows = await db.query(
    `SELECT s_no,account_id, booking_id, booking_order_id,reference_id,invoice_number,partner_id, partner_sub_id, hotel_txn_id, room_txn_id, property_name, property_type, room_type, near_hospital_id, near_hospital_name, check_in, check_out, guest_count, no_of_days, room_price, discount, discount_price, price_after_discount, mh_offer_price, mh_offer_name, gst_percentage, gst_amount,cgst_percentage, cgst_amount,sgst_percentage, sgst_amount, total_price, country_code, country_name,phone_no,primary_no,alternate_email_id,address_line_1,address_line_2,state_id,state_name,city,property_city_id,property_city_name,property_state_id,property_state_name,email_id,alternate_no,pincode,gstin_no,booking_status,date_format(inserted_date_time,'%d/%m/%y') as inserted_date_time,date_format(inserted_date_time,'DD MMM YYYY') as inserted_date,checkIn_time,checkOut_time,facilities FROM mh_bookings_table  ORDER BY inserted_date_time DESC`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  let hotel_image = "";
  let room_image1 = "";
  let room_image2 = "";
  let room_image3 = "";
  let guestData = "";
  let cancellationData = "";
  let propertyRoomDetails = "";
  let partner_name = "";
  let sub_partner_name = "";
  let food_details = "";
  let travel_details = "";
  let medical_details = "";
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      partner_name = await helper.loadPartnerName(element.partner_id);
      food_details = await helper.loadFoodDetailsData(element.booking_order_id);
      medical_details = await helper.loadMedicalDetailsData(
        element.booking_order_id
      );
      travel_details = await helper.loadTravelDetailsData(
        element.booking_order_id
      );
      sub_partner_name = await helper.loadSubPartnerName(
        element.partner_id,
        element.partner_sub_id
      );
      guestData = await helper.loadGuestDetailsDataFromDb(
        element.booking_order_id
      );
      cancellationData = await helper.getCancellationForMasterReport(
        element.booking_order_id
      );

      propertyRoomDetails = await helper.getPropertyRoomDetailsForMasterReport(
        element.partner_id,
        element.partner_sub_id,
        element.account_id
      );
      // hotel_image = await helper.loadHotelImageBasedonPartner(
      //   element.partner_id,
      //   element.partner_sub_id,
      //   element.hotel_txn_id
      // );
      // room_image1 = await helper.getRoomImage1(
      //   element.partner_id,
      //   element.partner_sub_id,
      //   element.hotel_txn_id,
      //   element.room_txn_id
      // );
      // room_image2 = await helper.getRoomImage2(
      //   element.partner_id,
      //   element.partner_sub_id,
      //   element.hotel_txn_id,
      //   element.room_txn_id
      // );
      // room_image3 = await helper.getRoomImage3(
      //   element.partner_id,
      //   element.partner_sub_id,
      //   element.hotel_txn_id,
      //   element.room_txn_id
      // );
      index = index + 1;

      data.push({
        sno: index,
        partner_name: partner_name,
        sub_partner_name: sub_partner_name,
        // hotel_image: hotel_image,
        // room_image1: room_image1,
        // room_image2: room_image2,
        // room_image3: room_image3,
        guestData: guestData,
        food_details: food_details,
        travel_details: travel_details,
        medical_details: medical_details,
        cancellationData: cancellationData,
        propertyRoomDetails: propertyRoomDetails,
        ...element,
      });
    }
  }

  return { data };
}
async function propertyreportsdetails() {
  const rows = await db.query(
    `SELECT a.city_name,a.sub_property_name as property_name,a.txn_id as property_code,a.account_id as partnerid,a.partner_name,a.partner_phone,concat(a.building_no,a.street,a.land_mark) as address,a.pin_code,a.property_email,b.pan,b.gstin,b.bankAccountNo,b.bankName,b.branchName,b.ifsc FROM mh_property_details_table a JOIN mh_property_master b ON a.account_id = b.account_id ORDER BY a.txn_id ASC`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      index = index + 1;

      data.push({
        sno: index,
        ...element,
      });
    }
  }

  return { data };
}

async function propertywisereportsdetails() {
  const rows = await db.query(
    `SELECT property_name, COUNT(s_no) AS total_bookings,SUM(no_of_days * room_booked_count ) as total_nights, SUM(guest_count) as total_guests,SUM(room_booked_count) as total_rooms,SUM(total_price) as booking_amount,round(SUM(total_price)/COUNT(s_no)) as avg_booking_amount,round(SUM(total_price)/SUM(no_of_days * room_booked_count )) as avg_booking_nightvalue  FROM mh_bookings_table WHERE inserted_date_time > '2023-03-15' AND total_price > 200 AND booking_status = 'Booked' GROUP BY property_name order by total_nights DESC`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      index = index + 1;

      data.push({
        sno: index,
        ...element,
      });
    }
  }

  return { data };
}

async function propertymonthswisereportsdetails() {
  const rows = await db.query(
    ` SELECT concat(MONTHNAME(inserted_date_time),', ',YEAR(inserted_date_time)) AS month_name,property_name, COUNT(s_no) AS total_bookings,SUM(no_of_days * room_booked_count ) as total_nights, SUM(guest_count) as total_guests,SUM(room_booked_count) as total_rooms,SUM(total_price) as booking_amount,round(SUM(total_price)/COUNT(s_no)) as avg_booking_amount,round(SUM(total_price)/SUM(no_of_days * room_booked_count )) as avg_booking_nightvalue FROM mh_bookings_table WHERE inserted_date_time > '2023-03-15' AND total_price > 200 AND booking_status = 'Booked' GROUP BY property_name, MONTHNAME(inserted_date_time) order by MONTH(inserted_date_time)`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      index = index + 1;

      data.push({
        sno: index,
        ...element,
      });
    }
  }

  return { data };
}

async function foodreportmethod(accountid) {
  const rows = await db.query(
    `SELECT txn_id, account_id, agent_id, agent_sub_id, food_partner_name, food_partner_sub_name, food_partner_phone, name_of_kitchen, type_of_kitchen, fssai_no, upload_fssai, special_offer, date_from, date_to, restaurant_description, restaurant_phone, restaurant_email, restaurant_latitude, restaurant_longitude, building_no, street, land_mark, country, state_id, state_name, city_id, city_name, pin_code, opening_time, closing_time, Name_Of_Contact_Person, upload_image, upload_image1, upload_image2 FROM mh_restaurant_details_table WHERE account_id='${accountid}'`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      index = index + 1;

      data.push({
        sno: index,
        ...element,
      });
    }
  }
  return { data };
}

async function travelreportmethod(accountid) {
  const rows = await db.query(
    `SELECT tnx_id, agent_id, transport_sub_id, account_id, transport_sub_name, agent_name, transport_company_name, special_offer, from_date, to_date, transport_phone, transport_email_id, Name_Of_Contact_Person, transport_description, building_no, street, land_mark, country, city_id, city, state_id, state, pin_code, transport_latitude, transport_longitude, upload_image1, upload_image2, status, created_datetime, updated_datetime FROM mh_transport_details WHERE account_id='${accountid}'`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      index = index + 1;

      data.push({
        sno: index,
        ...element,
      });
    }
  }
  return { data };
}

async function medicalreportmethod(accountid) {
  const rows = await db.query(
    `SELECT txn_id, account_id, equipment_id, equipment_sub_id, agent_name, equipment_sub_name, medical_store_name, special_offer, from_date, to_date, description, phone, email, name_of_contact_person, building_no, street, land_mark, country, state_id, state_name, city_id, city_name, pin_code, latitude, longitude, opening_time, closing_time, upload_image1, upload_image2, upload_image3, status, created_datetime, updated_datetime FROM mh_medical_stores_table  WHERE account_id='${accountid}'`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      index = index + 1;

      data.push({
        sno: index,
        ...element,
      });
    }
  }
  return { data };
}

async function getAdminreportsForTravelBooking() {
  const rows = await db.query(
    `SELECT  sno, booking_id, booking_order_id, travel_booking_id, travel_booking_orderid, invoice_number, travel_reference_id, property_city_name, property_city_id, hotel_property_name, near_hospital_name, check_in, check_out, guest_count, no_of_days, booked_date, booking_origin, booking_destination, booking_time, travel_charges, discount, discount_price, base_price, mh_offer_price, mh_offer_coupon, price_after_discount, gst_percentage, gst_on_base_price, cgst_percentage, cgst_amount, sgst_percentage, sgst_amount, payable_amount, country_code, country_name, mobile_number, gst_number, account_id, agent_id, travel_name, transport_sub_id, transport_sub_name, whatsapp_number, email_id, booking_status, updated_datetime FROM mh_travel_booking_table  ORDER BY 	updated_datetime`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  let hotel_image = "";
  let room_image1 = "";
  let room_image2 = "";
  let room_image3 = "";
  let guestData = "";
  let cancellationData = "";
  let propertyRoomDetails = "";
  let partner_name = "";
  let sub_partner_name = "";
  let food_details = "";
  let travel_details = "";
  let medical_details = "";
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      // partner_name = await helper.loadPartnerName(element.partner_id);
      food_details = await helper.loadFoodDetailsData(element.booking_order_id);
      medical_details = await helper.loadMedicalDetailsData(
        element.booking_order_id
      );
      travel_details = await helper.loadTravelDetailsData(
        element.booking_order_id
      );
      // sub_partner_name = await helper.loadSubPartnerName(
      //   element.partner_id,
      //   element.partner_sub_id
      // );
      guestData = await helper.loadGuestDetailsDataFromDb(
        element.booking_order_id
      );
      cancellationData = await helper.getCancellationForMasterReport(
        element.booking_order_id
      );

      propertyRoomDetails = await helper.getPropertyRoomDetailsForMasterReport(
        element.partner_id,
        element.partner_sub_id,
        element.account_id
      );
      // hotel_image = await helper.loadHotelImageBasedonPartner(
      //   element.partner_id,
      //   element.partner_sub_id,
      //   element.hotel_txn_id
      // );
      // room_image1 = await helper.getRoomImage1(
      //   element.partner_id,
      //   element.partner_sub_id,
      //   element.hotel_txn_id,
      //   element.room_txn_id
      // );
      // room_image2 = await helper.getRoomImage2(
      //   element.partner_id,
      //   element.partner_sub_id,
      //   element.hotel_txn_id,
      //   element.room_txn_id
      // );
      // room_image3 = await helper.getRoomImage3(
      //   element.partner_id,
      //   element.partner_sub_id,
      //   element.hotel_txn_id,
      //   element.room_txn_id
      // );
      index = index + 1;

      data.push({
        sno: index,
        partner_name: partner_name,
        sub_partner_name: sub_partner_name,
        hotel_image: hotel_image,
        room_image1: room_image1,
        room_image2: room_image2,
        room_image3: room_image3,
        guestData: guestData,
        food_details: food_details,
        travel_details: travel_details,
        medical_details: medical_details,
        cancellationData: cancellationData,
        propertyRoomDetails: propertyRoomDetails,
        ...element,
      });
    }
  }

  return { data };
}

async function getAdminreportsForMedicalBooking() {
  const rows = await db.query(
    `SELECT  sno, booking_id, booking_order_id, medical_booking_id, medical_booking_orderid, invoice_number, medical_reference_id, booking_city, booking_city_id, hotel_property_name, near_hospital_name, check_in, check_out, guest_count, no_of_days, eqp_booking_date, eqp_booking_type, days_booked_for, total_qty_booked, total_item_qty, account_id, equipment_name, equipment_id, equipment_sub_name, equipment_sub_id, medical_charges, discount, discount_price, base_price, mh_offer_price, mh_offer_coupon, price_after_discount, gst_percentage, gst_on_base_price, cgst_percentage, cgst_amount, sgst_percentage, sgst_amount, final_price_amount, country_name, country_code, mobile_number, whatsapp_number, email_id, gstin_no, booking_status, updated_time FROM mh_equipment_booking_table ORDER BY	updated_time`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  let hotel_image = "";
  let room_image1 = "";
  let room_image2 = "";
  let room_image3 = "";
  let guestData = "";
  let cancellationData = "";
  let propertyRoomDetails = "";
  let partner_name = "";
  let sub_partner_name = "";
  let food_details = "";
  let travel_details = "";
  let medical_details = "";
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      // partner_name = await helper.loadPartnerName(element.partner_id);
      food_details = await helper.loadFoodDetailsData(element.booking_order_id);
      medical_details = await helper.loadMedicalDetailsData(
        element.booking_order_id
      );
      travel_details = await helper.loadTravelDetailsData(
        element.booking_order_id
      );
      // sub_partner_name = await helper.loadSubPartnerName(
      //   element.partner_id,
      //   element.partner_sub_id
      // );
      guestData = await helper.loadGuestDetailsDataFromDb(
        element.booking_order_id
      );
      cancellationData = await helper.getCancellationForMasterReport(
        element.booking_order_id
      );

      propertyRoomDetails = await helper.getPropertyRoomDetailsForMasterReport(
        element.partner_id,
        element.partner_sub_id,
        element.account_id
      );
      // hotel_image = await helper.loadHotelImageBasedonPartner(
      //   element.partner_id,
      //   element.partner_sub_id,
      //   element.hotel_txn_id
      // );
      // room_image1 = await helper.getRoomImage1(
      //   element.partner_id,
      //   element.partner_sub_id,
      //   element.hotel_txn_id,
      //   element.room_txn_id
      // );
      // room_image2 = await helper.getRoomImage2(
      //   element.partner_id,
      //   element.partner_sub_id,
      //   element.hotel_txn_id,
      //   element.room_txn_id
      // );
      // room_image3 = await helper.getRoomImage3(
      //   element.partner_id,
      //   element.partner_sub_id,
      //   element.hotel_txn_id,
      //   element.room_txn_id
      // );
      index = index + 1;

      data.push({
        sno: index,
        partner_name: partner_name,
        sub_partner_name: sub_partner_name,
        hotel_image: hotel_image,
        room_image1: room_image1,
        room_image2: room_image2,
        room_image3: room_image3,
        guestData: guestData,
        food_details: food_details,
        travel_details: travel_details,
        medical_details: medical_details,
        cancellationData: cancellationData,
        propertyRoomDetails: propertyRoomDetails,
        ...element,
      });
    }
  }

  return { data };
}

async function getAdminreportsForFoodBooking() {
  const rows = await db.query(
    `SELECT s_no, account_id, booking_id, booking_order_id, food_booking_id, food_booking_orderid, invoice_number, food_reference_id, booking_city, booking_city_id, hotel_property_name, near_hospital_name, near_hospital_id, check_in, check_out, guest_count, no_of_days, foodPartner_name, food_partner_id, foodPartner_sub_name, food_partner_sub_id, food_booking_date, food_booking_type, total_qty_booked, total_item_qty, food_charges, discount, discount_price, base_price, mh_offer_price, mh_offer_coupon, price_after_discount, gst_percentage, gst_on_base_price, cgst_percentage, cgst_amount, sgst_percentage, sgst_amount, final_price_amount, country_name, country_code, mobile_number, whatsapp_number, email_id, gstin_no, booking_status, updated_time FROM mh_food_booking_table ORDER BY	updated_time`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  let hotel_image = "";
  let room_image1 = "";
  let room_image2 = "";
  let room_image3 = "";
  let guestData = "";
  let cancellationData = "";
  let propertyRoomDetails = "";
  let partner_name = "";
  let sub_partner_name = "";
  let food_details = "";
  let travel_details = "";
  let medical_details = "";
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      // partner_name = await helper.loadPartnerName(element.partner_id);
      food_details = await helper.loadFoodDetailsData(element.booking_order_id);
      medical_details = await helper.loadMedicalDetailsData(
        element.booking_order_id
      );
      travel_details = await helper.loadTravelDetailsData(
        element.booking_order_id
      );
      // sub_partner_name = await helper.loadSubPartnerName(
      //   element.partner_id,
      //   element.partner_sub_id
      // );
      guestData = await helper.loadGuestDetailsDataFromDb(
        element.booking_order_id
      );
      cancellationData = await helper.getCancellationForMasterReport(
        element.booking_order_id
      );

      propertyRoomDetails = await helper.getPropertyRoomDetailsForMasterReport(
        element.partner_id,
        element.partner_sub_id,
        element.account_id
      );
      // hotel_image = await helper.loadHotelImageBasedonPartner(
      //   element.partner_id,
      //   element.partner_sub_id,
      //   element.hotel_txn_id
      // );
      // room_image1 = await helper.getRoomImage1(
      //   element.partner_id,
      //   element.partner_sub_id,
      //   element.hotel_txn_id,
      //   element.room_txn_id
      // );
      // room_image2 = await helper.getRoomImage2(
      //   element.partner_id,
      //   element.partner_sub_id,
      //   element.hotel_txn_id,
      //   element.room_txn_id
      // );
      // room_image3 = await helper.getRoomImage3(
      //   element.partner_id,
      //   element.partner_sub_id,
      //   element.hotel_txn_id,
      //   element.room_txn_id
      // );
      index = index + 1;

      data.push({
        sno: index,
        partner_name: partner_name,
        sub_partner_name: sub_partner_name,
        hotel_image: hotel_image,
        room_image1: room_image1,
        room_image2: room_image2,
        room_image3: room_image3,
        guestData: guestData,
        food_details: food_details,
        travel_details: travel_details,
        medical_details: medical_details,
        cancellationData: cancellationData,
        propertyRoomDetails: propertyRoomDetails,
        ...element,
      });
    }
  }

  return { data };
}

async function getDateWiseAccountsDatails(
  fromDate,
  toDate,
  txn_id,
  property_city_id
) {
  // console.log("conditionbased",fromDate,toDate,txn_id,property_city_id);
  // console.log(fromDate,toDate,txn_id)

  let queryCondition = `inserted_date_time >= '${fromDate}' AND inserted_date_time <= '${toDate} 23:59:59'`;

  if (txn_id !== "ALL" && property_city_id !== "ALL") {
    queryCondition += ` AND hotel_txn_id='${txn_id}' AND property_city_id='${property_city_id}'`;
  }

  const query = `SELECT account_id, booking_id, booking_order_id,reference_id,invoice_number,partner_id, partner_sub_id, hotel_txn_id, room_txn_id, property_name, property_type, room_type, near_hospital_id, near_hospital_name, DATE_FORMAT(check_in,'%d/%m/%Y') as check_in, DATE_FORMAT(check_out,'%d/%m/%Y') as check_out, guest_count, no_of_days, room_price, discount,partner_offer,base_price, discount_price, price_after_discount, mh_offer_price, mh_offer_name, gst_percentage, gst_amount,cgst_percentage, cgst_amount,sgst_percentage, sgst_amount, total_price, country_code, country_name,phone_no,primary_no,alternate_email_id,address_line_1,address_line_2,state_id,state_name,city,property_city_id,property_city_name,property_state_id,property_state_name,email_id,alternate_no,pincode,gstin_no,booking_status,date_format(inserted_date_time,'%d/%m/%y') as inserted_date_time,date_format(inserted_date_time,'DD MMM YYYY') as inserted_date,checkIn_time,checkOut_time,facilities,room_booked_count,DATE_FORMAT(inserted_date_time,'%d/%m/%Y') as booked_date,partner_offer_percentage,partner_offer,mh_service_fee,gst_status FROM mh_bookings_table WHERE ${queryCondition} ORDER BY inserted_date_time DESC`;
  const rows = await db.query(query);
  // const rows = await db.query(
  //   `SELECT account_id, booking_id, booking_order_id,reference_id,invoice_number,partner_id, partner_sub_id, hotel_txn_id, room_txn_id, property_name, property_type, room_type, near_hospital_id, near_hospital_name, DATE_FORMAT(check_in,'%d/%m/%Y') as check_in, DATE_FORMAT(check_out,'%d/%m/%Y') as check_out, guest_count, no_of_days, room_price, discount,partner_offer,base_price, discount_price, price_after_discount, mh_offer_price, mh_offer_name, gst_percentage, gst_amount,cgst_percentage, cgst_amount,sgst_percentage, sgst_amount, total_price, country_code, country_name,phone_no,primary_no,alternate_email_id,address_line_1,address_line_2,state_id,state_name,city,property_city_id,property_city_name,property_state_id,property_state_name,email_id,alternate_no,pincode,gstin_no,booking_status,date_format(inserted_date_time,'%d/%m/%y') as inserted_date_time,date_format(inserted_date_time,'DD MMM YYYY') as inserted_date,checkIn_time,checkOut_time,facilities,room_booked_count,DATE_FORMAT(inserted_date_time,'%d/%m/%Y') as booked_date,partner_offer_percentage,partner_offer FROM mh_bookings_table WHERE hotel_txn_id='${txn_id}'AND property_city_id='${property_city_id}' AND inserted_date_time >= '${fromDate}' AND inserted_date_time <= '${toDate}' ORDER BY inserted_date_time DESC`
  // );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0; 
  let guestData = "";
  let partner_name = "";
  let sub_partner_name = "";
  let food_details = "";
  // let propertyGstNumber = "";
  let agent_commission = "";
  let travel_details = "";
  let medical_details = "";
  // let mh_service_fee = "";
  let dateOfCancellationData = "";
  let cancelledAmountData = "";
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      partner_name = await helper.loadPartnerName(element.partner_id);
      food_details = await helper.loadFoodDetailsData(element.booking_order_id);
      medical_details = await helper.loadMedicalDetailsData(
        element.booking_order_id
      );
      travel_details = await helper.loadTravelDetailsData(
        element.booking_order_id
      );

      guestData = await helper.loadGuestDetailsDataFromDb(
        element.booking_order_id
      );
      // mh_service_fee = await helper.getMhService(element.account_id);
      // propertyGstNumber = await helper.loadpropertyGstNumberFromDb(
      //   element.account_id
      // );
      agent_commission = await helper.loadAgentCommissionFromDb(
        element.account_id
      );
      dateOfCancellationData = await helper.loaddateOfCancellationDataFromDb(
        element.booking_order_id
      );
      cancelledAmountData = await helper.loadcancelledAmountDataFromDb(
        element.booking_order_id
      );

      const grossAmount = element.room_price || 0;
      const discountMH = element.partner_offer || 0;
      const discountPartner = element.discount_price || 0;
      let netValue = grossAmount - discountMH - discountPartner;

   

      const check_out = element.check_out;
      const check_in = element.check_in;

      const date1 = check_out.split("/");
      const date2 = check_in.split("/");

     
      const newdate11 = new Date(date1);
      const newdate22 = new Date(date2);
      const oneDay = 24 * 60 * 60 * 1000;
      const durationOfStay = Math.round(
        Math.abs((newdate22 - newdate11) / oneDay)
      );
      console.log("durationOfStay", durationOfStay);

      const checkInDate = element.check_in;
    
      const dateOfCancellation = new Date(
        dateOfCancellationData[0]?.created_datetime
      );
      const timeDifference = dateOfCancellation - checkInDate;
      const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

      const noOfDays = parseInt(element.no_of_days);
      const priceAfterDiscount = parseInt(element.total_price);
      const singleDay = priceAfterDiscount / noOfDays;
      // const gstAmount = parseInt(element.gst_amount);
      const gstAmount = element.gst_status === "Unregistered" ? 0 : element.gst_amount;


      const tds = (grossAmount - discountPartner) * 0.01;
      const tdsValue = tds.toFixed(0);
      const gstTds = element.gst_status === "Unregistered" ? 0 : tdsValue;


      const grossPayable = parseInt(grossAmount + gstAmount - tds - gstTds);
      let refund = 0;

      console.log("gstAmount",gstAmount,gstTds)
      if (daysDifference >= 3) {
        refund = 0;
      } else if (daysDifference === 2) {
        refund = 0;
      } else if (daysDifference === 1) {
        if (noOfDays > 2) {
          refund = singleDay + gstAmount;
        } else {
          refund = 0.5 * singleDay + 0.5 * gstAmount;
        }
      }
      const partnerRefund = refund === 0 ? "" : refund.toFixed(0);

      const mhServiceFeePercentage =
        parseFloat(element.mh_service_fee) / 100;

      const mhCommission = grossAmount * mhServiceFeePercentage;
      const mhCommissionpercen = mhCommission * 0.18;

      const mhCommissionRounded = Math.round(mhCommission + mhCommissionpercen);

      const totalPayableToPartner = Math.round(
        grossPayable - mhCommissionRounded
      );

      // console.log("sasa",totalPayableToPartner);

      index = index + 1;

      data.push({
        index: index,
        partner_name: partner_name,
        sub_partner_name: sub_partner_name,
        guest_name: guestData[0].guest_name,
        // mh_service_fee: mh_service_fee,
        // property_gstin: propertyGstNumber[0]?.property_gstin,
        agent_commission: agent_commission,
        food_details: food_details,
        travel_details: travel_details,
        medical_details: medical_details,
        dateOfCancellationData: dateOfCancellationData[0]?.created_datetime,
        cancelledAmountData: cancelledAmountData[0]?.refundAmount,
        partnerAmountonCancel: cancelledAmountData[0]?.partner_amount_on_cancel,
        mhAmountonCancel: cancelledAmountData[0]?.cancellAmount,
        daysDifference: daysDifference,
        partnerRefund: partnerRefund,
        durationOfStay: durationOfStay,
        netValue: netValue,
        tdsValue: tdsValue,
        gstTds:gstTds,
        grossPayable: grossPayable,
        mhCommissionRounded: mhCommissionRounded,
        totalPayableToPartner: totalPayableToPartner,

        ...element,
      });
    }
  }

  return { data };
}

async function getBookingAllCity() {
  const rows = await db.query(
    `SELECT DISTINCT property_city_id, property_city_name FROM mh_bookings_table WHERE  1`
  );
  const data = helper.emptyOrRows(rows);

  return { data };
}

async function getPropertyBasedOncity(property_city_id) {
  let sql = `SELECT DISTINCT hotel_txn_id, property_name FROM  mh_bookings_table WHERE  property_city_id='${property_city_id}' ORDER BY property_name`;
  const rows = await db.query(sql);
  const data = helper.emptyOrRows(rows);
  return { data };
}

module.exports = {
  BookingDataTable,
  masterreportsdetails,
  propertyreportsdetails,
  foodreportmethod,
  travelreportmethod,
  medicalreportmethod,
  getAdminreportsdetails,
  getAdminreportsForTravelBooking,
  getAdminreportsForMedicalBooking,
  getAdminreportsForFoodBooking,
  propertywisereportsdetails,
  propertymonthswisereportsdetails,
  getDateWiseAccountsDatails,
  getBookingAllCity,
  getPropertyBasedOncity,
};
