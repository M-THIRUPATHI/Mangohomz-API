const db = require("./db");
const helper = require("../helper");
const { parse } = require("dotenv");
const credentails = require("../credentails.json");
const axios = require("axios");
const FetchedApiKey = credentails.apiKey;
const nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  host: "mail.mangohomz.com",
  port: 465,
  auth: {
    user: "noreply@mangohomz.com",
    pass: "F0PZ}!]espo2",
  },
});
const sendWAMessage = async (
  campaignName,
  destination,
  userName,
  url,
  filename,
  templateParams
) => {
  try {
    const ApiParms = {
      apiKey: FetchedApiKey,
      campaignName: campaignName,
      destination: destination,
      userName: userName,
      media: {
        url: url,
        filename: filename,
      },
      templateParams: templateParams,
    };
    const res = await axios.post(
      "https://backend.api-wa.co/campaign/myoperator/api",
      ApiParms
    );
    if (res.status === 200) {
      return {
        sent: true,
      };
    } else {
      return {
        sent: false,
      };
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// get PArtner Registartion DAta
async function getPartnerRegistartionAllForAdmin() {
  const rows = await db.query(
    `SELECT COUNT(sno) AS PartnerEOIs FROM partner_registration`
  );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}

//onkar get Agent Registartion DAta
async function getAgentRegistartionAllForAdmin() {
  const rows = await db.query(
    `SELECT COUNT(sno) AS AgentEOIs FROM agent_registration`
  );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}

//  get property details Data
async function getpropertyDetailsAllForAdmin() {
  const rows = await db.query(
    `SELECT txn_id, account_id, partner_id, partner_sub_id, partner_name, sub_partner_name, partner_phone, property_id, property_name, sub_property_name, property_phone, property_email, property_description, property_latitude, property_longitude, building_no, street, land_mark, country, state_id, state_name, city_id, city_name, pin_code, amenity_name, amenity_icon, checkIn_time, checkOut_time, Name_Of_Contact_Person, upload_image, upload_image1, upload_image2, upload_image3, upload_image4, remarks, property_status,bankAccountNo, bankName, branchName, ifsc, cancelled_cheque_doc, mh_agreement, mh_declaration, mh_bankmandate, mh_gstin FROM mh_property_details_table WHERE 1`
  );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}

//  get property Room details Data
async function getpropertyroomtableAllForAdmin() {
  const rows = await db.query(
    `SELECT room_type, SUM(no_of_avail_rooms) as cnt FROM mh_property_rooms_table WHERE 1 GROUP BY room_type;`
  );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}

//onkar  get Property Partner Master details
async function getpropertypartnerAllForAdmin() {
  const rows = await db.query(
    `SELECT 
    COUNT(CASE WHEN status = 'approved' THEN partner_id END) AS AdminApproved,
    COUNT(partner_id) AS RegisteredPartners
FROM 
    mh_property_master;`
  );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}
//onkar  get Agent Master details
async function getagentmasterAllForAdmin() {
  const rows = await db.query(
    `SELECT COUNT(CASE WHEN status = 'approved' THEN agent_id END) AS AdminApproved,
    COUNT(agent_id) AS RegisteredAgents
    FROM mh_agent_master`
  );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}

async function getBookingAllForAdmin() {
  const rows = await db.query(
    `SELECT s_no, account_id, booking_id, booking_order_id,
    reference_id, invoice_number, rz_order_id, rz_payment_id, rz_signature_id, 
    partner_id, partner_sub_id, hotel_txn_id, room_txn_id, property_name, property_type, room_type, facilities, near_hospital_id, near_hospital_name, property_state_id, property_state_name, property_city_id, property_city_name, check_in, check_out, checkIn_time, checkOut_time, guest_count, no_of_days, property_price, room_price, discount, partner_offer_percentage, partner_offer, base_price, discount_price, price_after_discount, mh_offer_price, mh_offer_name, gst_percentage, gst_amount, cgst_percentage, cgst_amount, sgst_percentage, sgst_amount, total_price, country_code, country_name, phone_no, primary_no, alternate_email_id, address_line_1, address_line_2, state_id, state_name, city, email_id, alternate_no, pincode, booking_status, gstin_no, inserted_date_time, property_email, property_phone, room_category, address, room_booked_count FROM mh_bookings_table WHERE total_price > 500 AND inserted_date_time >= '2023-02-15' AND booking_status !='Cancelled' ORDER BY s_no DESC`
  );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}

async function getBookingAllLiveForAdmin() {
  const rows = await db.query(
    `SELECT booking_order_id, property_name, room_type, near_hospital_name, property_city_name,DATE_FORMAT(check_in,'%Y/%m/%d') as check_in,DATE_FORMAT(check_out,'%Y/%m/%d') as check_out, no_of_days,room_booked_count,(no_of_days *room_booked_count) as room_nights, total_price,DATE_FORMAT(inserted_date_time,'%Y/%m/%d') as booked_date, guest_count,GROUP_CONCAT(b.guest_name) as guests FROM mh_bookings_table a JOIN mh_booking_txn_table b on a.booking_order_id=b.mh_booking_id WHERE curdate() between check_in and check_out AND ( (CURDATE() = check_in AND STR_TO_DATE(checkIn_time, '%h:%i %p') <= NOW()) OR (CURDATE() = check_out AND STR_TO_DATE(checkOut_time, '%h:%i %p') >= NOW()) OR (CURDATE() > check_in AND CURDATE() < check_out) ) AND total_price > 200 AND a.booking_status = 'Booked' group by b.mh_booking_id`
  );
  const data = helper.emptyOrRows(rows);
  // console.log("data",data)
  return {
    data,
  };
}

async function getBookingAllUpcomingForAdmin() { 
  const rows = await db.query(
    `SELECT booking_order_id, property_name, room_type, near_hospital_name, property_city_name,DATE_FORMAT(check_in,'%Y/%m/%d') check_in,DATE_FORMAT(check_out,'%Y/%m/%d') check_out,no_of_days,room_booked_count,(no_of_days * room_booked_count) as room_nights, total_price,DATE_FORMAT(inserted_date_time,'%Y/%m/%d') as booked_date, guest_count,GROUP_CONCAT(b.guest_name) as guests FROM mh_bookings_table a JOIN mh_booking_txn_table b on a.booking_order_id =b.mh_booking_id WHERE check_in >= CURDATE() AND total_price > 200 AND a.booking_status = 'Booked' GROUP BY b.mh_booking_id;`
  );
  const data = helper.emptyOrRows(rows);
  // console.log("data",data)
  return {
    data,
  };
}

async function feedbackdata() {
  const rows = await db.query(
    `SELECT sno, mh_booking_id, user_name, property_name, mh_experience_rating,
       hotel_rating, mh_recommend_value, user_message, server_datetime FROM mh_accomidation_feedback WHERE 1`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      index = index + 1;
      data.push({
        //  sno: index,
        ...element,
      });
    }
  }
  return data;
}

async function getAccommodationCancellationForAdmin() {
  const rows = await db.query(
    `SELECT s_no, txn_id, booking_cancel_id, booking_order_id, account_id, property_name, property_type, room_type, phone_no, check_in, check_out, no_of_days, room_price, discount, discount_price, mh_offer_name, mh_offer_price, gst_percentage, gst_amount, cgst_percentage, cgst_amount, sgst_percentage, sgst_amount, total_price, cancellation_percentage, cancellAmount, refundAmount, state_name, facilities, room_booked_count, guest_count,  date_format(created_datetime, '%d-%m-%y') as created_datetime, property_city_id, property_city_name, guest_name FROM mh_accommodation_cancellation_table WHERE 1`
  );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}

async function getadminBookingStatusCount() {
  const rows = await db.query(
    `SELECT (SELECT COUNT(*) FROM mh_bookings_table WHERE booking_status='Booked' AND total_price >500 AND inserted_date_time >= '2023-02-15') AS bcount,(SELECT COUNT(*) FROM mh_bookings_table WHERE total_price >500  AND booking_status='Cancelled' AND inserted_date_time >= '2023-02-15' ) AS cancelcount FROM mh_bookings_table WHERE total_price >500 AND inserted_date_time >= '2023-02-15' GROUP BY booking_order_id;`
  );
  const data = helper.emptyOrRows(rows);

  return {
    data,
  };
}
async function getadminTravelBookingStatusCount() {
  const rows = await db.query(
    `SELECT (SELECT COUNT(*) FROM mh_travel_booking_table  WHERE booking_status='Booked' AND payable_amount >500 AND updated_datetime >= '2023-02-15') AS bcount,(SELECT COUNT(*) FROM mh_travel_booking_table  WHERE payable_amount >500  AND booking_status='Cancelled' AND updated_datetime >= '2023-02-15' ) AS cancelcount FROM mh_travel_booking_table  WHERE payable_amount >500 AND updated_datetime >= '2023-02-15' GROUP BY booking_order_id;`
  );
  const data = helper.emptyOrRows(rows);

  return {
    data,
  };
}
async function   getBookingAllDisplayForAdmin(status) {
  //console.log("status",status);
  let eq = "";
  if (status != "ALL") {
    eq = " AND booking_status = " + "'" + status + "' ";
  }
  let qry =
    "SELECT s_no, account_id, booking_id, booking_order_id, reference_id, invoice_number, rz_order_id, rz_payment_id, rz_signature_id, ip_address, partner_id, partner_sub_id, hotel_txn_id, room_txn_id, property_name, property_type, room_type, facilities, near_hospital_id, near_hospital_name, property_state_id, property_state_name, property_city_id, property_city_name,DATE_FORMAT(check_in,'%Y/%m/%d') as formattedcheck_in,DATE_FORMAT(check_out,'%Y/%m/%d') as formattedcheck_out, checkIn_time, checkOut_time, guest_count, no_of_days, property_price, room_price, discount, partner_offer_percentage, partner_offer, base_price, discount_price, price_after_discount, mh_offer_price, mh_offer_name, gst_percentage, gst_amount, cgst_percentage, cgst_amount, sgst_percentage, sgst_amount, total_price, country_code, country_name, phone_no, primary_no, alternate_email_id, address_line_1, address_line_2, state_id, state_name, city, email_id, alternate_no, pincode, booking_status, gstin_no,DATE_FORMAT(inserted_date_time,'%Y/%m/%d')  as booked_date, property_email, property_phone, room_category, address, room_booked_count,(no_of_days * room_booked_count) as roomNights_count FROM mh_bookings_table WHERE 1 " +
    eq +
    " AND  total_price > 500 AND inserted_date_time >= '2023-02-15' ORDER BY inserted_date_time DESC";
  //console.log('qry',qry);
  const rows = await db.query(qry);
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  let guestData = "";
  let property_gst = "";
  let bankDetails = "";
  let mh_service_fee = "";
  let food_details = "";
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      guestData = await helper.getGuestDetailsDataFromDb(
        element.booking_order_id
      );
      property_gst = await helper.getGSTOnProperty(element.account_id);
      bankDetails = await helper.getBankDetailsofProperty(element.account_id);
      mh_service_fee = await helper.getMhService(element.account_id);
      food_details = await helper.getFoodDetailsData(element.booking_order_id);

      const grossAmount = element.room_price;
      const mhServiceFeePercentage = mh_service_fee[0].mh_service_fee / 100;
      const mh_commission = Math.round(grossAmount * mhServiceFeePercentage);

      const tax = element.gst_amount;
      const tds = grossAmount * 0.01;
      const gstTcs = grossAmount * 0.01;
      const grossPayable = grossAmount + tax - tds - gstTcs;
      const eighteenpercentage = mh_commission * 0.18;
      const partner_share = Math.round(
        grossPayable - mh_commission - eighteenpercentage
      );

      index = index + 1;
      data.push({
        index: index,
        guestData: guestData,
        guestName: guestData[0].guest_name,
        property_gst: property_gst[0].property_gstin,
        mh_service_fee: mh_service_fee,
        // property_gst_assing:property_gst[0].property_gstin,
        bankDetails: bankDetails[0],
        mh_commission: mh_commission,
        partner_share: partner_share,
        food_details:food_details,
        ...element,
      });
    }
  }
  return data;
  /*     if(status!='ALL'){
    const rows = await db.query(
      `SELECT s_no, account_id, booking_id, booking_order_id, reference_id, invoice_number, rz_order_id, rz_payment_id, rz_signature_id, ip_address, partner_id, partner_sub_id, hotel_txn_id, room_txn_id, property_name, property_type, room_type, facilities, near_hospital_id, near_hospital_name, property_state_id, property_state_name, property_city_id, property_city_name, check_in, check_out, DATE_FORMAT(check_in,'%d-%m-%Y') as check_in, DATE_FORMAT(check_out,'%d-%m-%Y') as check_out, checkIn_time, checkOut_time, guest_count, no_of_days, property_price, room_price, discount, partner_offer_percentage, partner_offer, base_price, discount_price, price_after_discount, mh_offer_price, mh_offer_name, gst_percentage, gst_amount, cgst_percentage, cgst_amount, sgst_percentage, sgst_amount, total_price, country_code, country_name, phone_no, primary_no, alternate_email_id, address_line_1, address_line_2, state_id, state_name, city, email_id, alternate_no, pincode, booking_status, gstin_no,DATE_FORMAT(inserted_date_time,'%d-%m-%Y') as booked_date, property_email, property_phone, room_category, address, room_booked_count FROM mh_bookings_table WHERE booking_status = '${status}' AND  total_price > 500 AND inserted_date_time >= '2023-02-15' ORDER BY s_no ASC
      `
    );
    const result = helper.emptyOrRows(rows);
    let data = [];
    let index = 0;
    let guestData = "";
    for (const key in result) {
      if (Object.hasOwnProperty.call(result, key)) {
        const element = result[key];
    guestData = await helper.getGuestDetailsDataFromDb(
      element.booking_order_id
    );
        index = index+1;
        data.push({
          index: index,
          guestData: guestData,
  
          ...element,
        });
      }
    }
    return data;
  } else if(status='ALL'){
    const rows = await db.query(
      `SELECT s_no, account_id, booking_id, booking_order_id, reference_id, invoice_number, rz_order_id, rz_payment_id, rz_signature_id, ip_address, partner_id, partner_sub_id, hotel_txn_id, room_txn_id, property_name, property_type, room_type, facilities, near_hospital_id, near_hospital_name, property_state_id, property_state_name, property_city_id, property_city_name,  DATE_FORMAT(check_in,'%d-%m-%Y') as check_in, DATE_FORMAT(check_out,'%d-%m-%Y') as check_out, checkIn_time, checkOut_time, guest_count, no_of_days, property_price, room_price, discount, partner_offer_percentage, partner_offer, base_price, discount_price, price_after_discount, mh_offer_price, mh_offer_name, gst_percentage, gst_amount, cgst_percentage, cgst_amount, sgst_percentage, sgst_amount, total_price, country_code, country_name, phone_no, primary_no, alternate_email_id, address_line_1, address_line_2, state_id, state_name, city, email_id, alternate_no, pincode, booking_status, gstin_no, DATE_FORMAT(inserted_date_time,'%d-%m-%Y') as booked_date, property_email, property_phone, room_category, address, room_booked_count FROM  mh_bookings_table WHERE total_price > 500 AND inserted_date_time >= '2023-02-15' ORDER BY s_no ASC
      `
    );
    const result = helper.emptyOrRows(rows);
    let data = [];
    let index = 0;
   
    let guestData = "";



    for (const key in result) {
      if (Object.hasOwnProperty.call(result, key)) {
        const element = result[key];

        
    guestData = await helper.getGuestDetailsDataFromDb(
      element.booking_order_id
    );
        index = index+1;
        data.push({
          index: index,
          guestData: guestData,
  
          ...element,
        });
      }
    }
    return data;
  } */
}
async function getTravelBookingAllDisplayForAdmin(status) {
  //console.log("status",status);
  let eq = "";
  if (status != "ALL") {
    eq = " AND booking_status = " + "'" + status + "' ";
  }
  let qry =
    "SELECT sno, booking_id, booking_order_id, travel_booking_id, travel_booking_orderid, invoice_number, travel_reference_id, property_city_name, property_city_id, hotel_property_name, near_hospital_name, check_in, check_out, guest_count, no_of_days, booked_date, booking_origin, booking_destination, booking_time, travel_charges, discount, discount_price, base_price, mh_offer_price, mh_offer_coupon, price_after_discount, gst_percentage, gst_on_base_price, cgst_percentage, cgst_amount, sgst_percentage, sgst_amount, payable_amount, country_code, country_name, mobile_number, gst_number, account_id, agent_id, travel_name, transport_sub_id, transport_sub_name, whatsapp_number, email_id, booking_status, updated_datetime FROM mh_travel_booking_table WHERE 1 " +
    eq +
    " AND  payable_amount > 500 AND updated_datetime >= '2023-02-15' ORDER BY sno ASC";
  //console.log('qry',qry);
  const rows = await db.query(qry);
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  let guestData = "";
  // let property_gst = "";
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      guestData = await helper.getGuestDetailsDataFromDb(
        element.booking_order_id
      );
      //  property_gst = await helper.getGSTOnProperty(element.account_id);
      index = index + 1;
      data.push({
        index: index,
        guestData: guestData,
        guestName: guestData[0].guest_name,
        // property_gst: property_gst,
        //  property_gst_assing: property_gst[0].property_gstin,

        ...element,
      });
    }
  }
  return data;
}
async function paymentForPartnerSaving(data, ipAddress) {
  let numericNum = await helper.generatePaymentForPartnerID(
    "mh_payment_pay_for_partner",
    "s_no"
  );
  let createNumber = numericNum.toString().padStart("2", 0);
  let payment_for_partner_id = `MHPAY${createNumber}`;
  const result = await db.query(
    `INSERT IGNORE INTO  mh_payment_pay_for_partner
   (payment_for_partner_id, partner_name, bankAccountNo, bankName, branchName, ifsc, reference_number, from_accounts, type_of_payment, transfer_amount, transfer_description, mode_of_communication,ip_address)
   VALUES 
   (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      payment_for_partner_id ?? "",
      data.partner_name ?? "",
      data.bankAccountNo ?? "",
      data.bankName ?? "",
      data.branchName ?? "",
      data.ifsc ?? "",
      data.reference_number ?? "",
      data.from_accounts ?? "",
      data.type_of_payment ?? "",
      data.transfer_amount ?? "",
      data.transfer_description ?? "",
      data.mode_of_communication ?? "",
      ipAddress,
    ]
  );
  let message = "Payment Save Successfully";
  return { message };
}
async function getMonthwiseAccBookings() {
  const rows = await db.query(`
  SELECT concat(MONTHNAME(inserted_date_time),', ',YEAR(inserted_date_time)) AS month_name, COUNT(s_no) AS total_bookings,SUM(no_of_days * room_booked_count ) as total_nights, SUM(guest_count) as total_guests,SUM(room_booked_count) as total_rooms,SUM(total_price) as booking_amount,round(SUM(total_price)/COUNT(s_no)) as avg_booking_amount,round(SUM(total_price)/SUM(no_of_days * room_booked_count )) as avg_booking_nightvalue FROM mh_bookings_table WHERE inserted_date_time > '2023-03-15' AND total_price > 200 AND booking_status = 'Booked' GROUP BY MONTHNAME(inserted_date_time) order by MONTH(inserted_date_time)
  `);

  const data = helper.emptyOrRows(rows);

  return data; // Return as an array instead of an object
}
async function getMonthwiseAccCancellations() {
  const rows = await db.query(`
  SELECT 
  concat(MONTHNAME(created_datetime),', ',YEAR(created_datetime)) AS month_name,
      COUNT(s_no) AS total_cancellations,
      SUM(no_of_days * room_booked_count) AS total_nights,
      SUM(guest_count) as occupants,SUM(room_booked_count) as rooms,
      SUM(total_price) AS total_booking_amount,
      SUM(refundAmount) AS total_refund_amount
    FROM mh_accommodation_cancellation_table
    WHERE created_datetime > '2023-03-15'
    GROUP BY MONTHNAME(created_datetime)
    ORDER BY MONTH(created_datetime);
  `);

  const data = helper.emptyOrRows(rows);

  return data; // Return as an array instead of an object
}

async function gethospitalmasterDetails() {
  const rows = await db.query(
    `SELECT sno, near_hospital_id , near_hospital_name, locality,hospital_nick_name,city_seo_name, 
    hospital_seo_name, type, latitude,longitude,distance_from_hospital,city_id,city,city_alias,state,address,pin_code,specialty,gmap_loc_link,no_of_bed,hospital_link,ratings,status FROM mh_hospital_master WHERE 1`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;

  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      index = index + 1;
      data.push({
        index: index,
        ...element,
      });
    }
  }
  return data;
}

async function getpropertymasterDetails() {
  const rows = await db.query(
    `SELECT txn_id, account_id, partner_id, partner_sub_id, partner_name, sub_partner_name, partner_phone, property_id, property_name, sub_property_name, property_phone, property_email, property_description, property_latitude, property_longitude, building_no, street, land_mark, country, state_id, state_name, city_id, city_name, pin_code, amenity_name, amenity_icon, checkIn_time, checkOut_time, Name_Of_Contact_Person, upload_image, upload_image1, upload_image2, upload_image3, upload_image4, remarks, property_status,bankAccountNo, bankName, branchName, ifsc, cancelled_cheque_doc, mh_agreement, mh_declaration, mh_bankmandate, mh_gstin,concat(building_no,",",street,"," ,city_name,"," ,state_name,"," ,country) as address,property_gstin,mh_service_fee,agent_fee_on_property FROM mh_property_details_table WHERE property_status='Approved' `
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;

  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      index = index + 1;
      data.push({
        index: index,
        ...element,
      });
    }
  }
  return data;
}
async function updatepropertypriceDetails(
  txn_id,
  partner_id,
  room_category,
  room_type,
  data,
  ipAddress
) {
  // console.log("property room price details", data);

  // let result = await db.query(
  //   `UPDATE mh_property_rooms_table SET price=?, property_specialOffer=? WHERE property_txn_id='${txn_id}' AND partner_id='${partner_id}' AND room_category ='${room_category}' AND room_type ='${room_type}'`,
  //   [data.roomPrice ?? "", data.earlyBirdOffer ?? ""]
  // );
  let value = `UPDATE mh_property_rooms_table SET price=${data.roomPrice}, property_specialOffer=${data.earlyBirdOffer},no_of_avail_rooms=${data.numberOfRoomAvalable} WHERE txn_id='${txn_id}' AND partner_id='${partner_id}' AND room_category ='${room_category}' AND room_type ='${room_type}'`;
  // console.log("result", value);
  let result = await db.query(
    value
    // [data.roomPrice ?? "", data.earlyBirdOffer ?? ""]
  );

  const result2 = await db.query(
    `INSERT INTO mh_propertyrooms_price_log(txn_id, account_id, property_txn_id, partner_id, partner_name, partner_sub_id, sub_partner_name, property_name, sub_property_name, no_of_avail_rooms, room_type, previous_price, changed_price, units, room_category, partner_specialOffer, previous_earlybird_offer, changed_earlybird_offer, gst_per, ip_address,changed_by_user_name,changed_by_name) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.txn_id !== null && data.txn_id !== undefined ? data.txn_id : "",
      data.account_id !== null && data.account_id !== undefined
        ? data.account_id
        : "",
      data.property_txn_id !== null && data.property_txn_id !== undefined
        ? data.property_txn_id
        : "",
      data.partner_id !== null && data.partner_id !== undefined
        ? data.partner_id
        : "",
      data.partner_name !== null && data.partner_name !== undefined
        ? data.partner_name
        : "",
      data.partner_sub_id !== null && data.partner_sub_id !== undefined
        ? data.partner_sub_id
        : "",
      data.sub_partner_name !== null && data.sub_partner_name !== undefined
        ? data.sub_partner_name
        : "",
      data.property_name !== null && data.property_name !== undefined
        ? data.property_name
        : "",
      data.sub_property_name !== null && data.sub_property_name !== undefined
        ? data.sub_property_name
        : "",
      data.numberOfRoomAvalable !== null &&
      data.numberOfRoomAvalable !== undefined
        ? data.numberOfRoomAvalable
        : "",
      data.room_type !== null && data.room_type !== undefined
        ? data.room_type
        : "",
      data.previous_price !== null && data.previous_price !== undefined
        ? data.previous_price
        : "",
      data.roomPrice !== null && data.roomPrice !== undefined
        ? data.roomPrice
        : "",
      data.units !== null && data.units !== undefined ? data.units : "",
      data.room_category !== null && data.room_category !== undefined
        ? data.room_category
        : "",
      data.partner_specialOffer !== null &&
      data.partner_specialOffer !== undefined
        ? data.partner_specialOffer
        : "",
      data.previous_earlybird_offer !== null &&
      data.previous_earlybird_offer !== undefined
        ? data.previous_earlybird_offer
        : "",
      data.earlyBirdOffer !== null && data.earlyBirdOffer !== undefined
        ? data.earlyBirdOffer
        : "",
      data.gst_per !== null && data.gst_per !== undefined ? data.gst_per : "",

      ipAddress,
data.changed_by_user_name !== null && data.changed_by_user_name !== undefined ? data.changed_by_user_name : "",
      data.changed_by_name !== null && data.changed_by_name !== undefined ? data.changed_by_name : "",
    ]
  );
  let message = "Error while Updating property room price Data";
  if (result.affectedRows) {
    message = "Property Room price Update successfully";
  }
  if (result2.affectedRows) {
    message = "Property Room price Update successfully";
  }
  return message;
}
async function getpropertypricelogdetails(
  property_txn_id,
  partner_id,
  room_category,
  room_type
) {
  // console.log(property_txn_id, partner_id, room_category, room_type);
  const rows = await db.query(
    `SELECT sno, txn_id, account_id, property_txn_id, partner_id, partner_name, partner_sub_id, sub_partner_name, property_name, sub_property_name, no_of_avail_rooms, room_type, previous_price, changed_price, units, room_category, partner_specialOffer,  (changed_price - (changed_price*partner_specialOffer/100) - (changed_price*changed_earlybird_offer/100)) AS customer_price,previous_earlybird_offer, changed_earlybird_offer, gst_per,round((changed_price*gst_per/100)) as gst_amount,round((changed_price - (changed_price*partner_specialOffer/100) - (changed_price*changed_earlybird_offer/100))+round((gst_per/100)*changed_price)) as total_amount,date_format(changed_date_time,'%Y/%m/%d') as changed_date_time1,changed_by_user_name,changed_by_name  FROM mh_propertyrooms_price_log WHERE property_txn_id='${property_txn_id}' AND partner_id='${partner_id}' AND room_category ='${room_category}' AND 
    room_type ='${room_type}' ORDER BY changed_date_time DESC`
  );
  const data = helper.emptyOrRows(rows);
  const dataWithIndex = data.map((item, index) => ({
    index: index + 1,
    ...item,
  }));

  return {
    data: dataWithIndex,
  };
}
async function DateWiseBookingTable(fromDate, toDate,property_name) {
  // console.log(fromDate,toDate);
  const dbFromDate = formatDateForDatabase(fromDate);
  const dbToDate = formatDateForDatabase(toDate);

  //  console.log(property_name);
  const rows = await db.query(
    `SELECT s_no, account_id, booking_id, booking_order_id, reference_id, invoice_number, rz_order_id, rz_payment_id, rz_signature_id, ip_address, partner_id, partner_sub_id, hotel_txn_id, room_txn_id, property_name, property_type, room_type, facilities, near_hospital_id, near_hospital_name, property_state_id, property_state_name, property_city_id, property_city_name, check_in, check_out,DATE_FORMAT(check_in,'%Y/%m/%d') as formattedcheck_in, DATE_FORMAT(check_out,'%Y/%m/%d') as formattedcheck_out, checkIn_time, checkOut_time, guest_count, no_of_days, property_price, room_price, discount, partner_offer_percentage, partner_offer, base_price, discount_price, price_after_discount, mh_offer_price, mh_offer_name, gst_percentage, gst_amount, cgst_percentage, cgst_amount, sgst_percentage, sgst_amount, total_price, country_code, country_name, phone_no, primary_no, alternate_email_id, address_line_1, address_line_2, state_id, state_name, city, email_id, alternate_no, pincode, booking_status, gstin_no,DATE_FORMAT(inserted_date_time,'%Y/%m/%d') as booked_date, property_email, property_phone, room_category, address, room_booked_count,(no_of_days * room_booked_count) as roomNights_count FROM mh_bookings_table WHERE total_price > 500 AND inserted_date_time >= '${dbFromDate}' AND inserted_date_time <= '${dbToDate}' AND property_name = '${property_name}'  AND booking_status = 'Booked' AND inserted_date_time >= '2023-02-15' ORDER BY inserted_date_time DESC`
  );

  const result = helper.emptyOrRows(rows);
  // console.log(data);
  let data = [];
  let index = 0;
  let guestData = "";
  let property_gst = "";
  let bankDetails = "";
  let mh_service_fee = "";
  let agent_fee_on_property="";
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      guestData = await helper.getGuestDetailsDataFromDb(
        element.booking_order_id
      );
      property_gst = await helper.getGSTOnProperty(element.account_id);
      bankDetails = await helper.getBankDetailsofProperty(element.account_id);
      mh_service_fee = await helper.getMhService(element.account_id);
      agent_fee_on_property= await helper.getagentFeeonProperty(
        element.account_id,element.hotel_txn_id
      );
      const grossAmount = element.room_price;
      const mhServiceFeePercentage = mh_service_fee[0].mh_service_fee / 100;
      const agentFeePercentage = Math.round((element.room_price*agent_fee_on_property[0].agent_fee_on_property / 100)-(element.room_price*agent_fee_on_property[0].agent_fee_on_property / 100)*0.05);
    
      const mh_commission = Math.round(grossAmount * mhServiceFeePercentage);

      const tax = element.gst_amount;
      const tds = Math.round(grossAmount * 0.01);
      const gstTcs = Math.round(grossAmount * 0.01);
      const grossPayable = grossAmount + tax - tds - gstTcs;
      const mhserviceonGrosspay = grossAmount * mhServiceFeePercentage;
      const eighteenpercentage = Math.round(mhserviceonGrosspay * 0.18);
      const partner_share = Math.round(
        grossPayable - mhserviceonGrosspay - eighteenpercentage
      );
      index = index + 1;
      data.push({
        index: index,
        guestData: guestData,
        mh_service_fee: mh_service_fee,
        guestName: guestData[0].guest_name,
        property_gst: property_gst[0].property_gstin,
        // property_gst_assing: property_gst[0].property_gstin,
        bankDetails: bankDetails[0],
        mh_commission: mh_commission,
        partner_share: partner_share,
        tds:tds,
        gstTcs:gstTcs,
        eighteenpercentage:eighteenpercentage,
        agentFeePercentage:agentFeePercentage,


        ...element,
      });
    }
  }
  return {
    data,
  };
}

// // Financial Booking Report Start

// async function FinancialBookingTable(fromDate, toDate) {
//   // console.log(fromDate,toDate);
//   const dbFromDate = formatDateForDatabase(fromDate);
//   const dbToDate = formatDateForDatabase(toDate);
//   // console.log(dbFromDate);
//   // console.log(dbToDate);
//   const rows = await db.query(
//     `SELECT s_no, account_id, booking_id, booking_order_id, reference_id, invoice_number, rz_order_id, rz_payment_id, rz_signature_id, ip_address, partner_id, partner_sub_id, hotel_txn_id, room_txn_id, property_name, property_type, room_type, facilities, near_hospital_id, near_hospital_name, property_state_id, property_state_name, property_city_id, property_city_name, check_in, check_out,DATE_FORMAT(check_in,'%Y-%m-%d') as formattedcheck_in, DATE_FORMAT(check_out,'%Y-%m-%d') as formattedcheck_out, checkIn_time, checkOut_time, guest_count, no_of_days, property_price, room_price, discount, partner_offer_percentage, partner_offer, base_price, discount_price, price_after_discount, mh_offer_price, mh_offer_name, gst_percentage, gst_amount, cgst_percentage, cgst_amount, sgst_percentage, sgst_amount, total_price, country_code, country_name, phone_no, primary_no, alternate_email_id, address_line_1, address_line_2, state_id, state_name, city, email_id, alternate_no, pincode, booking_status, gstin_no,DATE_FORMAT(inserted_date_time,'%Y-%m-%d') as booked_date, property_email, property_phone, room_category, address, room_booked_count,(no_of_days * room_booked_count) as roomNights_count FROM mh_bookings_table WHERE total_price > 500 AND inserted_date_time >= '${dbFromDate}' AND inserted_date_time <= '${dbToDate}'  AND booking_status = 'Booked' AND inserted_date_time >= '2023-02-15' ORDER BY inserted_date_time DESC`
//   );

//   const result = helper.emptyOrRows(rows);
//   // console.log(data);
//   let data = [];
//   let index = 0;
//   let guestData = "";
//   let property_gst = "";
//   let bankDetails = "";
//   let mh_service_fee = "";
//   for (const key in result) {
//     if (Object.hasOwnProperty.call(result, key)) {
//       const element = result[key];
//       guestData = await helper.getGuestDetailsDataFromDb(
//         element.booking_order_id
//       );
//       property_gst = await helper.getGSTOnProperty(element.account_id);
//       bankDetails = await helper.getBankDetailsofProperty(element.account_id);
//       mh_service_fee = await helper.getMhService(element.account_id);

//       const grossAmount = element.room_price;
//       const mhServiceFeePercentage = mh_service_fee[0].mh_service_fee / 100;
//       const mh_commission = Math.round(grossAmount * mhServiceFeePercentage);

//       const tax = element.gst_amount;
//       const tds = grossAmount * 0.01;
//       const gstTcs = grossAmount * 0.01;
//       const grossPayable = grossAmount + tax - tds - gstTcs;
//       const mhserviceonGrosspay = grossAmount * mhServiceFeePercentage;
//       const eighteenpercentage = mhserviceonGrosspay * 0.18;
//       const partner_share = Math.round(
//         grossPayable - mhserviceonGrosspay - eighteenpercentage
//       );
//       index = index + 1;
//       data.push({
//         index: index,
//         guestData: guestData,
//         mh_service_fee: mh_service_fee,
//         guestName: guestData[0].guest_name,
//         property_gst: property_gst[0].property_gstin,
//         // property_gst_assing: property_gst[0].property_gstin,
//         bankDetails: bankDetails[0],
//         mh_commission: mh_commission,
//         partner_share: partner_share,

//         ...element,
//       });
//     }
//   }
//   return {
//     data,
//   };
// }
// // Financial Booking Report End






function formatDateForDatabase(date) {
  
  const parts = date.split("/");
  const formattedDate = `${parts[0]}-${parts[1]}-${parts[2]}`;
  // console.log("dadada",formattedDate)
  return formattedDate;
}

async function getBookingUpcomingForPartner(account_id) {
  const rows = await db.query(
    `SELECT booking_order_id, property_name, room_type, near_hospital_name, property_city_name, check_in,DATE_FORMAT(inserted_date_time,'%d-%m-%Y') as booked_date, check_out,no_of_days,room_booked_count,(no_of_days * room_booked_count) as room_nights, total_price, guest_count,GROUP_CONCAT(b.guest_name) as guests FROM mh_bookings_table a JOIN mh_booking_txn_table b on a.booking_order_id =b.mh_booking_id WHERE account_id='${account_id}' AND check_in >= CURDATE() AND total_price > 200 AND a.booking_status = 'Booked' GROUP BY b.mh_booking_id;`
  );
  const data = helper.emptyOrRows(rows);
  //  console.log("data",data)
  return {
    data,
  };
}

async function getBookingLiveForPartner(account_id) {
  const rows = await db.query(
    `SELECT booking_order_id, property_name, room_type, near_hospital_name, property_city_name,DATE_FORMAT(check_in,'%d-%m-%Y') as check_in,DATE_FORMAT(check_out,'%d-%m-%Y') as check_out, no_of_days,room_booked_count,(no_of_days *room_booked_count) as room_nights, total_price,DATE_FORMAT(inserted_date_time,'%d-%m-%Y') as booked_date, guest_count,GROUP_CONCAT(b.guest_name) as guests FROM mh_bookings_table a JOIN mh_booking_txn_table b on a.booking_order_id=b.mh_booking_id WHERE  account_id='${account_id}' AND curdate() between check_in and check_out AND ( (CURDATE() = check_in AND STR_TO_DATE(checkIn_time, '%h:%i %p') <= NOW()) OR (CURDATE() = check_out AND STR_TO_DATE(checkOut_time, '%h:%i %p') >= NOW()) OR (CURDATE() > check_in AND CURDATE() < check_out) ) AND total_price > 200 AND a.booking_status = 'Booked' group by b.mh_booking_id`
  );
  const data = helper.emptyOrRows(rows);
  //  console.log("data",data)
  return {
    data,
  };
}
async function getMedicalLoanListDetails() {
  const rows = await db.query(`
  SELECT sno, patient_name, hospital_name, email_id, country_code, mobile_number, patient_location, salarized, medical_loanfor, message, date_format(created_datetime, '%Y/%m/%d') as created_datetime1   FROM mh_medical_loan_details WHERE 1 ORDER BY created_datetime DESC
  `);

  const data = helper.emptyOrRows(rows);
  const dataWithIndex = data.map((item, index) => ({
    index: index + 1,
    ...item,
  }));

  return {
    data: dataWithIndex,
  };
}

async function getTravelCitywiselocationForAdmin() {
  const rows = await db.query(
    `SELECT sno, city_code, state, city_name, point_type, point_name, latitude, longitude FROM travel_points_city_wise_master WHERE 1`
  );
  const data = helper.emptyOrRows(rows);

  return data;
}

async function savetravellocationdetails(data) {
  let cityId = data.city_name.city_id;
  let result = await db.query(
    `INSERT INTO travel_points_city_wise_master(city_code, state, city_name, pincode, point_type, point_name, latitude, longitude) VALUES (?,?,?,?,?,?,?,?)`,
    [
      cityId !== null && cityId !== undefined ? cityId : "",
      data.state && data.state.state_name ? data.state.state_name : "",
      data.city_name && data.city_name.city ? data.city_name.city : "",
      data.pin_code !== null && data.pin_code !== undefined
        ? data.pin_code
        : "",
      data.point_type !== null && data.point_type !== undefined
        ? data.point_type
        : "",
      data.point_name !== null && data.point_name !== undefined
        ? data.point_name
        : "",
      data.latitude !== null && data.latitude !== undefined
        ? data.latitude
        : "",
      data.longitude !== null && data.longitude !== undefined
        ? data.longitude
        : "",
    ]
  );
  let message = "Error while submitting Citywise Location Data";
  if (result.affectedRows) {
    message = "Travel Location Data Added successfully";
  }
  return message;
}

async function updatetravellocationdetails(sno, data) {
  //  console.log("location details", data);
  let result = await db.query(
    `UPDATE travel_points_city_wise_master SET city_name=?,point_type=?,point_name=?,latitude=?,longitude=? WHERE sno='${sno}'`,
    [
      data.city_name !== null && data.city_name !== undefined
        ? data.city_name
        : "",
      data.point_type !== null && data.point_type !== undefined
        ? data.point_type
        : "",
      data.point_name !== null && data.point_name !== undefined
        ? data.point_name
        : "",
      data.latitude !== null && data.latitude !== undefined
        ? data.latitude
        : "",
      data.longitude !== null && data.longitude !== undefined
        ? data.longitude
        : "",
    ]
  );
  let message = "Error while Updating Citywise Location Data";
  if (result.affectedRows) {
    message = "Travel Location Data Update successfully";
  }
  return message;
}
async function getmhgeniepatientDetailsforadmin() {
  const rows = await db.query(
    `SELECT s_no, user_id, concat(patient_firstname,' ',patient_lastname) AS patient_name, patient_id, email_id, phone_number, patient_location, problem, pr_description, date_format(created_datetime, '%Y/%m/%d') as created_datetime1  FROM mhgenie_patient_details WHERE 1 ORDER BY created_datetime DESC`
  );
  const data = helper.emptyOrRows(rows);
  const dataWithIndex = data.map((item, index) => ({
    index: index + 1,
    ...item,
  }));

  return {
    data: dataWithIndex,
  };
}

async function getAllCallBackmsgData() {
  const rows = await db.query(
    `SELECT sno, mobile_number, DATE_FORMAT(updated_datetime, '%Y/%m/%d') AS date_call, customer_name, hospital_name, hospital_location, customer_city, remark FROM mh_callbackmessage_table WHERE 1 ORDER BY updated_datetime DESC`
  );
  const data = helper.emptyOrRows(rows);

  const dataWithIndex = data.map((item, index) => ({
    index: index + 1,
    ...item,
  }));

  return {
    data: dataWithIndex,
  };
}

async function getAllCityForCallBack() {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT DISTINCT city_id, city FROM mh_city_master WHERE status="yes" ORDER BY city;`
  );

  const data = helper.emptyOrRows(rows);
  return data;
}

async function getAllHospitalForCallBack(city_id) {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT DISTINCT sno, near_hospital_id, near_hospital_name, locality, hospital_nick_name, city_seo_name, hospital_seo_name, type, latitude, longitude, distance_from_hospital, city_id, city, city_alias, state, address, pin_code, specialty, gmap_loc_link, no_of_bed, hospital_link, ratings, status, hospital_desc_english, hospital_desc_hindi FROM mh_hospital_master WHERE city_id='${city_id}'`
  );

  const data = helper.emptyOrRows(rows);
  return data;
}

async function callbackdataSaving(data, ipAddress) {
  sendWAMessage(
    "call_automated_reply",
    data.mobile_number,
    data.customer_name,
    "https://mangohomz.com/img/og2.png",
    "https://mangohomz.com/img/og2.png",
    []
  )
    .then((result) => {
      // console.log(result);
    })
    .catch((error) => {
      console.error("Error in SendWhtNotification:", error);
    });

  const result1 = await db.query(
    `INSERT INTO mh_callbackmessage_table(mobile_number,date_call,customer_name,hospital_name,hospital_location,customer_city,other_hospital_name, remark, ip_address) VALUES (?,?,?,?,?,?,?,?,?)`,
    [
      data.mobile_number !== null && data.mobile_number !== undefined
        ? data.mobile_number
        : "",
      data.date_call !== null && data.date_call !== undefined
        ? data.date_call
        : "",
      data.customer_name !== null && data.customer_name !== undefined
        ? data.customer_name
        : "",
      data.hospital_name.near_hospital_name !== null &&
      data.hospital_name.near_hospital_name !== undefined
        ? data.hospital_name.near_hospital_name
        : "",
      data.hospital_location.city !== null &&
      data.hospital_location.city !== undefined
        ? data.hospital_location.city
        : "",
      data.customer_city !== null && data.customer_city !== undefined
        ? data.customer_city
        : "",
      data.other_hospital_name !== null &&
      data.other_hospital_name !== undefined
        ? data.other_hospital_name
        : "",

      data.remark !== null && data.remark !== undefined ? data.remark : "",
      ipAddress,
    ]
  );
  let message = "Call Back Data Saving Successfully";
  return { message };
}

async function getDateWiseAllCallBackMsgData(fromDate, toDate) {
  //  console.log(fromDate, toDate);
  // const dbFromDate = formatDateForDatabaseSlash(fromDate);
  // const dbToDate = formatDateForDatabaseSlash(toDate);
  // console.log(dbFromDate, dbToDate);
  const rows = await db.query(
    `SELECT sno, mobile_number, date_call, customer_name, hospital_name, hospital_location, remark
    FROM mh_callbackmessage_table
    WHERE STR_TO_DATE(date_call, '%d/%m/%Y') >= '${fromDate}' AND STR_TO_DATE(date_call, '%d/%m/%Y') <= '${toDate}';`
  );
  const data = helper.emptyOrRows(rows);
  //console.log("data",data);
  return {
    data,
  };
}





async function getSubscriberDetails() {
  const rows = await db.query(`SELECT 
  s_no,subscriber_email,datetime_for_subscription FROM mh_email_subscriber_data WHERE 1 
  `);
  // console.log(rows)

  const data = helper.emptyOrRows(rows);
  const dataWithIndex = data.map((item, index) => ({
    index: index + 1,
    ...item,
  }));

  return {
    data: dataWithIndex,
  };
}


async function  SavingEmailSubscriberData(data,ipAddress) {
  // let data = JSON.parse(fields.reach_us);
let numericNum = await helper.generatereachusID("mh_email_subscriber_data","s_no");
let createNumber = numericNum.toString().padStart("6", 0);
let reachus_id = `MHRU${createNumber}`;

 const result = await db.query(
       `INSERT IGNORE INTO mh_email_subscriber_data(subscriber_email) VALUES (?)`,
       [
         data.subscriber_email_id ?? "",
         
       ]
     );
//  console.log("result123",result);
 let message = "Error in Saving Subscriber Email Details";

 if (result.affectedRows) {
   message = " Saved Subscriber Email Details successfully";
   const adminMail = {
     from: 'noreply@mangohomz.com',
     to:data.subscriber_email_id,
     bcc: 'aman@mangohomz.com,soumendu@mangohomz.com',
     subject: "Thanks for Subscribing!-MangoHomz",
     html: `
       <div style="border:1px solid grey;>
         <div style="box-shadow:2px 2px 10px 2px grey;">
           <div style="display:flex;">
             <div>
               <a href="https://mangohomz.com" target="_blank"><img src="https://mangohomz.com/img/logo-main.6f335097.png" width="200px" height="50px" alt="mangohomz logo"></a>
             </div>
             <div style="font-weight:700;margin-top: 42px;margin-right: 6px;margin-left:300px">
               <p><a target="_blank" href="https://mangohomz.com" style="color:darkblue">www.mangohomz.ai</a></p>
             </div>
           </div>
           <div style="display:flex;">
             <div style="height: 5px;width: 70%;background-color:green;"></div>
             <div style="height: 5px;width: 30%;background-color:darkblue;overflow:hidden;"></div>
           </div>
           <div style="padding:10px">
            
             <div style="background-color:white;padding:5px;margin:auto;width:600px;border-radius:10px;margin-bottom:15px;color:black;">
           <div style="font-size:15px;font-family:verdana;"><b>Thanks for Subscribing Mangohomz</div>
             
 
              <div>
              <span >If you have any query please contact this number 8618959794.</span>
           </div>
       
             <div style="margin:10px 0px 0px 0px">
               <div>Thank You.</div>
               <div style="font-weight:700;">TEAM MANGOHOMZ</div>
             </div>
           </div>
           <div style="display:flex;">
             <div style="height: 5px;width: 100%;background-color:darkblue;"></div>
           </div>
           <div style="display:flex;">
             <div>
               <h6 style="margin:5px 0px 2px 4px">JOIN AND BE A PART OF A NATIONWIDE NETWORK</h6>
               <a href="https://mangohomz.com" target="_blank"><img src="https://mangohomz.com/img/logo-main.6f335097.png" width="200px" height="50px" alt="mangohomz logo"></a>
               <h6 style="margin:5px 0px 2px 4px">NOBODY HANDLES MEDICAL STAYS LIKE WE DO</h6>
             </div>
             <div style="margin:5px 0px 2px 150px">
               <div>
                 <h5 style="margin:0px">Please contact with us : </h5> <a href="mailto:care@mangohomz.com" style="color:darkblue;font-weight:700;">care@mangohomz.com</a> & <a href="https://www.mangohomz.com " target="_blank" style="color:darkblue;font-weight:700;">www.mangohomz.ai</a>
               </div>
               <div style="display:flex;">
                 <div>
                   <a href="https://www.facebook.com/Mangohomzpage/" target="_blank"><img src="https://mangohomz.com/mhmailer/mailer-1/media/facebook.png" alt=""  width="30px" height="30px" style="margin-top: 7px;"></a>
                 </div>
                 <div>
                   <a href="https://mobile.twitter.com/mangohomz" target="_blank"><img src="https://mangohomz.com/mhmailer/mailer-1/media/twitter.png" alt=""  width="36px" height="36px" style="margin-top: 4px;"></a>
                 </div>
                 <div>
                   <a href="https://instagram.com/mangohomz" target="_blank"><img src="https://mangohomz.com/mhmailer/mailer-1/media/instagram.png" alt=""  width="30px" height="30px" style="margin-top: 7px;"></a>
                 </div>
                 <div>
                   <a href="https://linkedin.com/company/mangohomz" target="_blank"><img src="https://mangohomz.com/mhmailer/mailer-1/media/linkedin.png" alt=""  width="36px" height="36px" style="margin-top: 4px;"></a>
                 </div>
                 <div>
                   <a href="https://www.youtube.com/channel/UCWAmQdY8g8AYI_Yojr8OYlA" target="_blank"><img src="https://mangohomz.com/mhmailer/mailer-1/media/youtube.png" alt=""  width="30px" height="30px" style="margin-top: 7px;"></a>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
   `,
   };

   transporter.sendMail(adminMail, function (error, info) {

     if (error) {
       console.log(error);
     } else {
      //  console.log("Succ", info.response);
       transporter.sendMail(mailOptions, function (error, info) {
         if (error) {
           console.log(error);
         } else {
           console.log("Succ", info.response);
         }
       });
     }
   });
 }
 return { message };
}

async function getdatewiseSubscriberDetails(fromDate,toDate) {

  const rows = await db.query(
    `SELECT s_no,subscriber_email,datetime_for_subscription FROM mh_email_subscriber_data WHERE datetime_for_subscription >= '${fromDate}' and datetime_for_subscription <= '${toDate}';`
  );

 
  const data = helper.emptyOrRows(rows);
  // console.log("result", data)
  const dataWithIndex = data.map((item, index) => ({
    index: index + 1,
    ...item,
  }));

  return {
    data: dataWithIndex,
  };
  
 
}

async function loadAccomadationPartnerDataForAdminReport() {
  let index = 0;
  const rows = await db.query(`SELECT s_no,user_id, field_visit_id, user_name, employee_id, name, employee_location, city_id, property_name, address, pin_code, phone_number, email_id, near_hospital_name, other_hospital_name, owner_name, owner_mail_id, owner_phone_number, manager_name, manager_mail_id, manager_phone_number, total_rooms, total_ac_rooms, total_non_ac_rooms,which_floor, distance_hospital, property_type, aggregator, aggregator_name, check_in_time, check_out_time, location, parking, lift, cctv, ramp, restaurant, self_kitchen, tv, wifi, hot_water, fridge,  discussion_breif, mh_share_revenue, pan_card, gst, cancel_cheque, facade, facade2, lobby1, lobby2, restaurant_pic, self_kitchen_pic, room1, room1_bathroom, room2, room2_bathroom, room3, room3_bathroom,visit_status,admin_status,inserted_date_time,updated_date_time,remarks,
    CONCAT(name,' - ', user_name) as concatenated_name FROM mh_fieldvisit_accomodation_details ORDER BY updated_date_time DESC; `);
  
  // const rows = await db.query(`SELECT s_no,visit_status,admin_status,property_name,inserted_date_time,updated_date_time,employee_Location, CONCAT(user_name,' ' , '-',' ', name) AS concatenated_name FROM mh_fieldvisit_accomodation_details   ORDER BY updated_date_time DESC;`);
  
  const data = helper.emptyOrRows(rows);
  const dataWithIndex = data.map((item, index) => ({
    index: index + 1, 
    ...item, 
  }));

  //console.log('data',dataWithIndex)
 return {
   data: dataWithIndex
  };
}



async function savingRemarksDetails(data) {
 
  let remarks = data.add_remarks;
  let s_no = data.serial_num;
  // console.log(remarks)
  //console.log(s_no)
  const result = await db.query(
    `UPDATE mh_fieldvisit_accomodation_details SET  remarks=? WHERE s_no='${s_no}'`,
    [remarks]
  );


  //console.log(result)
  return { result }
}

async function getDateWiseAccomadationDetails(fromDate,toDate,city) {

  //console.log(fromDate,toDate)
  //const dbFromDate = formatDateForDatabaseSlash(fromDate);
  //const dbToDate = formatDateForDatabaseSlash(toDate);

  //console.log('rk',dbFromDate,dbToDate)
  let index = 0;
  const rows = await db.query(`SELECT s_no, field_visit_id,user_id, user_name, employee_id, name, employee_location, city_id, property_name, address, pin_code, phone_number, email_id, near_hospital_name, other_hospital_name, owner_name, owner_mail_id, owner_phone_number, manager_name, manager_mail_id, manager_phone_number, total_rooms, total_ac_rooms, total_non_ac_rooms,
    which_floor, distance_hospital, property_type, aggregator, aggregator_name, check_in_time, check_out_time, location, parking, lift, cctv, ramp, restaurant, self_kitchen, tv, wifi, hot_water, fridge, discussion_breif, mh_share_revenue, pan_card, gst, cancel_cheque, facade, facade2, lobby1, lobby2, restaurant_pic, self_kitchen_pic, room1, room1_bathroom, room2, room2_bathroom, room3, room3_bathroom,visit_status,admin_status,inserted_date_time,updated_date_time,remarks,
    CONCAT(name,' - ', user_name) as concatenated_name FROM mh_fieldvisit_accomodation_details WHERE inserted_date_time >= '${fromDate}' and inserted_date_time <= '${toDate} 23:59:59' and employee_location = '${city}' ORDER BY updated_date_time DESC; `);
  // const rows = await db.query(`SELECT s_no,visit_status,admin_status,property_name,inserted_date_time,updated_date_time,employee_Location, CONCAT(user_name, ' - ', name) AS concatenated_name  FROM mh_fieldvisit_accomodation_details WHERE inserted_date_time >= '${fromDate}' and inserted_date_time <= '${toDate}' and employee_location = '${city}' and visit_status="Listed" ORDER BY updated_date_time DESC;`);

  const result = helper.emptyOrRows(rows);
  const dataWithIndex = result.map((item, index) => ({
    index: index + 1, 
    ...item, 
  }));


  //console.log(dataWithIndex)
  return { result: dataWithIndex }
  
}


async function getBookingAllStaffLiveForAdmin(zone) {
  // console.log("zone",zone)
  const rows = await db.query(
    `SELECT booking_order_id, property_name, room_type, near_hospital_name, property_city_name, check_in, check_out, no_of_days,room_booked_count,(no_of_days *room_booked_count) as room_nights, total_price,DATE_FORMAT(inserted_date_time,'%d/%m/%Y') as booked_date, guest_count,GROUP_CONCAT(b.guest_name) as guests FROM mh_bookings_table a JOIN mh_booking_txn_table b on a.booking_order_id=b.mh_booking_id WHERE curdate() between check_in and check_out AND ( (CURDATE() = check_in AND STR_TO_DATE(checkIn_time, '%h:%i %p') <= NOW()) OR (CURDATE() = check_out AND STR_TO_DATE(checkOut_time, '%h:%i %p') >= NOW()) OR (CURDATE() > check_in AND CURDATE() < check_out) ) AND total_price > 200 AND a.booking_status = 'Booked' AND a.property_city_name = '${zone}' group by b.mh_booking_id`
  );
  const data = helper.emptyOrRows(rows);
  // console.log("data",data)
  return {
    data,
  };
}

async function getBookingAllUpcomingStaffForAdmin(zone) {
  const rows = await db.query(
    `SELECT booking_order_id, property_name, room_type, near_hospital_name, property_city_name, check_in, check_out,no_of_days,room_booked_count,(no_of_days * room_booked_count) as room_nights, total_price,DATE_FORMAT(inserted_date_time,'%d/%m/%Y') as booked_date, guest_count,GROUP_CONCAT(b.guest_name) as guests FROM mh_bookings_table a JOIN mh_booking_txn_table b on a.booking_order_id =b.mh_booking_id WHERE check_in >= CURDATE() AND total_price > 200 AND a.booking_status = 'Booked' AND a.property_city_name = '${zone}' GROUP BY b.mh_booking_id;`
  );
  const data = helper.emptyOrRows(rows);
  // console.log("data",data)
  return {
    data,
  };
}

// async function loadCityArrForAdmin() {
//   const rows = await db.query(`SELECT city from mh_city_master;`);
//   const data = helper.emptyOrRows(rows);

//   //console.log(data)
//  return {
//     data,
//   };
// }
async function loadCityArrForAdmin() {
  const rows = await db.query(`SELECT city from mh_city_master;`);
  const data = helper.emptyOrRows(rows);

  //console.log(data)
 return {
    data,
  };
}

//Ravi kiran Query for verify Accomadation Details BY Admin
async function verifyAccomadationPartnerByAdmin(s_no) {
  //console.log('sno',s_no)

 const result = await db.query(
  `UPDATE mh_fieldvisit_accomodation_details SET admin_status="Verified" WHERE s_no='${s_no}';`,

);



//console.log(dataWithIndex)
 return { result }
 
}




//loadAccomadationpartnerDataForAdminReport();
async function loadRoomCategoriesListTableForAdmin(visitId){
  let index = 0;
  const result = await db.query(
    `SELECT * FROM mh_fieldvisit_accomadation_rates WHERE field_visit_id = '${visitId}';`,
  
  );

  const data = helper.emptyOrRows(result);
  const dataWithIndex = data.map((item, index) => ({
    index: index + 1, 
    ...item, 
  }));

  return { data: dataWithIndex }
}

async function loadHospitalPartnerDataForAdminReport() {
  let index = 0;
  const rows = await db.query(`SELECT s_no,user_id, field_visit_id, user_name, employee_id, name, employee_location, city_id, hospital_name, address, pincode, phone_number, email, key_person_name, key_person_mail, key_person_phone, manager_name, manager_mail, manager_phone, providing_accomadation, accomadation_name, outstation_flow,third_party, third_party_name, asset, hospital_image_1, hospital_image_2, hospital_image_3,discussion_brief,visit_status,admin_status, inserted_date_time, updated_date_time, remarks,
    CONCAT(name,' - ', user_name) as concatenated_name FROM mh_fieldvisit_hospital_details ORDER BY updated_date_time DESC; `);
  
  
  
  const data = helper.emptyOrRows(rows);
  const dataWithIndex = data.map((item, index) => ({
    index: index + 1, 
    ...item, 
  }));

  //console.log('data',dataWithIndex)
 return {
   data: dataWithIndex
  };
}


//Ravi kiran get Date wise Data for hospital field visit

async function getDateWiseHospitalDetails(fromDate,toDate,city) {

  // console.log(fromDate,toDate)
  //const dbFromDate = formatDateForDatabaseSlash(fromDate);
  //const dbToDate = formatDateForDatabaseSlash(toDate);

  //console.log('rk',dbFromDate,dbToDate)
  let index = 0;
  const rows = await db.query(`SELECT s_no,user_id, field_visit_id, user_name, employee_id, name, employee_location, city_id, hospital_name, address, pincode, phone_number, email, key_person_name, key_person_mail, key_person_phone, manager_name, manager_mail, manager_phone, providing_accomadation, accomadation_name, outstation_flow,third_party, third_party_name, asset, hospital_image_1, hospital_image_2, hospital_image_3,discussion_brief,visit_status,admin_status, inserted_date_time, updated_date_time,remarks, 
  CONCAT(name,' - ', user_name) as concatenated_name FROM mh_fieldvisit_hospital_details WHERE inserted_date_time >= '${fromDate}' and inserted_date_time <= '${toDate} 23:59:59' and employee_location = '${city}' ORDER BY updated_date_time DESC; `);
  

  const result = helper.emptyOrRows(rows);
  const dataWithIndex = result.map((item, index) => ({
    index: index + 1, 
    ...item, 
  }));


  //console.log(dataWithIndex)
  return { result: dataWithIndex }
  
}

async function addRemaksMethodSavingForHosptial(data) {
 
  let remarks = data.add_remarks;
  let s_no = data.serial_num;
  const result = await db.query(
    `UPDATE mh_fieldvisit_hospital_details SET  remarks=? WHERE s_no='${s_no}'`,
    [remarks]
  );


  //console.log(result)
  return { result }
}

//Ravi kiran Query for verify Hosptial Details BY Admin
async function verifyHospitalPartnerByAdmin(s_no) {
  //console.log('sno',s_no)

 const result = await db.query(
  `UPDATE mh_fieldvisit_hospital_details SET admin_status="VERIFIED" WHERE s_no='${s_no}';`,

);
//console.log(dataWithIndex)
 return { result }
 
}

async function loadFoodPartnerDataForAdminReport() {
  let index = 0;
  const rows = await db.query(`SELECT s_no,employee_id,concat(name,"-",user_name) AS concatenated_name, employee_location,user_id,city_id,field_visit_id,user_id,user_name,name,restaurant_name,address,pincode,phone_number,email_id,near_hospital_name,other_hospital_name,owner_name,owner_mail,owner_phone_number,manager_name,manager_mail,manager_phone_number,item1,item2,item3,pan_card,gst,cancel_cheque,fssai_certificate,discussion_brief,mh_share_revenue,ip,visit_status,admin_status,remarks,inserted_date_time,updated_date_time FROM mh_fieldvisit_food_details ORDER BY updated_date_time DESC;`);
  
  const data = helper.emptyOrRows(rows);
  const dataWithIndex = data.map((item, index) => ({
    index: index + 1,  
    ...item, 
  }));

   //console.log('FOODdata',data)
 return {
   data: dataWithIndex
  };
}

async function getDateWiseFoodDetails(fromDate,toDate,city) {

  //console.log(fromDate,toDate)
  // const dbFromDate = formatDateForDatabaseSlash(fromDate);
  // const dbToDate = formatDateForDatabaseSlash(toDate);

  //console.log('rk',dbFromDate,dbToDate)
  let index = 0;
  const rows = await db.query(`SELECT s_no, employee_id, concat(name,"-",user_name) AS concatenated_name,user_name,name, employee_location,user_id,city_id,field_visit_id,restaurant_name,address,pincode,phone_number,email_id,near_hospital_name,other_hospital_name,owner_name,owner_mail,owner_phone_number,manager_name,manager_mail,manager_phone_number,item1,item2,item3,pan_card,gst,cancel_cheque,fssai_certificate,discussion_brief,mh_share_revenue,inserted_date_time, updated_date_time,ip,visit_status,admin_status FROM mh_fieldvisit_food_details WHERE inserted_date_time >= '${fromDate}' and inserted_date_time <= '${toDate} 23:59:59' and employee_location = '${city}' ORDER BY updated_date_time DESC;`);
  const result = helper.emptyOrRows(rows);
  // console.log("filter",result)
  const dataWithIndex = result.map((item, index) => ({
    index: index + 1, 
    ...item, 
  }));

//  console.log(result)
  return { result: dataWithIndex }
}


async function savingFoodRemarksDetails(data){
  // console.log(data)
  let remarks=data.add_remarks;
  // console.log("what",remarks)

  let s_no=data.serial_num

// console.log(s_no) 
  const result=await db.query(
    `UPDATE mh_fieldvisit_food_details SET remarks=? WHERE s_no='${s_no}'`,
    [remarks]
  );
  // console.log(result)
}


async function updateAdminFoodRemarkStatus(
  s_no,
  data
) {
  const result = await db.query(
    `UPDATE mh_fieldvisit_food_details SET admin_status="VERIFIED"  WHERE s_no='${s_no}';`,
  );

  let message = "Error in Updating Admin Status";

  if (result.affectedRows) {
    message = "Admin Status Updated  and verified successfully";
  }

  // console.log("finalREsult",result)
  return { message };
}


async function loadTravelPartnerDataForAdminReport() {
  let index = 0;
  const rows = await db.query(`SELECT s_no,user_id,city_id,employee_id,name,user_name, concat(name,"  -  ",user_name) as names,field_visit_id,employee_location,travel_agency_name,address,phone_number,pin_code,email_id,near_hospital_name,other_hospital_name,owner_name,owner_mail,owner_phone_number,manager_name,manager_mail,manager_phone_number,total_vehicles,five_seaters,seven_seaters,discussion_brief,mh_share_revenue,pan_card,gst,cancel_cheque,ip,inserted_date_time,updated_date_time,visit_status,admin_status,remarks  FROM mh_fieldvisit_travel_details ORDER BY updated_date_time DESC;`);
  
  const data = helper.emptyOrRows(rows);
  const dataWithIndex = data.map((item, index) => ({
    index: index + 1, 
    ...item, 
  }));
// console.log("saichandu")
  // console.log('data',data)
 return {
   data: dataWithIndex
  };
}

async function loadEquipmentPartnerDataForAdminReport() {
  let index = 0;
  const rows = await db.query(`SELECT s_no,field_visit_id,user_id,city_id,employee_id,name,user_name, concat(name,"  -  ",user_name) as names,field_visit_id,employee_location,equipment_name,address,phone_number,pin_code,email_id,near_hospital_name,other_hospital_name,owner_name,owner_mail,owner_phone_number,manager_name,manager_mail,manager_phone_number,wheel_chairs,oxygen_cylinders,tripod_walking_stick,discussion_brief,mh_share_revenue,pan_card,gst,cancel_cheque,wheel_chair_pic,oxygen_cylinder_pic,tripod_walking_stick_pic,ip,inserted_date_time,updated_date_time,visit_status,admin_status,remarks  FROM mh_fieldvisit_equipment_details ORDER BY updated_date_time DESC;`);
  
  const data = helper.emptyOrRows(rows);
  const dataWithIndex = data.map((item, index) => ({
    index: index + 1, 
    ...item, 
  }));
// console.log("saichandu")
  // console.log('data',data)
 return {
   data: dataWithIndex
  };
}



async function savingTravelRemarksDetails(data) {
 
  let remarks = data.add_remarks;
  let s_no = data.serial_num;
  // console.log(remarks)
  const result = await db.query(
    `UPDATE mh_fieldvisit_travel_details SET  remarks=? WHERE s_no='${s_no}'`,
    [remarks]
  );


  // console.log(result)
  return { result }
}

async function savingEquipmentRemarksDetails(data) {
 
  let remarks = data.add_remarks;
  let field_visit_id = data.field_visit_id;
  // console.log(remarks)
  const result = await db.query(
    `UPDATE mh_fieldvisit_equipment_details SET  remarks=? WHERE field_visit_id='${field_visit_id}'`,
    [remarks]
  );


  // console.log(result)
  return { result }
}

async function getDateWiseTravelDetails(fromDate,toDate,city) {

  //console.log(fromDate,toDate)
  //const dbFromDate = formatDateForDatabaseSlash(fromDate);
  //const dbToDate = formatDateForDatabaseSlash(toDate);

  // console.log('rk',dbFromDate,dbToDate)
  // console.log("dfjdfdjdf")
 
  let index = 0;
  const rows = await db.query(`SELECT s_no,user_id,city_id,employee_id,name,user_name, concat(name,"-",user_name) as names,field_visit_id,employee_location,travel_agency_name,address,pin_code,phone_number,email_id,near_hospital_name,other_hospital_name,owner_name,owner_mail,owner_phone_number,manager_name,manager_mail,manager_phone_number,total_vehicles,five_seaters,seven_seaters,discussion_brief,mh_share_revenue,pan_card,gst,cancel_cheque,ip,
  inserted_date_time, updated_date_time,
  visit_status,admin_status,remarks 
  FROM mh_fieldvisit_travel_details WHERE inserted_date_time >= '${fromDate}' and inserted_date_time <= '${toDate} 23:59:59' and employee_location = '${city}' ORDER BY updated_date_time DESC;`);

  const result = helper.emptyOrRows(rows);
  const dataWithIndex = result.map((item, index) => ({
    index: index + 1, 
    ...item, 
  }));
  // console.log("result", dataWithIndex)
  // console.log('rk',"gghhg")


  return { result: dataWithIndex }

  //console.log(result)
  // let data = [];
  // let index = 0;
  // let testdetails="";
 
  // for (const key in result) {
  //   if (Object.hasOwnProperty.call(result, key)) {
  //     const element = result[key];

  //     testdetails = await helper.loadtesttypeFromDb(
  //       element.mh_aarthi_booking_id
  //     );
    
  //     index = index+1;
  //     data.push({
  //       //  sno: index,
  //       testdetails: testdetails,
        

        
  //       ...element,
  //     });
  //     //console.log("data",data);
  //   }
  //   //console.log("data123",data);
  // }
  // return data;
}

async function getDateWiseEquipmentDetails(fromDate,toDate,city) {

  //console.log(fromDate,toDate)
  //const dbFromDate = formatDateForDatabaseSlash(fromDate);
  //const dbToDate = formatDateForDatabaseSlash(toDate);

  // console.log('rk',dbFromDate,dbToDate)
  // console.log("dfjdfdjdf")
 
  let index = 0;
  const rows = await db.query(`SELECT s_no,field_visit_id,user_id,city_id,employee_id,name,user_name, concat(name,"  -  ",user_name) as names,employee_location,equipment_name,address,phone_number,pin_code,email_id,near_hospital_name,other_hospital_name,owner_name,owner_mail,owner_phone_number,manager_name,manager_mail,manager_phone_number,wheel_chairs,oxygen_cylinders,tripod_walking_stick,discussion_brief,mh_share_revenue,pan_card,gst,cancel_cheque,wheel_chair_pic,oxygen_cylinder_pic,tripod_walking_stick_pic,ip,inserted_date_time,updated_date_time,visit_status,admin_status,remarks 
  FROM mh_fieldvisit_equipment_details WHERE inserted_date_time >= '${fromDate}' and inserted_date_time <= '${toDate} 23:59:59' and employee_location = '${city}' ORDER BY updated_date_time DESC;`);

  const result = helper.emptyOrRows(rows);
  const dataWithIndex = result.map((item, index) => ({
    index: index + 1, 
    ...item, 
  }));
  // console.log("result", dataWithIndex)
  // console.log('rk',"gghhg")


  return { result: dataWithIndex }

  //console.log(result)
  // let data = [];
  // let index = 0;
  // let testdetails="";
 
  // for (const key in result) {
  //   if (Object.hasOwnProperty.call(result, key)) {
  //     const element = result[key];

  //     testdetails = await helper.loadtesttypeFromDb(
  //       element.mh_aarthi_booking_id
  //     );
    
  //     index = index+1;
  //     data.push({
  //       //  sno: index,
  //       testdetails: testdetails,
        

        
  //       ...element,
  //     });
  //     //console.log("data",data);
  //   }
  //   //console.log("data123",data);
  // }
  // return data;
}

async function verifyViewEquipmentVisitDetails(s_no,) {
  // console.log(s_no)

  const result = await db.query(
    `UPDATE mh_fieldvisit_equipment_details SET admin_status= "VERIFIED"  WHERE s_no='${s_no}';`
    
  )

}

//Ravi kiran Query for Departments Table
async function loadDepartmentsTableForAdmin(visitId){
  // console.log(visitId)
  const result = await db.query(
    `SELECT * FROM mh_fieldvisit_hospital_dept_details WHERE field_visit_id = '${visitId}';`,
  
  );

  const data = helper.emptyOrRows(result);
  const dataWithIndex = data.map((item, index) => ({
    index: index + 1, 
    ...item, 
  }));

  return { data: dataWithIndex }
}

async function getHospitalWiseBookingDetailsForAdmin(req,res,next) {
  const rows = await db.query("SELECT near_hospital_name,property_city_name,count(*) as cnt FROM mh_bookings_table WHERE inserted_date_time > '2023-03-15' and total_price > 200 and booking_status = 'Booked' group by near_hospital_name order by cnt DESC")
  const data = helper.emptyOrRows(rows);
  // console.log(data)
  // const result = {}
  // GetHospitalHubWiseBookingDetails.forEach(item=>{
  //   const hospitalName = item.near_hospital_name;
  //   const count = item.cnt;
  //   result[hospitalName] = count;
  // })
  // console.log("sentdata")
  const dataWithIndex = data.map((item, index) => ({
    index: index + 1, 
    ...item, 
  }));

  //console.log('data',dataWithIndex)
 return {
   data: dataWithIndex
  };

}

async function loadWhatsappSenderDetails(option) {
  if(option==="All"){
    const rows = await db.query(
      `SELECT DISTINCT COALESCE(phone_no, primary_no, alternate_no) AS phone_number
       FROM mh_bookings_table WHERE country_name="India"
       UNION
       SELECT DISTINCT COALESCE(phone, alternate_no) AS phone_number 
       FROM mh_property_master WHERE country="India"
       UNION
       SELECT DISTINCT phone_number FROM mh_others_whatsapp_numbers` 
    );
    const data = helper.emptyOrRows(rows);
    return {
       data,
    }; 
  }else if(option==="Customer"){
    const rows = await db.query(
      `SELECT DISTINCT COALESCE(phone_no, primary_no, alternate_no) AS phone_number
       FROM mh_bookings_table WHERE country_name="India";` 
    );
    const data = helper.emptyOrRows(rows);
    return {
      data,
    }; 
  }else if(option==="Partners"){
    const rows = await db.query(
      `SELECT DISTINCT COALESCE(phone, alternate_no) AS phone_number 
       FROM mh_property_master WHERE country="India"`  
    );
    const data = helper.emptyOrRows(rows);
    return {
      data,
    }; 
  }else if(option==="Others"){
    const rows = await db.query(
      `SELECT DISTINCT phone_number FROM mh_others_whatsapp_numbers ORDER BY s_no DESC;` 
    );
    const data = helper.emptyOrRows(rows);
    return {
       data,
    }; 
  }
}

async function loadCampaignDataDetails(option) {
  const rows = await db.query(
    `SELECT campaign_text FROM wa_campaigns_master WHERE campaign_name='${option}'` 
  );
  const data = helper.emptyOrRows(rows);
  return {
     data,
  }; 
}


async function getCampaignOptionsDetails() {
  const rows = await db.query(
    `SELECT sno,campaign_name FROM wa_campaigns_master` 
  );
  const data = helper.emptyOrRows(rows);
  return {
     data,
  }; 
}

async function insertPhoneNumbersAndCampaignOption(formData) {
  console.log(formData)
  // const rows = await db.query(
  //   `SELECT sno,campaign_name FROM wa_campaigns_master` 
  // );
  // const data = helper.emptyOrRows(rows);
  // return {
  //    data,
  // }; 
}

async function addNewPhoneNumberDetails(Data) {
  let message={}
  const query=await db.query(`SELECT * FROM mh_others_whatsapp_numbers WHERE phone_number=?`,[Data.phoneNumber])
  if(!query.some(data=>(
    data.phone_number===Data.phoneNumber
  ))){
    const result=await db.query(`INSERT INTO mh_others_whatsapp_numbers(phone_number) VALUES (?)`,[Data.phoneNumber])
      message={
        msg:'Error in Inserting Phone Number in the Table',
        type: "negative"
      }
    if(result.affectedRows){
      message={
        msg:'Successfully Insert Phone Number in the Table',
        type: "positive"
      }
    }
  }else{
    message={
      msg:'Phone Number Already Exist in the Table. Please Check in Others Option',
      type: "negative"
    }
  }
  return{
    message
  }
}


module.exports = {
  getPartnerRegistartionAllForAdmin,
  getAgentRegistartionAllForAdmin,
  getpropertyDetailsAllForAdmin,
  getpropertyroomtableAllForAdmin,
  getpropertypartnerAllForAdmin,
  getagentmasterAllForAdmin,
  getBookingAllForAdmin,
  feedbackdata,
  getAccommodationCancellationForAdmin,
  getadminBookingStatusCount,
  getadminTravelBookingStatusCount,
  getBookingAllDisplayForAdmin,
  paymentForPartnerSaving,
  getTravelBookingAllDisplayForAdmin,
  paymentForPartnerSaving,
  getMonthwiseAccBookings,
  getMonthwiseAccCancellations,
  gethospitalmasterDetails,
  getpropertymasterDetails,
  getpropertypricelogdetails,
  updatepropertypriceDetails,
  getBookingAllLiveForAdmin,
  getBookingAllUpcomingForAdmin,
  DateWiseBookingTable,
  getBookingUpcomingForPartner,
  getBookingLiveForPartner,
  getMedicalLoanListDetails,
  getTravelCitywiselocationForAdmin,
  savetravellocationdetails,
  updatetravellocationdetails,
  getmhgeniepatientDetailsforadmin,
  callbackdataSaving,
  getAllCallBackmsgData,
  getAllCityForCallBack,
  getAllHospitalForCallBack,
  getDateWiseAllCallBackMsgData,
  getSubscriberDetails,
  SavingEmailSubscriberData,
  getdatewiseSubscriberDetails,
  savingRemarksDetails,
  loadAccomadationPartnerDataForAdminReport,
  getDateWiseAccomadationDetails,
  getBookingAllStaffLiveForAdmin,
  getBookingAllUpcomingStaffForAdmin,
  loadCityArrForAdmin,
  verifyAccomadationPartnerByAdmin,
loadRoomCategoriesListTableForAdmin,
  loadHospitalPartnerDataForAdminReport,
  getDateWiseHospitalDetails,
  loadFoodPartnerDataForAdminReport,
  getDateWiseFoodDetails,
  savingFoodRemarksDetails,
  updateAdminFoodRemarkStatus,
  addRemaksMethodSavingForHosptial,
  verifyHospitalPartnerByAdmin,
  loadTravelPartnerDataForAdminReport,
  loadEquipmentPartnerDataForAdminReport,
  savingTravelRemarksDetails,
  savingEquipmentRemarksDetails,
  getDateWiseTravelDetails,
  getDateWiseEquipmentDetails,
  verifyViewEquipmentVisitDetails,
  loadDepartmentsTableForAdmin,
  getHospitalWiseBookingDetailsForAdmin,
  loadWhatsappSenderDetails,
  loadCampaignDataDetails,
  addNewPhoneNumberDetails,
  getCampaignOptionsDetails,
  insertPhoneNumbersAndCampaignOption
  //loadAccomadationpartnerDataForAdminReport,

};


