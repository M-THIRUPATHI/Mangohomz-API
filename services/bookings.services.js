const db = require("./db");
const helper = require("../helper");
const moment = require("moment");
const nodemailer = require("nodemailer");
const request = require("request");
const credentails = require("../credentails.json");
const axios = require("axios");
const FetchedApiKey = credentails.apiKey;

moment.suppressDeprecationWarnings = true;
var transporter = nodemailer.createTransport({
  host: "mail.mangohomz.com",
  port: 465,
  auth: {
    user: "noreply@mangohomz.com",
    pass: "F0PZ}!]espo2",
  },
});

const sendWAMessageForBookingConf = async (
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

async function loadbookingFoodManzohomzOffer(param) {
  let date = moment(new Date()).format("YYYY-MM-DD");

  const rows = await db.query(
    `SELECT sno, offer_priority, date_format(offer_start_date,"%d-%m-%Y") as offer_start_date, date_format(offer_end_date,"%d-%m-%Y") as offer_end_date, offer_price, offer_type, offer_from_whom, offer_description, offer_name,offer_money_start,offer_money_end, inserted_datetime FROM mh_offers_table WHERE offer_from_whom = '${param}' AND offer_start_date <= '${date}' AND offer_end_date >= '${date}'`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  var index = 0;
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
  return { data };
}
async function getBookingData(booking_order_id) {
  const rows = await db.query(
    `SELECT s_no, account_id, booking_id, booking_order_id,reference_id,invoice_number,partner_id, partner_sub_id, hotel_txn_id, room_txn_id, property_name, property_type, room_type, near_hospital_id, near_hospital_name, check_in, check_out, guest_count, no_of_days, room_price, discount,base_price,partner_offer_percentage,partner_offer,base_price, discount_price, price_after_discount, mh_offer_price, mh_offer_name, gst_percentage, gst_amount,cgst_percentage, cgst_amount,sgst_percentage, sgst_amount, total_price, country_code, country_name,phone_no,primary_no,alternate_email_id,address_line_1,address_line_2,state_id,state_name,city,property_city_id,property_city_name,email_id,alternate_no,pincode,gstin_no,booking_status,room_category,address,room_booked_count FROM mh_bookings_table WHERE booking_order_id = '${booking_order_id}' GROUP BY booking_order_id ORDER BY inserted_date_time DESC`
  );

  const result = helper.emptyOrRows(rows);
  let data = [];
  var index = 0;
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
  return { data };
}
async function travelManzohomzOffer(params) {
  let date = moment(new Date()).format("YYYY-MM-DD");
  const rows = await db.query(
    `SELECT sno, offer_priority, date_format(offer_start_date,"%d-%m-%Y") as offer_start_date, date_format(offer_end_date,"%d-%m-%Y") as offer_end_date, offer_price, offer_type, offer_from_whom, offer_description, offer_name,offer_image,offer_money_start,offer_money_end FROM  mh_offers_table WHERE offer_from_whom='${params}' AND offer_start_date <= '${date}' AND offer_end_date >= '${date}'`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  var index = 0;
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
  return { data };
}
async function getMHBookingData(booking_order_id) {
  // let date = moment(new Date()).format("YYYY-MM-DD");

  const rows = await db.query(
    `SELECT s_no, account_id, booking_id, booking_order_id, reference_id, invoice_number, partner_id, partner_sub_id, hotel_txn_id, room_txn_id, property_name, property_type, room_type, facilities, near_hospital_id, near_hospital_name, property_state_id, property_state_name, property_city_id, property_city_name, check_in, check_out, checkIn_time, checkOut_time, guest_count, no_of_days, property_price, room_price, discount,partner_offer_percentage,partner_offer, discount_price, base_price,price_after_discount, mh_offer_price, mh_offer_name, gst_percentage, gst_amount, cgst_percentage, cgst_amount, sgst_percentage, sgst_amount, total_price, country_code, country_name, phone_no, primary_no, alternate_email_id, address_line_1, address_line_2, state_id, state_name, city, email_id, alternate_no, pincode, booking_status, gstin_no, inserted_date_time,room_category,address,room_booked_count FROM mh_bookings_table WHERE booking_order_id='${booking_order_id}' ORDER BY inserted_date_time DESC`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  var index = 0;
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
  return { data };
}
async function loadAllBookingDetails(mh_booking_id) {
  // let date = moment(new Date()).format("YYYY-MM-DD");

  const rows = await db.query(
    `SELECT s_no,account_id, booking_id, booking_order_id,reference_id,invoice_number,partner_id, partner_sub_id, hotel_txn_id, room_txn_id, property_name, property_type, room_type, near_hospital_id, near_hospital_name, check_in, check_out,checkIn_time,checkOut_time, guest_count, no_of_days, room_price, discount,partner_offer_percentage,partner_offer,base_price, discount_price, price_after_discount, mh_offer_price, mh_offer_name, gst_percentage, gst_amount,cgst_percentage, cgst_amount,sgst_percentage, sgst_amount, total_price, country_code, country_name,phone_no,primary_no,alternate_email_id,address_line_1,address_line_2,state_id,state_name,city,property_city_id,property_city_name,email_id,alternate_no,pincode,gstin_no,booking_status,room_category,address,room_booked_count,DATE_FORMAT(inserted_date_time,'%d/%m/%Y') as booked_date FROM mh_bookings_table WHERE booking_order_id='${mh_booking_id}' ORDER BY inserted_date_time DESC;`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  var index = 0;
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
  return { data };
}
async function createFoodBooking(data) {
  let addCode = "";
  let cityLength = data.booking_city_id.length;
  if (cityLength == 1) {
    addCode = `00${data.booking_city_id}`;
  } else if (cityLength == 2) {
    addCode = `0${data.booking_city_id}`;
  } else {
    addCode = `${data.booking_city_id}`;
  }

  let selected_items_array = [];
  for (let item of data.selectedFoodObj) {
    selected_items_array.push(`${item.food_items_name}-${item.add_qty}`);
  }

  let list_of_selected_items = selected_items_array.join(",");

  let foodBkngDate = data.food_booking_date.split("/").reverse().join("-");
  let month = moment(new Date()).format("MM");
  let year = moment(new Date()).format("YY");
  let foodBkngID = await helper.generateMaxFoodBookingId();
  let food_booking_id = foodBkngID.toString().padStart("6", 0);
  let confirmFoodBookingId = `MHF${year}${month}${addCode}${food_booking_id}`;

  let foodInvoiceID = `MFI${year}${month}${addCode}${food_booking_id}`;
  let foodRefID = `MIR${year}${month}${addCode}${food_booking_id}`;
  let result = await db.query(
    `INSERT IGNORE INTO mh_food_booking_table(
      account_id, 
      booking_id, 
      booking_order_id, 
      food_booking_id, 
      food_booking_orderid, 
      invoice_number, 
      food_reference_id,
      rz_order_id,
      rz_payment_id,
      rz_signature_id, 
      booking_city, 
      booking_city_id, 
      hotel_property_name, 
      near_hospital_name, 
      near_hospital_id, 
      check_in, 
      check_out, 
      guest_count, 
      no_of_days, 
      restaurant_fssai_no, 
      foodPartner_name, 
      food_partner_id, 
      foodPartner_sub_name, 
      food_partner_sub_id, 
      food_booking_date, 
      food_booking_type, 
      food_booking_time, 
      total_qty_booked, 
      total_item_qty, 
      food_charges, 
      discount_type, 
      discount, 
      discount_price, 
      base_price, 
      mh_offer_price, 
      mh_offer_coupon,
      partner_offer_price, 
      price_after_discount, 
      gst_percentage, 
      gst_on_base_price, 
      cgst_percentage, 
      cgst_amount, 
      sgst_percentage, 
      sgst_amount, 
      food_booking_items, 
      final_price_amount, 
      country_name, 
      country_code, 
      mobile_number, 
      whatsapp_number, 
      email_id, 
      food_partner_email, 
      alternatefood_partner_email, 
      gstin_no
      ) 
      VALUES 
    (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.selectedFoodObj[0].account_id ?? "",
      data.booking_id ?? "",
      data.booking_order_id ?? "",
      food_booking_id ?? "",
      confirmFoodBookingId ?? "",
      foodInvoiceID ?? "",
      foodRefID ?? "",
      data.razorpay_order_id !== null && data.razorpay_order_id !== undefined
        ? data.razorpay_order_id
        : "",
      data.razorpay_payment_id !== null &&
      data.razorpay_payment_id !== undefined
        ? data.razorpay_payment_id
        : "",
      data.razorpay_signature !== null && data.razorpay_signature !== undefined
        ? data.razorpay_signature
        : "",
      data.booking_city ?? "",
      data.booking_city_id ?? "",
      data.hotel_property_name ?? "",
      data.near_hospital_name ?? "",
      data.near_hospital_id ?? "",
      data.check_in ?? "",
      data.check_out ?? "",
      data.guests_count ?? "",
      data.no_of_days ?? "",
      data.selectedFoodObj[0].fssai_no ?? "",
      data.selectedFoodObj[0].foodPartner_name ?? "",
      data.selectedFoodObj[0].agent_id ?? "",
      data.selectedFoodObj[0].foodPartner_sub_name ?? "",
      data.selectedFoodObj[0].agent_sub_id ?? "",
      foodBkngDate ?? "",
      data.food_booking_type ?? "",
      data.food_booking_time ?? "",
      data.total_qty_booked ?? "",
      data.total_item_qty ?? "",
      data.food_charges ?? "",
      data.discount_type ?? "",
      data.discount ?? "",
      data.discount_price ?? "",
      data.base_price ?? "",
      data.mh_offer_price ?? "",
      data.mh_offer_coupon ?? "",
      data.restaurantOfferPrice ?? "",
      // data.selected_offer_price  ?? "",
      data.price_after_discount ?? "",
      data.gst_percentage ?? "",
      data.gst_on_base_price ?? "",
      data.cgst_percentage ?? "",
      data.cgst_amount ?? "",
      data.sgst_percentage ?? "",
      data.sgst_amount ?? "",
      list_of_selected_items ?? "",
      data.payable_amount ?? "",
      data.country_name ?? "",
      data.country_code ?? "",
      data.mobile_number ?? "",
      data.whatsapp_number ?? "",
      data.email_id ?? "",
      data.food_partner_email ?? "",
      data.alternatefood_partner_email ?? "",
      data.gstin_no ?? "",
    ]
  );

  for (let i = 0; i < data.selectedFoodObj.length; i++) {
    var result2 = await db.query(
      `INSERT IGNORE INTO mh_food_booking_txn_table (mh_booking_id, mh_booking_order_id, food_booking_id,food_booking_orderid, invoice_number,food_reference_id,account_id, foodPartner_name, food_partner_id, foodPartner_sub_name, food_partner_sub_id, food_txn_id, location, kitchen_name, kitchen_type, selected_food_item, food_items_list, item_quantity,item_price,restaurant_fssai_no) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        data.booking_id ?? "",
        data.booking_order_id ?? "",
        food_booking_id ?? "",
        confirmFoodBookingId ?? "",
        foodInvoiceID ?? "",
        foodRefID ?? "",
        data.selectedFoodObj[i].account_id ?? "",
        data.selectedFoodObj[i].foodPartner_name ?? "",
        data.selectedFoodObj[i].agent_id ?? "",
        data.selectedFoodObj[i].foodPartner_sub_name ?? "",
        data.selectedFoodObj[i].agent_sub_id ?? "",
        data.selectedFoodObj[i].txn_id ?? "",
        data.selectedFoodObj[i].location ?? "",
        data.selectedFoodObj[i].kitchen_name ?? "",
        data.selectedFoodObj[i].kitchen_type ?? "",
        data.selectedFoodObj[i].item_name ?? "",
        data.selectedFoodObj[i].food_items_name ?? "",
        data.selectedFoodObj[i].add_qty ?? "",
        data.selectedFoodObj[i].price ?? "",
        data.selectedFoodObj[i].fssai_no ?? "",
      ]
    );
  }
  let message = "Error while submitting Food Booking Data";

  if (result.affectedRows && result2.affectedRows) {
    message = "Booking Food Items Completed Successfully";
    let dataOfFoodBooking = moment(foodBkngDate).format("dddd, DD MMM YYYY");
    // console.log("dataOfFoodBooking", dataOfFoodBooking);
    const myArray = data.selectedFoodObj;
    // myArray.forEach((element, index, array) => {
    //   console.log("element.guesy", element);
    //   // console.log("index", index);
    //   // console.log("array", array);
    // });

    var newArraySNO = myArray.map((index) => index);
    // console.log("newArraySNO", newArraySNO);

    var nameListSNO = newArraySNO.splice(0, data.selectedFoodObj.length);

    // console.log("nameListSNO", nameListSNO);

    var separateListSNO =
      '<ul class="no-bullets" style="list-style-type: none;margin: 0;padding: 0;">';
    nameListSNO.forEach(function (value) {
      separateListSNO += "<li>" + value + "</li>";
    });
    separateListSNO += "</ul>";
    // console.log("separateListSNO", separateListSNO);
    // FOOD ITEM NAME
    var totalFoodName = myArray.map((element) => element.food_items_name);
    // console.log("totalFoodName", totalFoodName);

    var listFoodItems = totalFoodName.splice(0, data.selectedFoodObj.length);
    // console.log("listFoodItems", listFoodItems);

    var seperateListFoodName =
      '<ul class="no-bullets" style="list-style-type: none;margin: 0;padding: 0;">';
    listFoodItems.forEach(function (value) {
      seperateListFoodName += "<li>" + value + "</li>";
    });
    seperateListFoodName += "</ul>";
    // console.log("seperateListFoodName", seperateListFoodName);
    // FOOD PRICE (1 QTY)
    var foodPricePerQty = myArray.map((element) => element.price);
    // console.log("foodPricePerQty", foodPricePerQty);

    var listFoodPrice = foodPricePerQty.splice(0, data.selectedFoodObj.length);
    // console.log("listFoodPrice", listFoodPrice);

    var seperateFoodPrice =
      '<ul class="no-bullets" style="list-style-type: none;margin: 0;padding: 0;">';
    listFoodPrice.forEach(function (value) {
      seperateFoodPrice += "<li>" + value + "</li>";
    });
    seperateFoodPrice += "</ul>";
    // console.log("seperateFoodPrice", seperateFoodPrice);

    // Quantity
    var totalQuantity = myArray.map((element) => element.add_qty);
    // console.log("totalQuantity", totalQuantity);

    var listTotalQuantity = totalQuantity.splice(
      0,
      data.selectedFoodObj.length
    );
    // console.log("listTotalQuantity", listTotalQuantity);

    var seperateFoodQuantity =
      '<ul class="no-bullets" style="list-style-type: none;margin: 0;padding: 0;">';
    listTotalQuantity.forEach(function (value) {
      seperateFoodQuantity += "<li>" + value + "</li>";
    });
    seperateFoodQuantity += "</ul>";
    // console.log("seperateFoodQuantity", seperateFoodQuantity);

    // TOTAL AMOUNT
    var totalAmountPayable = myArray.map(
      (element) => element.add_qty * element.price
    );
    // console.log("totalAmountPayable", totalAmountPayable);

    var listTotalAmountPayable = totalAmountPayable.splice(
      0,
      data.selectedFoodObj.length
    );
    // console.log("listTotalAmountPayable", listTotalAmountPayable);

    var seperateAmountPayable =
      '<ul class="no-bullets" style="list-style-type: none;margin: 0;padding: 0;">';
    listTotalAmountPayable.forEach(function (value) {
      seperateAmountPayable += "<li>" + value + "</li>";
    });
    seperateAmountPayable += "</ul>";
    // console.log("seperateAmountPayable", seperateAmountPayable);

    const mailOptions = {
      from: "noreply@mangohomz.com",
      to: "thirupathi@mangohomz.com",
      // to: data.email_id,
      subject: "Booking Confirmed",
      html: `
          <div style="border:1px solid grey;>
            <div style="box-shadow:2px 2px 10px 2px grey;">
              <div style="display:flex;">
                <div style="display:flex; width:100%;">
                   <a href="https://mangohomz.com" target="_blank"><img src="https://mangohomz.com/img/logo-main.6f335097.png" width="200px" height="50px" alt="mangohomz logo"></a>
                </div>
                <div style="font-weight:700;margin-top: 42px;margin-right: 6px;margin-left:300px">
                  <p><a target="_blank" href="https://mangohomz.com" style="color:darkblue">www.mangohomz.ai</a></p>
                </div>
              </div>
              <div style="display:flex;">
                <div style="height: 5px;width: 70%;background-color:green;"></div>
                <div style="height: 5px;width: 30%;background-color:darkblue;"></div>
              </div>
              <div style="padding:10px">
                <div>
                  Greetings, <span style="font-weight:700">Dear Customer,</span>
                </div>
                <div style="margin: 5px 0px">
                <p>We value your trust in MangoHomz and choice of us as your go-to provider of medical travel. We are happy to inform you that a reservation has been made for your meal from our food partner Vidya. It will be brought as quickly as possible to your room. Our team is working hard to make sure you have a happy stay with MangoHomz while you are busy with your doctor.</p>
                </div>
                <div style="border:2px solid grey; background-color:green">
                  <div>
                    <div style="margin:10px 0 20px 18px">
                      <div style="color:white">Thank you for booking with us.</div>
                      <div style="color:white">
                        <b>Your booking at is confirmed.</b>
                      </div>
                    </div>
                    <div style="background-color:white;padding:5px;margin:auto;width:600px;border-radius:10px;margin-bottom:15px">
                      <ul>
                        <li style="color:black;">
                        You have paid amount of INR <b>${data.payable_amount}</b>
                        </li>
                        <li style="color:green;font-weight:700">
                        Food once booked Cancellation is not applicable on the same.
                        </li>
                      </ul>
                    </div>
                    <div style="background-color:white;padding:5px;margin:auto;width:600px;border-radius:10px;margin-bottom:15px;color:black;">
                    <div style="font-size:15px;font-family:verdana;"><b>Food Booking Details</b></div>
                    <div style="width:600px;padding-top:15px;">
                       <div style="display:flex;width:100%;border-top: 1px solid silver;">
                <div style="width:50%">
                  <div class="text-subtitle" style="
              font-size: 12px;
              padding-left: 10px;
              padding-top:5px;border-bottom: 1px solid silver;border-right: 1px solid silver;border-left: 1px solid silver;
            ">
            Booking ID :   <b> 
            ${data.booking_order_id}</b>
                  </div>
                </div>
                <div style="font-size: 12px;padding-left: 10px;padding-top:5px;width:50%;border-bottom: 1px solid silver;border-right: 1px solid silver;">
                Food Booking ID : <b>${confirmFoodBookingId} </b>
                </div>
              </div>
              <div style="display:flex;width:100%">
              <div style="width:50%">
                <div class="text-subtitle" style="
            font-size: 12px;
            padding-left: 10px;
            padding-top:5px;border-bottom: 1px solid silver;border-right: 1px solid silver;border-left: 1px solid silver;
          ">
          Property Name :   <b> 
          ${data.hotel_property_name} </b>
                </div>
              </div>
            
              <div class="text-subtitle" style="
          font-size: 12px;
          padding-left: 10px;
          padding-top:5px;width:50%;border-bottom: 1px solid silver;border-right: 1px solid silver;
        " >
        Date of Booking :<b> 
        ${dataOfFoodBooking}</b>
              </div>
            </div>
            <div style="display:flex;width:100%">
            <div style="width:50%">
              <div class="text-subtitle" style="
          font-size: 12px;
          padding-left: 10px;
          padding-top:5px;border-bottom: 1px solid silver;border-right: 1px solid silver;border-left: 1px solid silver;
        " >
        City :<b> 
        ${data.booking_city} </b>
              </div>
            </div>
            <div style="font-size: 12px;padding-left: 10px;padding-top:5px;width:50%;border-bottom: 1px solid silver;border-right: 1px solid silver;">
            Restaurant Name  : <b>${data.selectedFoodObj[0].foodPartner_sub_name}</b>
            </div>
          </div>
          <div style="display:flex;width:100%">
            <div style="width:50%">
              <div class="text-subtitle" style="
          font-size: 12px;
          padding-left: 10px;
          padding-top:5px;border-bottom: 1px solid silver;border-right: 1px solid silver;border-left: 1px solid silver;
        "  >
        Mobile Number :<b> 
        ${data.mobile_number}</b>
              </div>
            </div>
            <div style="font-size: 12px;padding-left: 10px;padding-top:5px;width:50%;border-bottom: 1px solid silver;border-right: 1px solid silver;">
            Booking Time:
            <b>${data.food_booking_time} </b>
            </div>
          </div>
          <div style="display:flex;width:100%">
          <div style="width:50%">
            <div class="text-subtitle" style="
        font-size: 12px;
        padding-left: 10px;
        padding-top:5px;border-bottom: 1px solid silver;border-right: 1px solid silver;border-left: 1px solid silver;
      "  >
      Fssai No:<b> 
      ${data.selectedFoodObj[0].fssai_no}</b>
            </div>
          </div>
          <div style="font-size: 12px;padding-left: 10px;padding-top:5px;width:50%;border-bottom: 1px solid silver;border-right: 1px solid silver;">
          Food Items Count :
          <b>${data.total_item_qty} </b>
          </div>
        </div>
        <div style="display:flex;width:100%">
        <div style="width:50%">
          <div class="text-subtitle" style="
      font-size: 12px;
      padding-left: 10px;
      padding-top:5px;border-bottom: 1px solid silver;border-right: 1px solid silver;border-left: 1px solid silver;
    "  >
    Email ID :<b> 
    ${data.email_id}</b>
          </div>
        </div>
        <div style="font-size: 12px;padding-left: 10px;padding-top:5px;width:50%;border-bottom: 1px solid silver;border-right: 1px solid silver;">
        Total Booked Qty :
        <b>${data.total_qty_booked}</b>
        </div>
      </div>
           </div>
              </div>

              
              <div style="background-color:white;padding:5px;margin:auto;width:600px;border-radius:10px;margin-bottom:15px;color:black;">
              <div style="font-size:15px;font-family:verdana;"><b>Food Booking Item Details</b></div>
              <div class="row col-12"
              style="display:flex;width:100%;text-align:center;border-top: 1px solid silver;">
         
              <div class="col-10 text-right" style="text-align: center;border-bottom: 1px solid silver;border-right: 1px solid silver;padding-left: 10px;
            width:30%;
            padding-top:5px;padding-bottom:5px;">
                <b>Food Item Name</b>
              </div>
              <div class="col-10 text-right" style="text-align: center;border-bottom: 1px solid silver;border-right: 1px solid silver;padding-left: 10px;
              width:20%;
              padding-top:5px;padding-bottom:5px;">
                  <b>Price (for 1 Qty)</b>
                </div>
                <div class="col-10 text-right" style="text-align: center;border-bottom: 1px solid silver;border-right: 1px solid silver;padding-left: 10px;
                width:20%;
                padding-top:5px;padding-bottom:5px;">
                    <b>Quantity</b>
                  </div>
                  <div class="col-10 text-right" style="text-align: center;border-bottom: 1px solid silver;border-right: 1px solid silver;padding-left: 10px;
                  width:20%;
                  padding-top:5px;padding-bottom:5px;">
                      <b>Total Amount (₹)</b>
                    </div>
            </div>
            <div class="row col-12"
            style="display: flex; width: 100%; text-align: center;">
             
              <div class="no-bullets" style="
              text-align: center;
              border-bottom: 1px solid silver;border-right: 1px solid silver;
              padding-left: 10px;
              width:30%;
              padding-top: 5px;
              padding-bottom: 5px;line-height:180%
            ">${seperateListFoodName}
              </div>
              <div class="no-bullets" style="
              text-align: center;
              border-bottom: 1px solid silver;border-right: 1px solid silver;
              padding-left: 10px;
              width:20%;
              padding-top: 5px;
              padding-bottom: 5px;line-height:180%
            ">${seperateFoodPrice}
              </div>
              <div class="no-bullets" style="
              text-align: center;
              border-bottom: 1px solid silver;border-right: 1px solid silver;
              padding-left: 10px;
              width:20%;
              padding-top: 5px;
              padding-bottom: 5px;line-height:180%
            ">${seperateFoodQuantity}
              </div>
              <div class="no-bullets" style="
              text-align: center;
              border-bottom: 1px solid silver;border-right: 1px solid silver;
              padding-left: 10px;
              width:20%;
              padding-top: 5px;
              padding-bottom: 5px;line-height:180%
            ">${seperateAmountPayable}
              </div>

              </div>
            </div>
     </div>
    

    
     
     <div class="text-center justify-center" style="background-color:white;padding:5px;margin:auto;width:600px;border-radius:10px;margin-bottom:15px;color:black;text-align:center;">
              <div style="font-size:15px;font-family:verdana;"><b>Food Price Details</b></div>
              <div style="display-flex;width:600px;padding-top:15px;color:black;text-align:center" class="text-center justify-center">
              <div class="row col-12 q-mt-sm" style="border: 1px solid silver;width:500px;text-align:center" class="text-center justify-center">
              <div style="display:flex;width:100%">
                <div style="width:60%">
                  <div class="text-subtitle" style="
              font-size: 12px;
              padding-left: 10px;
              padding-top:5px;
            ">
                    <b>Price Details</b>
                  </div>
                </div>
                <div style="font-size: 12px;padding-left: 10px;padding-top:5px;width:40%">
                  <b> Amount (₹) </b>
                </div>
              </div>
              <div style="display:flex;width:100%; border-top:1px solid silver">
                <div style="width:60%">
                  <div class="text-subtitle" style="
              font-size: 12px;
              padding-left: 10px;
              padding-top:5px;
            ">
            Food Charges (for ${data.total_item_qty} Quantity)
                  </div>
                </div>
                <div class="text-subtitle" style="
              font-size: 12px;
              padding-left: 10px;
              padding-top:5px;width:40%
            ">
            ₹${data.food_charges}
                </div>
              </div>
          <div style="display:flex;width:100%;">
           <div style="width:60%">
             <div class="text-subtitle" style="ont-size: 12px; padding-left: 10px; padding-top:5px;color:green;font-size:15px;">
                Applied MH Offer :- ${data.mh_offer_coupon}
             </div>
           </div>
           <div class="text-subtitle" style="font-size: 12px; padding-left: 10px; padding-top:5px;width:40%;color:green;font-size:15px;">
            (-) ${data.mh_offer_price}
           </div>
         </div>
         <div style="display:flex;width:100%;">
           <div style="width:60%">
             <div class="text-subtitle" style="ont-size: 12px; padding-left: 10px; padding-top:5px;color:green;font-size:15px;">
                Restaurant Offer
             </div>
           </div>
           <div class="text-subtitle" style="font-size: 12px; padding-left: 10px; padding-top:5px;width:40%;color:green;font-size:15px;">
            (-) ${data.restaurantOfferPrice}
           </div>
         </div>
        <div style="display:flex;width:100%;">
        <div style="width:60%">
          <div class="text-subtitle" style="
      font-size: 12px;
      padding-left: 10px;
      padding-top:5px;
    ">
    Price after discount
          </div>
        </div>
        <div class="text-subtitle" style="
      font-size: 12px;
      padding-left: 10px;
      padding-top:5px;width:40%;
    ">
    ₹${data.price_after_discount}
        </div>
      </div>
              <div style="display:flex;width:100%">
                <div class="text-subtitle" style="
              font-size: 12px;
              padding-left: 65px;
              padding-top:5px;
            ">
                  Add GST at (18%) :-
                </div>
              </div>
              <div style="display:flex;width:100%;">
                <div style="width:60%">
                  <div class="text-subtitle " style="
              font-size: 12px;
              padding-left: 70px;
              padding-top:5px;
            ">
                    CGST at (${data.cgst_percentage}
                    %)
                  </div>
                </div>
                <div class="text-subtitle"
                  style="font-size: 12px;padding-left: 10px;padding-top:5px;width:40%">
                  ₹${data.cgst_amount}
                </div>
              </div>
              <div style="display:flex;width:100%;">
                <div style="width:60%">
                  <div class="text-subtitle " style="
              font-size: 12px;
              padding-left: 70px;
              padding-top:5px;
            ">
                    SGST at (${data.sgst_percentage}
                    %)
                  </div>
                </div>
                <div class="text-subtitle"
                  style="font-size: 12px;padding-left: 10px;padding-top:5px;width:40%">
                  ₹${data.sgst_amount}
                </div>
              </div>
              <div style="display:flex;width:100%;">
                <div style="width:60%">
                  <div class="text-subtitle" style="
              font-size: 15px;
              padding-left: 10px;
              padding-top:5px;
            ">
                    Total Price
                  </div>
                </div>
                <div class="text-subtitle"
                  style="font-size: 12px;padding-left: 10px;padding-top:5px;width:40%">
                  <strong>
                  ₹${data.payable_amount}
                    /-
                  </strong>
                </div>
              </div>
               
            </div>
              </div>
        </div>
                  </div>
                </div>
                </div>
                </div>

                



                <div style="margin:10px 0px 0px 0px">
                  <div>Thank You.</div>
                  <div style="font-weight:700;">TEAM MANGOHOMZ</div>
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
                    <h5 style="margin:0px">Please contact with us : </h5> <a href="mailto:care@mangohomz.com" style="color:darkblue;font-weight:700;">care@mangohomz.com</a> & <a href="https://www.mangohomz.com " target="_blank" style="color:darkblue;font-weight:700;">www.mangohomz.ai </a>
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
      `,
    };

    var mailOptions1 = {
      from: "noreply@mangohomz.com",
      to: "thirupathi@mangohomz.com",
      // to: data.food_partner_email,
      //  bcc: 'forward@mangohomz.com',
      subject: `Booking Confirmed / ${data.selectedFoodObj[0].foodPartner_sub_name} /  ${data.booking_order_id}`,
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
                <div style="height: 5px;width: 30%;background-color:darkblue;"></div>
              </div>
              <div style="padding:10px">
              <div>
              Dear, <span style="font-weight:700"> ${data.selectedFoodObj[0].foodPartner_sub_name}</span>,
            </div>
                <div>
                  Greetings!!
                </div>
                <div style="margin: 5px 0px">
                <p>Please be informed that
                <div class="text-bold text-h5">
          Food Booking No -
          ${confirmFoodBookingId}
        </div>
               is Book a Food from
               <b> ${data.hotel_property_name}</b>
                has been booked under your <b>${data.selectedFoodObj[0].foodPartner_sub_name}</b>. Please find the Customer Food Booking Details below.</p>
                </div>
            
                <div style="background-color:white;padding:5px;margin:auto;width:600px;border-radius:10px;margin-bottom:15px;color:black;">
                    <div style="font-size:15px;font-family:verdana;"><b>Food Booking Details</b></div>
                    <div style="width:600px;padding-top:15px;">
                       <div style="display:flex;width:100%;border-top: 1px solid silver;">
                <div style="width:50%">
                  <div class="text-subtitle" style="
              font-size: 12px;
              padding-left: 10px;
              padding-top:5px;border-bottom: 1px solid silver;border-right: 1px solid silver;border-left: 1px solid silver;
            ">
            Booking ID :   <b> 
            ${data.booking_order_id}</b>
                  </div>
                </div>
                <div style="font-size: 12px;padding-left: 10px;padding-top:5px;width:50%;border-bottom: 1px solid silver;border-right: 1px solid silver;">
                Food Booking ID : <b>${confirmFoodBookingId} </b>
                </div>
              </div>
              <div style="display:flex;width:100%">
              <div style="width:50%">
                <div class="text-subtitle" style="
            font-size: 12px;
            padding-left: 10px;
            padding-top:5px;border-bottom: 1px solid silver;border-right: 1px solid silver;border-left: 1px solid silver;
          ">
          Property Name :   <b> 
          ${data.hotel_property_name} </b>
                </div>
              </div>
            
              <div class="text-subtitle" style="
          font-size: 12px;
          padding-left: 10px;
          padding-top:5px;width:50%;border-bottom: 1px solid silver;border-right: 1px solid silver;
        " >
        Date of Booking :<b> 
        ${dataOfFoodBooking}</b>
              </div>
            </div>
            <div style="display:flex;width:100%">
            <div style="width:50%">
              <div class="text-subtitle" style="
          font-size: 12px;
          padding-left: 10px;
          padding-top:5px;border-bottom: 1px solid silver;border-right: 1px solid silver;border-left: 1px solid silver;
        " >
        City :<b> 
        ${data.booking_city} </b>
              </div>
            </div>
            <div style="font-size: 12px;padding-left: 10px;padding-top:5px;width:50%;border-bottom: 1px solid silver;border-right: 1px solid silver;">
            Restaurant Name  : <b>${data.selectedFoodObj[0].foodPartner_sub_name}</b>
            </div>
          </div>
          <div style="display:flex;width:100%">
            <div style="width:50%">
              <div class="text-subtitle" style="
          font-size: 12px;
          padding-left: 10px;
          padding-top:5px;border-bottom: 1px solid silver;border-right: 1px solid silver;border-left: 1px solid silver;
        "  >
        Mobile Number :<b> 
        ${data.mobile_number}</b>
              </div>
            </div>
            <div style="font-size: 12px;padding-left: 10px;padding-top:5px;width:50%;border-bottom: 1px solid silver;border-right: 1px solid silver;">
            Booking Time:
            <b>${data.food_booking_time} </b>
            </div>
          </div>
          <div style="display:flex;width:100%">
          <div style="width:50%">
            <div class="text-subtitle" style="
        font-size: 12px;
        padding-left: 10px;
        padding-top:5px;border-bottom: 1px solid silver;border-right: 1px solid silver;border-left: 1px solid silver;
      "  >
      Fssai No:<b> 
      ${data.selectedFoodObj[0].fssai_no}</b>
            </div>
          </div>
          <div style="font-size: 12px;padding-left: 10px;padding-top:5px;width:50%;border-bottom: 1px solid silver;border-right: 1px solid silver;">
          Food Items Count :
          <b>${data.total_item_qty} </b>
          </div>
        </div>
        <div style="display:flex;width:100%">
        <div style="width:50%">
          <div class="text-subtitle" style="
      font-size: 12px;
      padding-left: 10px;
      padding-top:5px;border-bottom: 1px solid silver;border-right: 1px solid silver;border-left: 1px solid silver;
    "  >
    Email ID :<b> 
    ${data.email_id}</b>
          </div>
        </div>
        <div style="font-size: 12px;padding-left: 10px;padding-top:5px;width:50%;border-bottom: 1px solid silver;border-right: 1px solid silver;">
        Total Booked Qty :
        <b>${data.total_qty_booked}</b>
        </div>
      </div>
           </div>
              </div>

              
              <div style="background-color:white;padding:5px;margin:auto;width:600px;border-radius:10px;margin-bottom:15px;color:black;">
              <div style="font-size:15px;font-family:verdana;"><b>Food Booking Item Details</b></div>
              <div class="row col-12"
              style="display:flex;width:100%;text-align:center;border-top: 1px solid silver;">
         
              <div class="col-10 text-right" style="text-align: center;border-bottom: 1px solid silver;border-right: 1px solid silver;padding-left: 10px;
            width:30%;
            padding-top:5px;padding-bottom:5px;">
                <b>Food Item Name</b>
              </div>
              <div class="col-10 text-right" style="text-align: center;border-bottom: 1px solid silver;border-right: 1px solid silver;padding-left: 10px;
              width:20%;
              padding-top:5px;padding-bottom:5px;">
                  <b>Price (for 1 Qty)</b>
                </div>
                <div class="col-10 text-right" style="text-align: center;border-bottom: 1px solid silver;border-right: 1px solid silver;padding-left: 10px;
                width:20%;
                padding-top:5px;padding-bottom:5px;">
                    <b>Quantity</b>
                  </div>
                  <div class="col-10 text-right" style="text-align: center;border-bottom: 1px solid silver;border-right: 1px solid silver;padding-left: 10px;
                  width:20%;
                  padding-top:5px;padding-bottom:5px;">
                      <b>Total Amount (₹)</b>
                    </div>
            </div>
            <div class="row col-12"
            style="display: flex; width: 100%; text-align: center;">
             
              <div class="no-bullets" style="
              text-align: center;
              border-bottom: 1px solid silver;border-right: 1px solid silver;
              padding-left: 10px;
              width:30%;
              padding-top: 5px;
              padding-bottom: 5px;line-height:180%
            ">${seperateListFoodName}
              </div>
              <div class="no-bullets" style="
              text-align: center;
              border-bottom: 1px solid silver;border-right: 1px solid silver;
              padding-left: 10px;
              width:20%;
              padding-top: 5px;
              padding-bottom: 5px;line-height:180%
            ">${seperateFoodPrice}
              </div>
              <div class="no-bullets" style="
              text-align: center;
              border-bottom: 1px solid silver;border-right: 1px solid silver;
              padding-left: 10px;
              width:20%;
              padding-top: 5px;
              padding-bottom: 5px;line-height:180%
            ">${seperateFoodQuantity}
              </div>
              <div class="no-bullets" style="
              text-align: center;
              border-bottom: 1px solid silver;border-right: 1px solid silver;
              padding-left: 10px;
              width:20%;
              padding-top: 5px;
              padding-bottom: 5px;line-height:180%
            ">${seperateAmountPayable}
              </div>

              </div>
            </div>
     </div>
    

    
     
     <div class="text-center justify-center" style="background-color:white;padding:5px;margin:auto;width:600px;border-radius:10px;margin-bottom:15px;color:black;text-align:center;">
              <div style="font-size:15px;font-family:verdana;"><b>Food Price Details</b></div>
              <div style="display-flex;width:600px;padding-top:15px;color:black;text-align:center" class="text-center justify-center">
              <div class="row col-12 q-mt-sm" style="border: 1px solid silver;width:500px;text-align:center" class="text-center justify-center">
              <div style="display:flex;width:100%">
                <div style="width:60%">
                  <div class="text-subtitle" style="
              font-size: 12px;
              padding-left: 10px;
              padding-top:5px;
            ">
                    <b>Price Details</b>
                  </div>
                </div>
                <div style="font-size: 12px;padding-left: 10px;padding-top:5px;width:40%">
                  <b> Amount (₹) </b>
                </div>
              </div>
              <div style="display:flex;width:100%; border-top:1px solid silver">
                <div style="width:60%">
                  <div class="text-subtitle" style="
              font-size: 12px;
              padding-left: 10px;
              padding-top:5px;
            ">
            Food Charges (for ${data.total_item_qty} Quantity)
                  </div>
                </div>
                <div class="text-subtitle" style="
              font-size: 12px;
              padding-left: 10px;
              padding-top:5px;width:40%
            ">
            ₹${data.food_charges}
                </div>
              </div>
          <div style="display:flex;width:100%;">
            <div style="width:60%">
              <div class="text-subtitle" style="font-size: 12px; padding-left: 10px; padding-top:5px;color:green;font-size:15px;">
                Applied MH Offer :- ${data.mh_offer_coupon}
              </div>
            </div>
            <div class="text-subtitle" style="font-size: 12px; padding-left: 10px; padding-top:5px;width:40%;color:green;font-size:15px;">
              (-) ${data.mh_offer_price}
            </div>
          </div>
          <div style="display:flex;width:100%;">
            <div style="width:60%">
              <div class="text-subtitle" style="font-size: 12px; padding-left: 10px; padding-top:5px;color:green;font-size:15px;">
                Restaurant Offer
              </div>
            </div>
            <div class="text-subtitle" style="font-size: 12px; padding-left: 10px; padding-top:5px;width:40%;color:green;font-size:15px;">
              (-) ${data.restaurantOfferPrice}
            </div>
          </div>
        <div style="display:flex;width:100%;">
        <div style="width:60%">
          <div class="text-subtitle" style="
      font-size: 12px;
      padding-left: 10px;
      padding-top:5px;
    ">
    Price after discount
          </div>
        </div>
        <div class="text-subtitle" style="
      font-size: 12px;
      padding-left: 10px;
      padding-top:5px;width:40%;
    ">
    ₹${data.price_after_discount}
        </div>
      </div>
              <div style="display:flex;width:100%">
                <div class="text-subtitle" style="
              font-size: 12px;
              padding-left: 65px;
              padding-top:5px;
            ">
                  Add GST at (18%) :-
                </div>
              </div>
              <div style="display:flex;width:100%;">
                <div style="width:60%">
                  <div class="text-subtitle " style="
              font-size: 12px;
              padding-left: 70px;
              padding-top:5px;
            ">
                    CGST at (${data.cgst_percentage}
                    %)
                  </div>
                </div>
                <div class="text-subtitle"
                  style="font-size: 12px;padding-left: 10px;padding-top:5px;width:40%">
                  ₹${data.cgst_amount}
                </div>
              </div>
              <div style="display:flex;width:100%;">
                <div style="width:60%">
                  <div class="text-subtitle " style="
              font-size: 12px;
              padding-left: 70px;
              padding-top:5px;
            ">
                    SGST at (${data.sgst_percentage}
                    %)
                  </div>
                </div>
                <div class="text-subtitle"
                  style="font-size: 12px;padding-left: 10px;padding-top:5px;width:40%">
                  ₹${data.sgst_amount}
                </div>
              </div>
              <div style="display:flex;width:100%;">
                <div style="width:60%">
                  <div class="text-subtitle" style="
              font-size: 15px;
              padding-left: 10px;
              padding-top:5px;
            ">
                    Total Price
                  </div>
                </div>
                <div class="text-subtitle"
                  style="font-size: 12px;padding-left: 10px;padding-top:5px;width:40%">
                  <strong>
                  ₹${data.payable_amount}
                    /-
                  </strong>
                </div>
              </div>
               
            </div>
              </div>
        </div>
                  </div>
                </div>
                </div>
                </div>


                </div>
                <div style="margin:10px 0px 0px 0px">
                <ul style="list-style-type:number">
                <li><b> Accommodation Partner will receive Check-in day booking amount 24 hrs before the check-in, from MangoHomz towards accommodation charges.</b></li>
              
             
             
              <li>The <b> Accommodation Partner after booking confirmation</b>, is not permitted to cancel any of the bookings without 72 hours prior notice to the Mangohomz and seeking approval to do so in writing.</li>
              
            
            
              <li><b>	In case of cancellation before 3 days of check in there will be no payment to the Accommodation Partner .</b></li>
              
            
             
              <li><b> In case of cancellation by the Customer within 24 hours of check in,, the Accommodation partner will retain the check-in day booking amount .</b></li>
              
              <li><b> In case of any cancellation after check-in the MangoHomz  will pay to the Accommodation  partner the consumed days by the user  plus one additional day room rent.</b></li>
             
              <li><b>	Rest of the terms & conditions as per the agreement between you & Mangohomz Technologies Pvt. Ltd.</b></li>
              </ul>
              </div>
              <div style="margin:10px 0px 0px 0px">
              <div>Please provide the visitor with your best services.
              </div>
            
            </div>
                <div style="margin:10px 0px 0px 0px">
                  <div>Thank You.</div>
                  <div style="font-weight:700;">TEAM MANGOHOMZ</div>
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
                    <h5 style="margin:0px">Please contact with us : </h5> <a href="mailto:care@mangohomz.com" style="color:darkblue;font-weight:700;">care@mangohomz.com</a> & <a href="https://www.mangohomz.com " target="_blank" style="color:darkblue;font-weight:700;">www.mangohomz.ai </a>
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
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("1349,Succ", info.response);
      }
    });

    transporter.sendMail(mailOptions1, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("1357,Succ", info.response);
      }
    });
  }
  return { message };
}

async function createFoodBookingLogs(data) {
  let addCode = "";
  let cityLength = data.booking_city_id.length;
  if (cityLength == 1) {
    addCode = `00${data.booking_city_id}`;
  } else if (cityLength == 2) {
    addCode = `0${data.booking_city_id}`;
  } else {
    addCode = `${data.booking_city_id}`;
  }

  let selected_items_array = [];
  for (let item of data.selectedFoodObj) {
    selected_items_array.push(`${item.food_items_name}-${item.add_qty}`);
  }

  let list_of_selected_items = selected_items_array.join(",");

  let foodBkngDate = data.food_booking_date.split("/").reverse().join("-");
  let month = moment(new Date()).format("MM");
  let year = moment(new Date()).format("YY");
  let foodBkngID = await helper.generateMaxFoodBookingLogsId();
  let food_booking_id = foodBkngID.toString().padStart("6", 0);
  let confirmFoodBookingId = `MHF${year}${month}${addCode}${food_booking_id}`;

  let foodInvoiceID = `MFI${year}${month}${addCode}${food_booking_id}`;
  let foodRefID = `MIR${year}${month}${addCode}${food_booking_id}`;

  let result = await db.query(
    `INSERT IGNORE INTO mh_food_booking_table_logs (
      account_id, 
      booking_id, 
      booking_order_id, 
      food_booking_id, 
      food_booking_orderid, 
      invoice_number, 
      food_reference_id, 
      booking_city, 
      booking_city_id, 
      hotel_property_name, 
      near_hospital_name, 
      near_hospital_id, 
      check_in, 
      check_out, 
      guest_count, 
      no_of_days, 
      restaurant_fssai_no, 
      foodPartner_name, 
      food_partner_id, 
      foodPartner_sub_name, 
      food_partner_sub_id, 
      food_booking_date, 
      food_booking_type, 
      food_booking_time, 
      total_qty_booked, 
      total_item_qty, 
      food_charges, 
      discount_type, 
      discount, 
      discount_price, 
      base_price, 
      mh_offer_price, 
      mh_offer_coupon,
      partner_offer_price, 
      price_after_discount, 
      gst_percentage, 
      gst_on_base_price, 
      cgst_percentage, 
      cgst_amount, 
      sgst_percentage, 
      sgst_amount,
      food_booking_items, 
      final_price_amount, 
      country_name, 
      country_code, 
      mobile_number, 
      whatsapp_number, 
      email_id, 
      food_partner_email, 
      alternatefood_partner_email, 
      gstin_no) 
      VALUES 
    (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.selectedFoodObj[0].account_id ?? "",
      data.booking_id ?? "",
      data.booking_order_id ?? "",
      food_booking_id ?? "",
      confirmFoodBookingId ?? "",
      foodInvoiceID ?? "",
      foodRefID ?? "",
      data.booking_city ?? "",
      data.booking_city_id ?? "",
      data.hotel_property_name ?? "",
      data.near_hospital_name ?? "",
      data.near_hospital_id ?? "",
      data.check_in ?? "",
      data.check_out ?? "",
      data.guests_count ?? "",
      data.no_of_days ?? "",
      data.selectedFoodObj[0].fssai_no ?? "",
      data.selectedFoodObj[0].foodPartner_name ?? "",
      data.selectedFoodObj[0].agent_id ?? "",
      data.selectedFoodObj[0].foodPartner_sub_name ?? "",
      data.selectedFoodObj[0].agent_sub_id ?? "",
      foodBkngDate ?? "",
      data.food_booking_type ?? "",
      data.food_booking_time ?? "",
      data.total_qty_booked ?? "",
      data.total_item_qty ?? "",
      data.food_charges ?? "",
      data.discount_type ?? "",
      data.discount ?? "",
      data.discount_price ?? "",
      data.base_price ?? "",
      data.mh_offer_price ?? "",
      data.mh_offer_coupon ?? "",
      data.restaurantOfferPrice ?? "",
      // data.selected_offer_price  ?? "",
      data.price_after_discount ?? "",
      data.gst_percentage ?? "",
      data.gst_on_base_price ?? "",
      data.cgst_percentage ?? "",
      data.cgst_amount ?? "",
      data.sgst_percentage ?? "",
      data.sgst_amount ?? "",
      list_of_selected_items ?? "",
      data.payable_amount ?? "",
      data.country_name ?? "",
      data.country_code ?? "",
      data.mobile_number ?? "",
      data.whatsapp_number ?? "",
      data.email_id ?? "",
      data.food_partner_email ?? "",
      data.alternatefood_partner_email ?? "",
      data.gstin_no ?? "",
    ]
  );

  for (let i = 0; i < data.selectedFoodObj.length; i++) {
    var result2 = await db.query(
      `INSERT IGNORE INTO mh_food_booking_txn_table_logs (mh_booking_id, mh_booking_order_id, food_booking_id,food_booking_orderid, invoice_number,food_reference_id,account_id, foodPartner_name, food_partner_id, foodPartner_sub_name, food_partner_sub_id, food_txn_id, location, kitchen_name, kitchen_type, selected_food_item, food_items_list, item_quantity,item_price,restaurant_fssai_no) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        data.booking_id ?? "",
        data.booking_order_id ?? "",
        food_booking_id ?? "",
        confirmFoodBookingId ?? "",
        foodInvoiceID ?? "",
        foodRefID ?? "",
        data.selectedFoodObj[i].account_id ?? "",
        data.selectedFoodObj[i].foodPartner_name ?? "",
        data.selectedFoodObj[i].agent_id ?? "",
        data.selectedFoodObj[i].foodPartner_sub_name ?? "",
        data.selectedFoodObj[i].agent_sub_id ?? "",
        data.selectedFoodObj[i].txn_id ?? "",
        data.selectedFoodObj[i].location ?? "",
        data.selectedFoodObj[i].kitchen_name ?? "",
        data.selectedFoodObj[i].kitchen_type ?? "",
        data.selectedFoodObj[i].item_name ?? "",
        data.selectedFoodObj[i].food_items_name ?? "",
        data.selectedFoodObj[i].add_qty ?? "",
        data.selectedFoodObj[i].price ?? "",
        data.selectedFoodObj[i].fssai_no ?? "",
      ]
    );
  }
  let message = "Error while submitting Food Booking Data";

  if (result.affectedRows && result2.affectedRows) {
    message = "Booking Food Items Completed Successfully";
  }
  return { message };
}

function sendBookingConfirmedSms(data, confirmBookingId) {
  request(
    `http://api.bulksmsgateway.in/sendmessage.php?user=Mangohomzz&password=Mangohomzz@123&mobile=${data.phone_no}&message=Dear ${data.guestDataObj[0].first_name} Thank you for your Booking at MANGOHOMZ. Your MH Booking ID is ${confirmBookingId}. Details are sent to your registered mail ID. For any assistance, please Call MH Care Number 8929982655. Thank you -Team MANGOHOMZ. Stay Well - Get Well&sender=MGHOMZ&type=3&template_id=1007248456060570234`,
    { json: true },
    (err, response, data) => {
      if (err) {
        console.log(err);
      }
    }
  );
}

function sendBookingConfirmedSmsToAlternate(data, confirmBookingId) {
  request(
    `http://api.bulksmsgateway.in/sendmessage.php?user=Mangohomzz&password=Mangohomzz@123&mobile=${data.alternate_no}&message=Dear ${data.guestDataObj[0].first_name} Thank you for your Booking at MANGOHOMZ. Your MH Booking ID is ${confirmBookingId}. Details are sent to your registered mail ID. For any assistance, please Call MH Care Number 8929982655. Thank you -Team MANGOHOMZ. Stay Well - Get Well&sender=MGHOMZ&type=3&template_id=1007248456060570234`,
    { json: true },
    (err, response, data) => {
      if (err) {
        console.log(err);
      }
    }
  );
}

function sendBookingConfirmedPartnerSms(data, guestName, confirmBookingId) {
  //console.log("sss", data);
  request(
    `http://api.bulksmsgateway.in/sendmessage.php?user=Mangohomzz&password=Mangohomzz@123&mobile=${
      data.property_phone
    }&message=Dear Partner, Guest MH Booking ID is ${confirmBookingId} Scheduled on Date: ${moment(
      new Date()
    ).format(
      "DD-MM-YYYY"
    )}. Please ensure all necessary arrangements to serve Guests. For any assistance, please Call MH Care Number 8929982655. Thank you @Team MANGOHOMZ. Stay Well | Get Well&sender=MGHOMZ&type=3&template_id=1007715654595331304`,
    { json: true },
    (err, response, data) => {
      if (err) {
        console.log(err);
      }
    }
  );
}
// market: string, messages: {message: string, query: string}[]
async function create(data, ip, req, res) {
  // console.log("booking", data);
  let addCode = "";
  let cityLength = data.property_city_id.length;
  if (cityLength == 1) {
    addCode = `00${data.property_city_id}`;
  } else if (cityLength == 2) {
    addCode = `0${data.property_city_id}`;
  } else {
    addCode = `${data.property_city_id}`;
  }
  let month = moment(new Date()).format("MM");
  let year = moment(new Date()).format("YY");
  let bookingID = await helper.generateMaxBookingId();
  let booking_id = bookingID.toString().padStart("6", 0);
  let confirmBookingId = `MHA${year}${addCode}${month}${booking_id}`;
  let invoiceID = `MAI${year}${booking_id}${addCode}${month}`;
  let refID = `MAR${year}${booking_id}${addCode}${month}`;
  let ip_address = ip;
  let amenity_arr = [];
  {
    amenity_arr.push(data.facilities);
  }
  let amenities = amenity_arr.toString();
  let result = await db.query(
    `INSERT IGNORE INTO mh_bookings_table (account_id, booking_id, booking_order_id,reference_id,invoice_number, rz_order_id, rz_payment_id, rz_signature_id, ip_address, partner_id, partner_sub_id, hotel_txn_id, room_txn_id, property_name, property_type, room_type,facilities, near_hospital_id, near_hospital_name, check_in, check_out, checkIn_time,checkOut_time,guest_count, no_of_days, room_price, discount,partner_offer,base_price,partner_offer_percentage, discount_price, price_after_discount, mh_offer_price, mh_offer_name, gst_percentage, gst_amount,cgst_percentage, cgst_amount,sgst_percentage, sgst_amount, total_price, country_name,phone_no,primary_no,country_code,alternate_email_id,address_line_1,address_line_2,state_id,state_name,city,property_city_id,property_city_name,property_state_id,property_state_name,email_id,alternate_no,pincode,gstin_no,property_email,property_alternate_email,property_phone,room_category,address,room_booked_count,gst_status,mh_service_fee) VALUES 
    (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.account_id ?? "",
      booking_id ?? "",
      confirmBookingId ?? "",
      refID ?? "",
      invoiceID ?? "",
      data.razorpay_order_id,
      data.razorpay_payment_id,
      data.razorpay_signature,
      ip_address,
      data.partner_id ?? "",
      data.partner_sub_id ?? "",
      data.property_txn_id ?? "",
      data.room_txn_id ?? "",
      data.property_name ?? "",
      data.property_type ?? "",
      data.room_type ?? "",
      amenities ?? "",
      data.near_hospital_id ?? "",
      data.near_hospital_name ?? "",
      data.check_in ?? "",
      data.check_out ?? "",
      data.checkIn_time ?? "",
      data.checkOut_time ?? "",
      data.guestDataObj.length ?? "",
      data.no_of_days ?? "",
      data.room_price ?? "",
      data.discount ?? "",
      data.partner_offer ?? "",
      data.base_price ?? "",

      data.partner_offer_percentage ?? "",

      data.discount_price ?? "",
      data.price_after_discount ?? "",
      data.usedOffer_price ?? "",
      data.usedOffer_name ?? "",
      data.gst_percentage ?? "",
      data.gst_amount ?? "",
      data.cgst_percentage ?? "",
      data.cgst_amount ?? "",
      data.sgst_percentage ?? "",
      data.sgst_amount ?? "",
      data.total_price ?? "",
      // data.selected_country.code ?? data.country_code,
      data.country ?? "",
      data.phone_no ?? "",
      data.primary_no ?? "",
      data.selected_country.code ?? "",
      data.alternate_email_id ?? "",
      data.address_line1 ?? "",
      data.address_line2 ?? "",
      data.state_id ?? "",
      data.state ?? "",
      data.city ?? "",
      data.property_city_id ?? "",
      data.property_city_name ?? "",
      data.property_state_id ?? "",
      data.property_state_name ?? "",
      data.email_id ?? "",
      data.alternate_no ?? "",
      data.pincode ?? "",
      data.gstin_no ?? "",
      data.property_email ?? "",
      data.property_alternate_email ?? "",
      data.property_phone ?? "",
      data.room_category ?? "",
      data.address ?? "",
      data.room_booked_count ?? "",
      data.gst_status ?? "",
      data.mh_service_fee ?? "",
    ]
  );
  for (let i = 0; i < data.guestDataObj.length; i++) {
    var guestName =
      data.guestDataObj[i].first_name + " " + data.guestDataObj[i].last_name;
    var result2 = await db.query(
      `INSERT IGNORE INTO mh_booking_txn_table (mh_booking_id,invoice_number, reference_id, guest_type, guest_name,first_name,last_name, guest_gender) VALUES (?,?,?,?,?,?,?,?)`,
      [
        confirmBookingId ?? "",
        invoiceID ?? "",
        refID ?? "",
        data.guestDataObj[i].guest_type ?? "",
        guestName ?? "",
        data.guestDataObj[i].first_name ?? "",
        data.guestDataObj[i].last_name ?? "",
        data.guestDataObj[i].addrssing_guest ?? "",
      ]
    );
  }

  let message = "Error while submitting Booking Data";

  if (result.affectedRows && result2.affectedRows) {
    message = "Booking Completed Successfully";
    let CheckIN = moment(data.check_in).format("DD MMM YYYY");
    let CheckOUT = moment(data.check_out).format("DD MMM YYYY");
    const myArray = data.guestDataObj;
    // myArray.forEach((element, index, array) => {
    //   console.log("element.x", element.sno);
    //   console.log("element.guesy", element.guest_name);
    //   console.log("element.guesy", element.addrssing_guest);
    //   console.log("index", index);
    //   console.log("array", array);
    // });

    var newArraySNO = myArray.map((element) => element.sno);

    var nameListSNO = newArraySNO.splice(0, data.guestDataObj.length);

    var separateListSNO =
      '<ul class="no-bullets" style="list-style-type: none;margin: 0;padding: 0;">';
    nameListSNO.forEach(function (value) {
      separateListSNO += "<li>" + value + "</li>";
    });
    separateListSNO += "</ul>";
    // GUEST NAME
    var totalGuestName = myArray.map(
      (element) => element.addrssing_guest + element.guest_name
    );

    var listGuestName = totalGuestName.splice(0, data.guestDataObj.length);

    var separateListGuest =
      '<ul class="no-bullets" style="list-style-type: none;margin: 0;padding: 0;">';
    listGuestName.forEach(function (value) {
      separateListGuest += "<li>" + value + "</li>";
    });
    separateListGuest += "</ul>";
    // console.log("data.email_id", data.email_id);
    // console.log("data.email_id", data.property_email);
    //  var mailList = [data.email_id, data.property_email];
    //  sendBookingConfirmedSms(data, confirmBookingId);
    //sendBookingConfirmedSmsToAlternate(data, confirmBookingId);
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${currentDate
      .getDate()
      .toString()
      .padStart(2, "0")} ${currentDate
      .getHours()
      .toString()
      .padStart(2, "0")}:${currentDate
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${currentDate
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;
    /* Whatapps Sending */
    sendWAMessageForBookingConf(
      "booking_confirmation_user",
      data.phone_no.toString(),
      data.guestDataObj[0].first_name.toString(),

      "https://mangohomz.com/img/og2.png",
      "https://mangohomz.com/img/og2.png",
      [
        data.guestDataObj[0].first_name.toString(),
        confirmBookingId.toString(),
        formattedDate.toString(),
        data.near_hospital_name.toString(),
        data.property_name.toString(),
        data.address.toString(),
        data.room_type.toString(),
        data.check_in.toString() + "/" + data.checkIn_time.toString(),
        data.check_out.toString() + "/" + data.checkOut_time.toString(),
        data.room_booked_count.toString(),
        data.guestDataObj.length.toString(),
        data.total_price.toString(),
      ]
    )
      .then((result) => {
        // console.log(result);
      })
      .catch((error) => {
        console.error("Error in SendWhtNotification:", error);
      });

    // sendWAMessageForBookingConf(
    //   "booking_confirmation_partner",
    //   data.property_phone.toString(),
    //   data.property_name.toString(),

    //   "https://mangohomz.com/img/og2.png",
    //   "https://mangohomz.com/img/og2.png",
    //   [
    //     data.property_name.toString(),
    //     confirmBookingId.toString(),
    //     data.check_in.toString() + "/" + data.checkIn_time.toString(),
    //     "8929982655",

    //   ]
    // )
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.error("Error in SendWhtNotification:", error);
    //   });

    var mailOptions = {
      from: "noreply@mangohomz.com",
      to: data.email_id,
      // bcc: 'forward@mangohomz.com',
      subject: `Booking Confirmed / ${data.property_name}/ ${confirmBookingId} `,
      html: `
          <div style="border:1px solid grey;>
            <div style="box-shadow:2px 2px 10px 2px grey;">
              <div style="display:flex;">
                <div style="display:flex; width:100%;">
                  <a href="https://mangohomz.com" target="_blank"><img src="https://mangohomz.com/img/logo-main.6f335097.png" width="200px" height="50px" alt="mangohomz logo"></a>
                </div>
                <div style="font-weight:700;margin-top: 42px;margin-right: 6px;margin-left:300px">
                  <p><a target="_blank" href="https://mangohomz.com" style="color:darkblue">www.mangohomz.ai</a></p>
                </div>
              </div>
              <div style="display:flex;">
                <div style="height: 5px;width: 70%;background-color:green;"></div>
                <div style="height: 5px;width: 30%;background-color:darkblue;"></div>
              </div>
              <div style="padding:10px">
                <div>
                  Greetings, <span style="font-weight:700">  ${
                    data.guestDataObj[0].first_name
                  } ${data.guestDataObj[0].last_name} Ji</span>,
                </div>
                <div style="margin: 5px 0px">
                <p>We're glad you've placed your trust in MangoHomz and have chosen us as your preferred Medical trip partner. We are pleased to confirm that <b>${
                  data.property_name
                }</b> Near <b>(${
        data.near_hospital_name
      }</b>)has been reserved under your name. While you're busy preparing for your trip, our teams are constantly working towards providing patient-friendly stay for you.</p>
                </div>
                <div style="border:2px solid grey; background-color:white">
                  <div>
                    <div style="margin:10px 0 20px 18px">
                      <div style="color:white">Thank you for booking with us.</div>
                      <div style="color:white">
                        <b>Your booking at ${
                          data.property_name
                        } is confirmed.</b>
                      </div>
                    </div>


                    <div style="background-color:f3f3f3;padding:5px;margin:auto;width:750px;border-radius:10px;margin-bottom:15px">
                      <ul>
                        <li style="color:black;">
                          Your booking at <b>${
                            data.property_name
                          } </b> from <b>${CheckIN}(${
        data.checkIn_time
      })<b> to <b>${CheckOUT}(${data.checkOut_time})</b> for <b> ${
        data.guestDataObj.length
      } <b> guests is confirmed. You have reserved ${
        data.room_booked_count
      } room(s)for <b> ${data.no_of_days}</b> nights.
                        </li>
                        <li style="color:black">
                          You have paid amount of INR <b>${
                            data.total_price
                          }</b>.
                        </li>
                        <li style="color:blue;font-weight:700">
                        MANGOHOMZ (MH) strict Accommodation cancellation policy allows MangoHomz Guests, to receive a full refund, Only if the cancellation of Accommodation booking happens 3 days before the check-in date. And any cancellation happens between 3 days and 24hrs before check-in the guest will be entitled to get only 60% refund And if the Cancellation happens within in 24hrs till check-in time then Guests will get 25% refund after all necessary tax deductions applicable. Once checked in there is no cancellation.
                          
                        </li>
                      </ul>
                    </div>




                    <div style="background-color:f3f3f3;padding:5px;margin:auto;width:750px;border-radius:10px;margin-bottom:15px;color:black;">
                    <div style="font-size:15px;font-family:verdana;"><b>Accommodation Booking Details</b></div>



                    <table style="width:100%">
                    <style>
                    table, th, td {
                    border:1px solid black;
                    }
                    td {
                    text-align:left;
                    padding:2px;
                    }
                    </style>
                    
                    <tr>
                      <td> Booking ID :<b> 
                      ${confirmBookingId}</b></td>
                      <td>Booked Date : <b> ${moment(new Date()).format(
                        "DD-MM-YYYY"
                      )} </b></td>
                    </tr>
                    <tr>
                      <td>Customer Name :   <b> 
                      ${data.guestDataObj[0].addrssing_guest} 
                                    ${data.guestDataObj[0].first_name}  ${
        data.guestDataObj[0].last_name
      }</b></td>
                      <td v-if="
                      ${data.gstin_no} != ''"> 
                      Customer City/State :<b> 
                     ${data.city}/${data.state}
                      </b></td>
                    </tr>
                    <tr>
                    <td> Near Hospital Name :<b> 
                    ${data.near_hospital_name} </b></td>
                    <td>  Property Name : <b>${data.property_name}</b></td>
                    </tr>
                    <tr>
                    <td> Property Type :<b> 
                    ${data.property_type}</b></td>
                    <td>  Property Address:
                    <b>${data.address} </b></td>
                    </tr>
                    <tr>
                    <td> Room Type :<b> 
                    ${data.room_type}</b></td>
                    <td> Room Category:
                    <b>${data.room_category} </b></td>
                    </tr>
                    <tr>
                    <td> Check In Date/Time :<b> 
                    ${CheckIN}/${data.checkIn_time}</b></td>
                    <td>  Check Out Date/Time :
                    <b>${CheckOUT}/${data.checkOut_time} </b></td>
                    </tr>
                    <tr>
                    <td>Total No. Of Room:<b> 
                    ${data.room_booked_count}</b></td>
                    <td>Number Of Night:
                    <b>${data.no_of_days}</b></td>
                    </tr>
                   
                    <tr>
                    <td> Primary No :<b> 
                    ${data.primary_no}</b></td>
                    <td>Alternate Number :
                    <b>${data.phone_no}</b></td>
      
                    </tr>
                    <tr>
                    <td> Room Amenities :<b> 
                    ${amenities}</b></td>
                    <td  v-if="
                    ${data.gstin_no} != ''"> 
                    Customer GSTIN/State :   <b>${data.gstin_no} </b></td>
                    
                    </tr>
                   
                    </table>
                  </div>
              </div>

              
              <div style="background-color:f3f3f3;padding:5px;margin:auto;width:750px;border-radius:10px;margin-bottom:15px;color:black;">
              <div style="font-size:15px;font-family:verdana;"><b>Accommodation Booking Guests Details</b></div>
              <div class="row col-12"
              style="display:flex;width:100%;text-align:center;border-top: 1px solid silver;">
              <div class="col-2 text-left" style="text-align: center;border-bottom: 1px solid silver;border-right: 1px solid silver;border-left: 1px solid silver;
            width:20%;
            padding-top:5px;padding-bottom:5px;">
                <b>Sl no</b>
              </div>
              <div class="col-10 text-right" style="text-align: center;border-bottom: 1px solid silver;border-right: 1px solid silver;padding-left: 10px;
            width:80%;
            padding-top:5px;padding-bottom:5px;">
                <b>Guest Name</b>
              </div>
            </div>
            <div class="row col-12"
            style="display: flex; width: 100%; text-align: center;">
              <div  class="no-bullets" style="
              text-align: center;
              border-bottom: 1px solid silver;
              border-right: 1px solid silver;
              border-left: 1px solid silver;
              padding-top: 5px;
              width:20%;
              padding-bottom: 5px;line-height:180%
            " >
            ${separateListSNO}
              </div>
              <div class="no-bullets" style="
              text-align: center;
              border-bottom: 1px solid silver;border-right: 1px solid silver;
              padding-left: 10px;
              width:80%;
              padding-top: 5px;
              padding-bottom: 5px;line-height:180%
            ">${separateListGuest}
              </div>
              </div>
            </div>
              <div style="background-color:f3f3f3;padding:5px;margin:auto;width:750px;border-radius:10px;margin-bottom:15px;color:black;">
              <div style="font-size:15px;font-family:verdana;"><b>Accommodation Price Details</b></div>
              <div style="display-flex;width:600px;padding-top:15px;color:black;text-align:center" class="text-center justify-center">
              <div class="row col-12 q-mt-sm" style="border: 1px solid silver;width:500px;text-align:center" class="text-center justify-center">
              <div style="display:flex;width:100%">
                <div style="width:60%">
                  <div class="text-subtitle" style="
              font-size: 12px;
              text-align:left;
              margin-left:3px;
              padding-top:5px;
            ">
                    <b> Price Details</b>
                  </div>
                </div>
                <div style="font-size: 12px; text-align:right;
                margin-right:3px;padding-top:5px;width:40%">
                  <b> Amount (₹) </b>
                </div>
              </div>
              <div style="display:flex;width:100%; border-top:1px solid silver">
                <div style="width:60%">
                  <div class="text-subtitle" style="
              font-size: 12px;
              text-align:left;
             margin-left:3px;
              padding-top:5px;
            ">
                    Room Price
                  </div>
                </div>
                <div class="text-subtitle" style="
              font-size: 12px;
              text-align:right;
              margin-right:3px;
              padding-top:5px;width:40%
            ">
            ₹${data.room_price}
                </div>
              </div>

              <div style="display:flex;width:100%;">
              <div style="width:60%">
                <div class="text-subtitle" style="
            font-size: 12px;
           text-align:left;
           margin-left:3px;
            padding-top:5px;
          ">
          Partner Offer 
         
                  :
                </div>
              </div>

              <div class="text-subtitle" style="
            font-size: 12px;
            text-align:right;
            margin-right:3px;
            padding-top:5px;width:40%
          ">
                (-) ₹${data.partner_offer}
              </div>
            </div>

              <div style="display:flex;width:100%;">
              <div style="width:60%">
                <div class="text-subtitle" style="
            font-size: 12px;
            text-align:left;
            margin-left:3px;
            padding-top:5px;
          ">
        Base Price
         
                  :
                </div>
              </div>

              <div class="text-subtitle" style="
            font-size: 12px;
            text-align:right;
              margin-right:3px;
            padding-top:5px;width:40%
          ">
                (-) ₹${data.base_price}
              </div>
            </div>
              <div style="display:flex;width:100%;">
                <div style="width:60%">
                  <div class="text-subtitle" style="
              font-size: 12px;
              text-align:left;
              margin-left:3px;
              padding-top:5px;
            ">
            Early Bird Offer
                    :
                  </div>
                </div>
                <div class="text-subtitle" style="
              font-size: 12px;
              text-align:right;
              margin-right:3px;
              padding-top:5px;width:40%
            ">
                  (-) ₹${data.discount_price}
                </div>
              </div>
              <div style="display:flex;width:100%;">
                <div style="width:60%" v-if="
                ${data.usedOffer_name} !=
                  ''
                ">
                  <div class="text-subtitle" style="
              font-size: 12px;
              text-align:left;
              margin-left:3px;
              padding-top:5px
            ">
                    Applied MH Offer :
                    ${data.usedOffer_name}
                  </div>
                </div>

                <div class="text-subtitle"
                  style="font-size: 12px; text-align:right;
                  margin-right:3px;padding-top:5px;width:40%" v-if="
                  ${data.usedOffer_price} !=
                    ''
                  ">
                  (-) ₹${data.usedOffer_price}

                </div>
              </div>
              <div style="display:flex;width:100%;">
                <div style="width:60%">
                  <div class="text-subtitle" style="
              font-size: 12px;
              text-align:left;
              margin-left:3px;
              padding-top:5px;
            " v-if="
            ${data.usedOffer_price} !=
              ''
            "
            >
                    Price After Discount
                  </div>
                </div>
                <div class="text-subtitle"
                  style="font-size: 12px; text-align:right;
                  margin-right:3px;padding-top:5px;width:40%" v-if="
                  ${data.usedOffer_price} !=
                    ''
                  ">
                  ₹${data.price_after_discount}
                </div>
              </div>
              <div style="display:flex;width:100%;">
                 <div style="width:60%">
                  <div class="text-subtitle " style="
              font-size: 12px;
              text-align:left;
              margin-left:3px;
               padding-top:5px;
             ">
             Taxes 
                   </div>
                </div>
                <div class="text-subtitle"
                  style="font-size: 12px; text-align:right;
                 margin-right:3px;padding-top:5px;width:40%">
                 ₹${data.gst_amount}
                 </div>
               </div>

               <div style="display:flex;width:100%;">
               <div style="width:60%">
                <div class="text-subtitle text-bold " style="
            font-size: 14px;
            text-align:left;
            margin-left:3px;
             padding-top:5px;
           ">
           Convenience Fee
                 </div>
              </div>
              <div class="text-subtitle text-bold"
                style="font-size: 14px; text-align:right;
               margin-right:3px;padding-top:5px;width:40%">
               ₹${"0"}
               </div>
             </div>

              <div style="display:flex;width:100%;">
                <div style="width:60%">
                  <div class="text-subtitle" style="
              font-size: 15px;
              text-align:left;
              margin-left:3px;
              padding-top:5px;
            ">
                    Total Price
                  </div>
                </div>
                <div class="text-subtitle"
                  style="font-size: 12px; text-align:right;
                  margin-right:3px;padding-top:5px;width:40%">
                  <strong>
                  ₹${data.total_price}
                    /-
                  </strong>
                </div>
              </div>
               
            </div>
              </div>
        </div>

                  </div>
                </div>



                
                <div style="margin:10px 0px 0px 0px">
                  <div>Thank You.</div>
                  <div style="font-weight:700;">TEAM MANGOHOMZ</div>
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
                    <h5 style="margin:0px">Please contact with us : </h5> <a href="mailto:care@mangohomz.com" style="color:darkblue;font-weight:700;">care@mangohomz.com</a> & <a href="https://www.mangohomz.com " target="_blank" style="color:darkblue;font-weight:700;">www.mangohomz.ai </a>
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

            </div>
      `,
    };

    //Alternate email Sending Start

    var mailOptions3 = {
      from: "noreply@mangohomz.com",
      to: data.alternate_email_id,
      // bcc: 'forward@mangohomz.com',
      subject: `Booking Confirmed / ${data.property_name}/ ${confirmBookingId} `,
      html: `
      <div style="border:1px solid grey;>
        <div style="box-shadow:2px 2px 10px 2px grey;">
          <div style="display:flex;">
            <div style="display:flex; width:100%;">
              <a href="https://mangohomz.com" target="_blank"><img src="https://mangohomz.com/img/logo-main.6f335097.png" width="200px" height="50px" alt="mangohomz logo"></a>
            </div>
            <div style="font-weight:700;margin-top: 42px;margin-right: 6px;margin-left:300px">
              <p><a target="_blank" href="https://mangohomz.com" style="color:darkblue">www.mangohomz.ai</a></p>
            </div>
          </div>
          <div style="display:flex;">
            <div style="height: 5px;width: 70%;background-color:green;"></div>
            <div style="height: 5px;width: 30%;background-color:darkblue;"></div>
          </div>
          <div style="padding:10px">
            <div>
              Greetings, <span style="font-weight:700">  ${
                data.guestDataObj[0].first_name
              } ${data.guestDataObj[0].last_name} Ji</span>,
            </div>
            <div style="margin: 5px 0px">
            <p>We're glad you've placed your trust in MangoHomz and have chosen us as your preferred Medical trip partner. We are pleased to confirm that <b>${
              data.property_name
            }</b> Near <b>(${
        data.near_hospital_name
      }</b>)has been reserved under your name. While you're busy preparing for your trip, our teams are constantly working towards providing patient-friendly stay for you.</p>
            </div>
            <div style="border:2px solid grey; background-color:white">
              <div>
                <div style="margin:10px 0 20px 18px">
                  <div style="color:white">Thank you for booking with us.</div>
                  <div style="color:white">
                    <b>Your booking at ${data.property_name} is confirmed.</b>
                  </div>
                </div>


                <div style="background-color:f3f3f3;padding:5px;margin:auto;width:750px;border-radius:10px;margin-bottom:15px">
                  <ul>
                    <li style="color:black;">
                      Your booking at <b>${
                        data.property_name
                      } </b> from <b>${CheckIN}(${
        data.checkIn_time
      })<b> to <b>${CheckOUT}(${data.checkOut_time})</b> for <b> ${
        data.guestDataObj.length
      } <b> guests is confirmed. You have reserved ${
        data.room_booked_count
      } room(s)for <b> ${data.no_of_days}</b> nights.
                    </li>
                  
                    <li style="color:blue;font-weight:700">
                    MANGOHOMZ (MH) strict Accommodation cancellation policy allows MangoHomz Guests, to receive a full refund, Only if the cancellation of Accommodation booking happens 3 days before the check-in date. And any cancellation happens between 3 days and 24hrs before check-in the guest will be entitled to get only 60% refund And if the Cancellation happens within in 24hrs till check-in time then Guests will get 25% refund after all necessary tax deductions applicable. Once checked in there is no cancellation.             
                    </li>
                  </ul>
                </div>




                <div style="background-color:f3f3f3;padding:5px;margin:auto;width:750px;border-radius:10px;margin-bottom:15px;color:black;">
                <div style="font-size:15px;font-family:verdana;"><b>Accommodation Booking Details</b></div>



                <table style="width:100%">
                <style>
                table, th, td {
                border:1px solid black;
                }
                td {
                text-align:left;
                padding:2px;
                }
                </style>
                
                <tr>
                  <td> Booking ID :<b> 
                  ${confirmBookingId}</b></td>
                  <td>Booked Date : <b> ${moment(new Date()).format(
                    "DD-MM-YYYY"
                  )} </b></td>
                </tr>
                <tr>
                  <td>Customer Name :   <b> 
                  ${data.guestDataObj[0].addrssing_guest} 
                                ${data.guestDataObj[0].first_name}  ${
        data.guestDataObj[0].last_name
      }</b></td>
                  <td v-if="
                  ${data.gstin_no} != ''"> 
                  Customer City/State :<b> 
                 ${data.city}/${data.state}
                  </b></td>
                </tr>
                <tr>
                <td> Near Hospital Name :<b> 
                ${data.near_hospital_name} </b></td>
                <td>  Property Name : <b>${data.property_name}</b></td>
                </tr>
                <tr>
                <td> Property Type :<b> 
                ${data.property_type}</b></td>
                <td>  Property Address:
                <b>${data.address} </b></td>
                </tr>
                <tr>
                <td> Room Type :<b> 
                ${data.room_type}</b></td>
                <td> Room Category:
                <b>${data.room_category} </b></td>
                </tr>
                <tr>
                <td> Check In Date/Time :<b> 
                ${CheckIN}/${data.checkIn_time}</b></td>
                <td>  Check Out Date/Time :
                <b>${CheckOUT}/${data.checkOut_time} </b></td>
                </tr>
                <tr>
                <td>Total No. Of Room:<b> 
                ${data.room_booked_count}</b></td>
                <td>Number Of Night:
                <b>${data.no_of_days}</b></td>
                </tr>
               
                <tr>
                <td> Primary No :<b> 
                ${data.primary_no}</b></td>
                <td>Alternate Number :
                <b>${data.phone_no}</b></td>
  
                </tr>
                <tr>
                <td> Room Amenities :<b> 
                ${amenities}</b></td>
                <td  v-if="
                ${data.gstin_no} != ''"> 
                Customer GSTIN/State :   <b>${data.gstin_no} </b></td>
                
                </tr>
               
                </table>
              </div>
          </div>

          
          <div style="background-color:f3f3f3;padding:5px;margin:auto;width:750px;border-radius:10px;margin-bottom:15px;color:black;">
          <div style="font-size:15px;font-family:verdana;"><b>Accommodation Booking Guests Details</b></div>
          <div class="row col-12"
          style="display:flex;width:100%;text-align:center;border-top: 1px solid silver;">
          <div class="col-2 text-left" style="text-align: center;border-bottom: 1px solid silver;border-right: 1px solid silver;border-left: 1px solid silver;
        width:20%;
        padding-top:5px;padding-bottom:5px;">
            <b>Sl no</b>
          </div>
          <div class="col-10 text-right" style="text-align: center;border-bottom: 1px solid silver;border-right: 1px solid silver;padding-left: 10px;
        width:80%;
        padding-top:5px;padding-bottom:5px;">
            <b>Guest Name</b>
          </div>
        </div>
        <div class="row col-12"
        style="display: flex; width: 100%; text-align: center;">
          <div  class="no-bullets" style="
          text-align: center;
          border-bottom: 1px solid silver;
          border-right: 1px solid silver;
          border-left: 1px solid silver;
          padding-top: 5px;
          width:20%;
          padding-bottom: 5px;line-height:180%
        " >
        ${separateListSNO}
          </div>
          <div class="no-bullets" style="
          text-align: center;
          border-bottom: 1px solid silver;border-right: 1px solid silver;
          padding-left: 10px;
          width:80%;
          padding-top: 5px;
          padding-bottom: 5px;line-height:180%
        ">${separateListGuest}
          </div>

          </div>
        </div>






            
            <div style="margin:10px 0px 0px 0px">
              <div>Thank You.</div>
              <div style="font-weight:700;">TEAM MANGOHOMZ</div>
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
                <h5 style="margin:0px">Please contact with us : </h5> <a href="mailto:care@mangohomz.com" style="color:darkblue;font-weight:700;">care@mangohomz.com</a> & <a href="https://www.mangohomz.com " target="_blank" style="color:darkblue;font-weight:700;">www.mangohomz.ai </a>
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

        </div>
  `,
    };

    //Alternate Email Sending End

    // sendBookingConfirmedPartnerSms(data, guestName, confirmBookingId);

    var mailOptions1 = {
      from: "noreply@mangohomz.com",
      to: data.property_email,
      cc: data.property_alternate_email,
      //  bcc: 'forward@mangohomz.com',
      subject: `Booking Confirmed / ${data.property_name}/ ${confirmBookingId} `,
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
                <div style="height: 5px;width: 30%;background-color:darkblue;"></div>
              </div>
              <div style="padding:10px">
              <div>
              Dear, <span style="font-weight:700">${data.property_name}</span>,
            </div>
                <div>
                  Greetings!!
                </div>
                <div style="margin: 5px 0px">
                <p>Please be informed that  <span style="font-weight:700"><b> 
                ${data.guestDataObj[0].addrssing_guest} 
                              ${data.guestDataObj[0].first_name} ${
        data.guestDataObj[0].last_name
      }</b></span>,  has reserved  ${data.room_booked_count} room at the  <b>${
        data.property_name
      }</b>. Please find the guest's credentials below.</p>
                </div>
            
                <div style="background-color:f3f3f3;padding:5px;margin:auto;width:750px;border-radius:10px;margin-bottom:15px;color:black;">
                <div style="font-size:15px;font-family:verdana;"><b>Accommodation Booking Details</b></div>



                <table style="width:100%">
                <style>
                table, th, td {
                border:1px solid black;
                }
                td {
                text-align:left;
                padding:2px;
                }
                </style>
                
                <tr>
                  <td> Booking ID :<b> 
                  ${confirmBookingId}</b></td>
                  <td>Booked Date : <b> ${moment(new Date()).format(
                    "DD-MM-YYYY"
                  )} </b></td>
                </tr>
                <tr>
                  <td>Customer Name :   <b> 
                  ${data.guestDataObj[0].addrssing_guest} 
                                ${data.guestDataObj[0].first_name}  ${
        data.guestDataObj[0].last_name
      }</b></td>
                  <td v-if="
                  ${data.gstin_no} != ''"> 
                  Customer City/State :<b> 
                 ${data.city}/${data.state}
                  </b></td>
                </tr>
                <tr>
                <td> Near Hospital Name :<b> 
                ${data.near_hospital_name} </b></td>
                <td>  Property Name : <b>${data.property_name}</b></td>
                </tr>
                <tr>
                <td> Property Type :<b> 
                ${data.property_type}</b></td>
                <td>  Property Address:
                <b>${data.address} </b></td>
                </tr>
                <tr>
                <td> Room Type :<b> 
                ${data.room_type}</b></td>
                <td> Room Category:
                <b>${data.room_category} </b></td>
                </tr>
                <tr>
                <td> Check In Date/Time :<b> 
                ${CheckIN}/${data.checkIn_time}</b></td>
                <td>  Check Out Date/Time :
                <b>${CheckOUT}/${data.checkOut_time} </b></td>
                </tr>
                <tr>
                <td>Total No. Of Room:<b> 
                ${data.room_booked_count}</b></td>
                <td>Number Of Night:
                <b>${data.no_of_days}</b></td>
                </tr>
               
                <tr>
                <td> Primary No :<b> 
                ${data.primary_no}</b></td>
                <td>Alternate Number :
                <b>${data.phone_no}</b></td>
  
                </tr>
                <tr>
                <td> Room Amenities :<b> 
                ${amenities}</b></td>
                <td  v-if="
                ${data.gstin_no} != ''"> 
                Customer GSTIN/State :   <b>${data.gstin_no} </b></td>
                
                </tr>
               
                </table>
              </div>
          </div>


              
          
          <div style="background-color:f3f3f3;padding:5px;margin:auto;width:750px;border-radius:10px;margin-bottom:15px;color:black;">
          <div style="font-size:15px;font-family:verdana;"><b>Accommodation Booking Guests Details</b></div>
          <div class="row col-12"
          style="display:flex;width:100%;text-align:center;border-top: 1px solid silver;">
          <div class="col-2 text-left" style="text-align: center;border-bottom: 1px solid silver;border-right: 1px solid silver;border-left: 1px solid silver;
        width:20%;
        padding-top:5px;padding-bottom:5px;">
            <b>Sl no</b>
          </div>
          <div class="col-10 text-right" style="text-align: center;border-bottom: 1px solid silver;border-right: 1px solid silver;padding-left: 10px;
        width:80%;
        padding-top:5px;padding-bottom:5px;">
            <b>Guest Name</b>
          </div>
        </div>
        <div class="row col-12"
        style="display: flex; width: 100%; text-align: center;">
          <div  class="no-bullets" style="
          text-align: center;
          border-bottom: 1px solid silver;
          border-right: 1px solid silver;
          border-left: 1px solid silver;
          padding-top: 5px;
          width:20%;
          padding-bottom: 5px;line-height:180%
        " >
        ${separateListSNO}
          </div>
          <div class="no-bullets" style="
          text-align: center;
          border-bottom: 1px solid silver;border-right: 1px solid silver;
          padding-left: 10px;
          width:80%;
          padding-top: 5px;
          padding-bottom: 5px;line-height:180%
        ">${separateListGuest}
          </div>

          </div>
        </div>


    

    
              <div style="background-color:f3f3f3;padding:5px;margin:auto;width:750px;border-radius:10px;margin-bottom:15px;color:black;">
              <div style="font-size:15px;font-family:verdana;"><b>Accommodation Price Details</b></div>
              <div style="display-flex;width:600px;padding-top:15px;color:black;text-align:center" class="text-center justify-center">
              <div class="row col-12 q-mt-sm" style="border: 1px solid silver;width:500px;text-align:center" class="text-center justify-center">
              <div style="display:flex;width:100%">
                <div style="width:60%">
                  <div class="text-subtitle" style="
              font-size: 12px;
              text-align:left;
              margin-left:3px;
              padding-top:5px;
            ">
                    <b> Price Details</b>
                  </div>
                </div>
                <div style="font-size: 12px; text-align:right;
                margin-right:3px;padding-top:5px;width:40%">
                  <b> Amount (₹) </b>
                </div>
              </div>
              <div style="display:flex;width:100%; border-top:1px solid silver">
                <div style="width:60%">
                  <div class="text-subtitle" style="
              font-size: 12px;
              text-align:left;
             margin-left:3px;
              padding-top:5px;
            ">
                    Room Price
                  </div>
                </div>
                <div class="text-subtitle" style="
              font-size: 12px;
              text-align:right;
              margin-right:3px;
              padding-top:5px;width:40%
            ">
            ₹${data.room_price}
                </div>
              </div>

              <div style="display:flex;width:100%;">
              <div style="width:60%">
                <div class="text-subtitle" style="
            font-size: 12px;
           text-align:left;
           margin-left:3px;
            padding-top:5px;
          ">
          Partner Offer 
         
                  :
                </div>
              </div>

              <div class="text-subtitle" style="
            font-size: 12px;
            text-align:right;
            margin-right:3px;
            padding-top:5px;width:40%
          ">
                (-) ₹${data.partner_offer}
              </div>
            </div>

              <div style="display:flex;width:100%;">
              <div style="width:60%">
                <div class="text-subtitle" style="
            font-size: 12px;
            text-align:left;
            margin-left:3px;
            padding-top:5px;
          ">
        Base Price
         
                  :
                </div>
              </div>

              <div class="text-subtitle" style="
            font-size: 12px;
            text-align:right;
              margin-right:3px;
            padding-top:5px;width:40%
          ">
                (-) ₹${data.base_price}
              </div>
            </div>
    
              <div style="display:flex;width:100%;">
                <div style="width:60%">
                  <div class="text-subtitle" style="
              font-size: 12px;
              text-align:left;
              margin-left:3px;
              padding-top:5px;
            ">
            Early Bird Offer
            

                    :
                  </div>
                </div>

                <div class="text-subtitle" style="
              font-size: 12px;
              text-align:right;
              margin-right:3px;
              padding-top:5px;width:40%
            ">
                  (-) ₹${data.discount_price}
                </div>
              </div>
              <div style="display:flex;width:100%;">
                <div style="width:60%" v-if="
                ${data.usedOffer_name} !=
                  ''
                ">
                  <div class="text-subtitle" style="
              font-size: 12px;
              text-align:left;
              margin-left:3px;
              padding-top:5px
            ">
                    Applied MH Offer :
                    ${data.usedOffer_name}
                  </div>
                </div>

                <div class="text-subtitle"
                  style="font-size: 12px; text-align:right;
                  margin-right:3px;padding-top:5px;width:40%" v-if="
                  ${data.usedOffer_price} !=
                    ''
                  ">
                  (-) ₹${data.usedOffer_price}

                </div>
              </div>
              <div style="display:flex;width:100%;">
                <div style="width:60%">
                  <div class="text-subtitle" style="
              font-size: 12px;
              text-align:left;
              margin-left:3px;
              padding-top:5px;
            " v-if="
            ${data.usedOffer_price} !=
              ''
            "
            >
                    Price After Discount
                  </div>
                </div>
                <div class="text-subtitle"
                  style="font-size: 12px; text-align:right;
                  margin-right:3px;padding-top:5px;width:40%" v-if="
                  ${data.usedOffer_price} !=
                    ''
                  ">
                  ₹${data.price_after_discount}
                </div>
              </div>




              <div style="display:flex;width:100%;">
                 <div style="width:60%">
                  <div class="text-subtitle " style="
              font-size: 12px;
              text-align:left;
              margin-left:3px;
               padding-top:5px;
             ">
             Taxes 
                   </div>
                </div>
                <div class="text-subtitle"
                  style="font-size: 12px; text-align:right;
                 margin-right:3px;padding-top:5px;width:40%">
                 ₹${data.gst_amount}
                 </div>
               </div>

               <div style="display:flex;width:100%;">
               <div style="width:60%">
                <div class="text-subtitle text-bold " style="
            font-size: 14px;
            text-align:left;
            margin-left:3px;
             padding-top:5px;
           ">
           Convenience Fee
                 </div>
              </div>
              <div class="text-subtitle text-bold"
                style="font-size: 14px; text-align:right;
               margin-right:3px;padding-top:5px;width:40%">
               ₹${"0"}
               </div>
             </div>

              <div style="display:flex;width:100%;">
                <div style="width:60%">
                  <div class="text-subtitle" style="
              font-size: 15px;
              text-align:left;
              margin-left:3px;
              padding-top:5px;
            ">
                    Total Price
                  </div>
                </div>
                <div class="text-subtitle"
                  style="font-size: 12px; text-align:right;
                  margin-right:3px;padding-top:5px;width:40%">
                  <strong>
                  ₹${data.total_price}
                    /-
                  </strong>
                </div>
              </div>
               
            </div>
              </div>
        </div>

                  </div>
                </div>


                </div>
                <div style="margin:10px 0px 0px 0px">
                <ul style="list-style-type:number">
                <li><b> Accommodation Partner will receive Check-in day booking amount 24 hrs before the check-in, from MangoHomz towards accommodation charges.</b></li>
              
             
             
              <li>The <b> Accommodation Partner after booking confirmation</b>, is not permitted to cancel any of the bookings without 72 hours prior notice to the Mangohomz and seeking approval to do so in writing.</li>
              
            
            
              <li><b>	In case of cancellation before 3 days of check in there will be no payment to the Accommodation Partner .</b></li>
              
            
             
              <li><b> In case of cancellation by the Customer within 24 hours of check in,, the Accommodation partner will retain the check-in day booking amount .</b></li>

              
              <li><b> If the Booking will be more than 2 days the booking confirmation money that is check in-Day amount(1 day) will go to the partner 24 hrs before the Check-in date, rest pay out on the check-out date) These payouts happen excluding MangoHomz share and relevant Taxes.
              If the Booking will be less than two days then the complete payment would be paid on the check-out day</b></li>
              
              <li><b> In case of any cancellation after check-in the MangoHomz  will pay to the Accommodation  partner the consumed days by the user  plus one additional day room rent.</b></li>
             
              <li><b>	Rest of the terms & conditions as per the agreement between you & Mangohomz Technologies Pvt. Ltd.</b></li>
              </ul>
              </div>
              <div style="margin:10px 0px 0px 0px">
              <div>Please provide the visitor with your best services.
              </div>
            
            </div>
                <div style="margin:10px 0px 0px 0px">
                  <div>Thank You.</div>
                  <div style="font-weight:700;">TEAM MANGOHOMZ</div>
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
                    <h5 style="margin:0px">Please contact with us : </h5> <a href="mailto:care@mangohomz.com" style="color:darkblue;font-weight:700;">care@mangohomz.com</a> & <a href="https://www.mangohomz.com " target="_blank" style="color:darkblue;font-weight:700;">www.mangohomz.ai </a>
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
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Succ", info.response);
      }
    });
    transporter.sendMail(mailOptions1, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Succ", info.response);
      }
    });
    transporter.sendMail(mailOptions3, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Succ", info.response);
      }
    });
  }
  // console.log("v-fpr",data in guestDataObj);
  return { message };
}

async function saveBookingDataBeforePay(data, ip, req, res) {
  // console.log("logsdata", data);
  let addCode = "";
  let cityLength = data.property_city_id.length;
  if (cityLength == 1) {
    addCode = `00${data.property_city_id}`;
  } else if (cityLength == 2) {
    addCode = `0${data.property_city_id}`;
  } else {
    addCode = `${data.property_city_id}`;
  }
  let month = moment(new Date()).format("MM");
  let year = moment(new Date()).format("YY");
  //  let bookingID = await helper.generateMaxBookingId();
  // let booking_id = bookingID.toString().padStart("6", 0);
  // let confirmBookingId = `MHA${year}${addCode}${month}${booking_id}`;
  // let invoiceID = `MHAINV${year}${booking_id}${addCode}${month}`;
  // let refID = `MHARFN${year}${booking_id}${addCode}${month}`;
  let ip_address = ip;
  let amenity_arr = [];
  {
    amenity_arr.push(data.facilities);
  }
  let amenities = amenity_arr.toString();
  let result = await db.query(
    `INSERT IGNORE INTO mh_bookings_table_logs (account_id, rz_order_id, rz_payment_id, rz_signature_id, ip_address, partner_id, partner_sub_id, hotel_txn_id, room_txn_id, property_name, property_type, room_type,facilities, near_hospital_id, near_hospital_name, check_in, check_out, checkIn_time,checkOut_time,guest_count, no_of_days, room_price, discount,partner_offer,base_price,partner_offer_percentage, discount_price, price_after_discount, mh_offer_price, mh_offer_name, gst_percentage, gst_amount,cgst_percentage, cgst_amount,sgst_percentage, sgst_amount, total_price, country_name,phone_no,primary_no,alternate_email_id,address_line_1,address_line_2,state_id,state_name,city,property_city_id,property_city_name,property_state_id,property_state_name,email_id,alternate_no,pincode,gstin_no,property_email,property_phone,room_category,address,room_booked_count) VALUES 
    (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.account_id ?? "",
      //  booking_id ?? "",
      // confirmBookingId ?? "",
      // refID ?? "",
      //invoiceID ?? "",
      data.razorpay_order_id ?? "",
      data.razorpay_payment_id ?? "",
      data.razorpay_signature ?? "",
      ip_address ?? "",
      data.partner_id ?? "",
      data.partner_sub_id ?? "",
      data.property_txn_id ?? "",
      data.room_txn_id ?? "",
      data.property_name ?? "",
      data.property_type ?? "",
      data.room_type ?? "",
      amenities ?? "",
      data.near_hospital_id ?? "",
      data.near_hospital_name ?? "",
      data.check_in ?? "",
      data.check_out ?? "",
      data.checkIn_time ?? "",
      data.checkOut_time ?? "",
      "3",
      data.no_of_days ?? "",
      data.room_price ?? "",
      data.discount ?? "",
      data.partner_offer ?? "",
      data.base_price ?? "",

      data.partner_offer_percentage ?? "",

      data.discount_price ?? "",
      data.price_after_discount ?? "",
      data.usedOffer_price ?? "",
      data.usedOffer_name ?? "",
      data.gst_percentage ?? "",
      data.gst_amount ?? "",
      data.cgst_percentage ?? "",
      data.cgst_amount ?? "",
      data.sgst_percentage ?? "",
      data.sgst_amount ?? "",
      data.total_price ?? "",
      // data.selected_country.code ?? data.country_code,
      data.country ?? "",
      data.phone_no ?? "",
      data.primary_no ?? "",
      data.alternate_email_id ?? "",
      data.address_line1 ?? "",
      data.address_line2 ?? "",
      data.state_id ?? "",
      data.state ?? "",
      data.city ?? "",
      data.property_city_id ?? "",
      data.property_city_name ?? "",
      data.property_state_id ?? "",
      data.property_state_name ?? "",
      data.email_id ?? "",
      data.alternate_no ?? "",
      data.pincode ?? "",
      data.gstin_no ?? "",
      data.property_email ?? "",
      data.property_phone ?? "",
      data.room_category ?? "",
      data.address ?? "",
      data.room_booked_count ?? "",
    ]
  );
  for (let i = 0; i < data.guestDataObj.length; i++) {
    var guestName =
      data.guestDataObj[i].first_name + " " + data.guestDataObj[i].last_name;
    var result2 = await db.query(
      `INSERT IGNORE INTO mh_booking_txn_table_logs (guest_type, guest_name,first_name,last_name, guest_gender) VALUES (?,?,?,?,?)`,
      [
        // confirmBookingId ?? "",
        // invoiceID ?? "",
        // refID ?? "",
        data.guestDataObj[i].guest_type ?? "",
        guestName ?? "",
        data.guestDataObj[i].first_name ?? "",
        data.guestDataObj[i].last_name ?? "",
        data.guestDataObj[i].addrssing_guest ?? "",
      ]
    );
  }

  let message = "Error while submitting Booking Data";

  if (result.affectedRows && result2.affectedRows) {
    message = "Booking Completed Successfully";
    let CheckIN = moment(data.check_in).format("DD MMM YYYY");
    let CheckOUT = moment(data.check_out).format("DD MMM YYYY");
    const myArray = data.guestDataObj;
    // myArray.forEach((element, index, array) => {
    //   console.log("element.x", element.sno);
    //   console.log("element.guesy", element.guest_name);
    //   console.log("element.guesy", element.addrssing_guest);
    //   console.log("index", index);
    //   console.log("array", array);
    // });

    var newArraySNO = myArray.map((element) => element.sno);

    var nameListSNO = newArraySNO.splice(0, data.guestDataObj.length);

    var separateListSNO =
      '<ul class="no-bullets" style="list-style-type: none;margin: 0;padding: 0;">';
    nameListSNO.forEach(function (value) {
      separateListSNO += "<li>" + value + "</li>";
    });
    separateListSNO += "</ul>";
    // GUEST NAME
    var totalGuestName = myArray.map(
      (element) => element.addrssing_guest + element.guest_name
    );

    var listGuestName = totalGuestName.splice(0, data.guestDataObj.length);

    var separateListGuest =
      '<ul class="no-bullets" style="list-style-type: none;margin: 0;padding: 0;">';
    listGuestName.forEach(function (value) {
      separateListGuest += "<li>" + value + "</li>";
    });
    separateListGuest += "</ul>";
    // console.log("data.email_id", data.email_id);
    // console.log("data.email_id", data.property_email);
  }
  // console.log("v-fpr",data in guestDataObj);
  return { message };
}

async function getBookingGuestData(account_id) {
  const rows = await db.query(
    `SELECT s_no,account_id, booking_id, booking_order_id,reference_id,invoice_number,partner_id, partner_sub_id, hotel_txn_id, room_txn_id, property_name, property_type, room_type, near_hospital_id, near_hospital_name, check_in, check_out, guest_count, no_of_days, room_price, discount,partner_offer_percentage,partner_offer,base_price, discount_price, price_after_discount, mh_offer_price, mh_offer_name, gst_percentage, gst_amount,cgst_percentage, cgst_amount,sgst_percentage, sgst_amount, total_price, country_code, country_name,phone_no,primary_no,alternate_email_id,address_line_1,address_line_2,state_id,state_name,city,property_city_id,property_city_name,email_id,alternate_no,pincode,gstin_no,booking_status,room_category,address,room_booked_count FROM mh_bookings_table WHERE account_id = '${account_id}' ORDER BY inserted_date_time DESC`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  let hotel_image = "";
  let room_image1 = "";
  let room_image2 = "";
  let room_image3 = "";
  let guestData = "";
  let partner_name = "";
  let sub_partner_name = "";

  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      partner_name = await helper.getPartnerName(element.partner_id);
      sub_partner_name = await helper.getSubPartnerName(
        element.partner_id,
        element.partner_sub_id
      );
      guestData = await helper.getGuestDetailsDataFromDb(
        element.booking_order_id
      );
      hotel_image = await helper.getHotelImageBasedonPartner(
        element.partner_id,
        element.partner_sub_id,
        element.hotel_txn_id
      );
      room_image1 = await helper.getRoomImage1(
        element.partner_id,
        element.partner_sub_id,
        element.hotel_txn_id,
        element.room_txn_id
      );
      room_image2 = await helper.getRoomImage2(
        element.partner_id,
        element.partner_sub_id,
        element.hotel_txn_id,
        element.room_txn_id
      );
      room_image3 = await helper.getRoomImage3(
        element.partner_id,
        element.partner_sub_id,
        element.hotel_txn_id,
        element.room_txn_id
      );
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
        ...element,
      });
    }
  }
  return { data };
}
async function getBookingFoodData(account_id) {
  const rows = await db.query(
    `SELECT account_id,booking_id,booking_order_id, food_booking_id, food_booking_orderid, invoice_number, booking_city, booking_city_id, hotel_property_name, near_hospital_name, check_in, check_out, guest_count, no_of_days, foodPartner_name, food_partner_id, foodPartner_sub_name, food_partner_sub_id, 	date_format(food_booking_date,"%d-%m-%Y") as food_booking_date, food_booking_type, total_qty_booked,total_item_qty, food_charges, discount, discount_price, base_price, mh_offer_price, mh_offer_coupon, price_after_discount, gst_percentage, gst_on_base_price, final_price_amount, country_name, country_code, mobile_number, gstin_no,foodPartner_name, food_partner_id, foodPartner_sub_name, food_partner_sub_id,whatsapp_number,email_id,food_reference_id,cgst_percentage,cgst_amount,sgst_percentage,sgst_amount, date_format(updated_time,"%d-%m-%Y") as updated_time,food_booking_time,food_reference_id FROM mh_food_booking_table WHERE account_id = '${account_id}' ORDER BY updated_time DESC`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  let foodBkngData = "";

  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      foodBkngData = await helper.getFoodBkngItems(
        element.food_booking_orderid
      );
      index = index + 1;
      data.push({
        s_no: index,
        foodBkngData: foodBkngData,
        ...element,
      });
    }
  }
  return { data };
}
async function guestTravelBookingData(account_id) {
  const rows = await db.query(
    `SELECT sno,account_id, booking_id, booking_order_id, travel_booking_id, travel_booking_orderid, invoice_number, property_city_name, property_city_id, near_hospital_name, check_in, check_out, guest_count, no_of_days,date_format(booked_date,"%d-%m-%Y") as booked_date, booking_origin, booking_destination,destination_name, booking_time, travel_charges, discount, discount_price, base_price, mh_offer_price, mh_offer_coupon, price_after_discount, gst_percentage, gst_on_base_price, payable_amount, country_code, country_name, mobile_number, gst_number, date_format(updated_datetime,'%d-%m-%y') as update_time, agent_id, travel_name, transport_sub_id, transport_sub_name, hotel_property_name,travel_reference_id,cgst_percentage,cgst_amount,sgst_percentage,sgst_amount,whatsapp_number,email_id,booking_status FROM mh_travel_booking_table WHERE booking_status='Booked' AND  account_id = '${account_id}' ORDER BY updated_datetime DESC`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  let travelBkngData = "";

  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      travelBkngData = await helper.getTravelBkngItems(
        element.travel_booking_orderid
      );
      index = index + 1;
      data.push({
        s_no: index,
        travelBkngData: travelBkngData,
        ...element,
      });
    }
  }
  return { data };
}
async function getBookingMedicalData(account_id) {
  const rows = await db.query(
    `SELECT sno,account_id,booking_id,booking_order_id,account_id,medical_booking_id,medical_booking_orderid,invoice_number,booking_city,booking_city_id,hotel_property_name,near_hospital_name, check_in,check_out,guest_count,no_of_days,	date_format(eqp_booking_date,"%d-%m-%Y") as eqp_booking_date,eqp_booking_type,total_qty_booked,total_item_qty,equipment_name,equipment_id,equipment_sub_name,equipment_sub_id,medical_charges,discount,discount_price,base_price,mh_offer_price,mh_offer_coupon,price_after_discount,gst_percentage,gst_on_base_price,final_price_amount,country_name,country_code,mobile_number,gstin_no,whatsapp_number,email_id,medical_reference_id,cgst_percentage,cgst_amount,sgst_percentage,sgst_amount,days_booked_for FROM mh_equipment_booking_table WHERE account_id = '${account_id}' ORDER BY updated_time DESC`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  let medicalBkngData = "";

  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      medicalBkngData = await helper.getMedicalBkngItems(
        element.medical_booking_orderid
      );
      index = index + 1;
      data.push({
        s_no: index,
        medicalBkngData: medicalBkngData,
        ...element,
      });
    }
  }
  return { data };
}
async function customerEquipmentBkngDetails(medical_booking_orderid) {
  const rows = await db.query(
    `SELECT sno,account_id,booking_id,booking_order_id,account_id,medical_booking_id,medical_booking_orderid,invoice_number,booking_city,booking_city_id,hotel_property_name,near_hospital_name, check_in,check_out,guest_count,no_of_days,	date_format(eqp_booking_date,"%d-%m-%Y") as eqp_booking_date,eqp_booking_type,total_qty_booked,total_item_qty,equipment_name,equipment_id,equipment_sub_name,equipment_sub_id,medical_charges,discount,discount_price,base_price,mh_offer_price,mh_offer_coupon,price_after_discount,gst_percentage,gst_on_base_price,cgst_percentage	,cgst_amount,sgst_percentage,sgst_amount,final_price_amount,country_name,country_code,mobile_number,whatsapp_number,email_id,gstin_no,days_booked_for FROM mh_equipment_booking_table WHERE medical_booking_orderid ='${medical_booking_orderid}' ORDER BY updated_time DESC`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  let medicalBkngData = "";

  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      medicalBkngData = await helper.getMedicalBkngItems(
        element.medical_booking_orderid
      );
      index = index + 1;
      data.push({
        s_no: index,
        medicalBkngData: medicalBkngData,
        ...element,
      });
    }
  }
  return { data };
}
async function customerBkngDetails(medical_booking_orderid) {
  const rows = await db.query(
    `SELECT sno,account_id,booking_id,booking_order_id,account_id,medical_booking_id,medical_booking_orderid,invoice_number,booking_city,booking_city_id,hotel_property_name,near_hospital_name, check_in,check_out,guest_count,no_of_days,	date_format(eqp_booking_date,"%d-%m-%Y") as eqp_booking_date,eqp_booking_type,total_qty_booked,total_item_qty,equipment_name,equipment_id,equipment_sub_name,equipment_sub_id,medical_charges,discount,discount_price,base_price,mh_offer_price,mh_offer_coupon,price_after_discount,gst_percentage,gst_on_base_price,cgst_percentage	,cgst_amount,sgst_percentage,sgst_amount,final_price_amount,country_name,country_code,mobile_number,whatsapp_number,email_id,gstin_no,days_booked_for FROM mh_equipment_booking_table WHERE medical_booking_orderid ='${medical_booking_orderid}' `
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  let medicalData = "";

  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      index = index + 1;
      medicalData = await helper.getMedicalItems(
        element.medical_booking_orderid
      );
      data.push({
        s_no: index,
        medicalData: medicalData,
        ...element,
      });
    }
  }
  return { data };
}

async function createEquipment(data) {
  var result = "";
  let date = moment(new Date()).format("DDMMYYYY");
  let booking_id = await helper.generateMaxBookingId();
  let confirmBookingId = `MH${date}${booking_id}`;

  result = await db.query(
    `INSERT IGNORE INTO mh_equipment_booking_table (booking_order_id,check_in, check_out, near_hospital_name,near_hospital_id,phone_no,country_name,country_code) VALUES 
      (?,?,?,?,?,?,?,?)`,
    [
      booking_id ?? "",
      confirmBookingId ?? "",

      data.booking_order_id ?? "",
      data.check_in ?? "",
      data.check_out ?? "",
      data.near_hospital_name ?? "",
      data.near_hospital_id ?? "",
      data.phone_no ?? "",
      data.country_name ?? "",
      data.country_code ?? "",
    ]
  );

  let message = "Error while submitting Booking Data";

  return { message };
}

async function guestBookingDataTableForCity(city) {
  const rows = await db.query(
    `SELECT s_no,account_id, booking_id, booking_order_id,reference_id,invoice_number,partner_id, partner_sub_id, hotel_txn_id, room_txn_id, property_name, property_type, room_type, near_hospital_id, near_hospital_name, check_in, check_out, guest_count, no_of_days, room_price, discount,partner_offer_percentage,partner_offer,base_price, discount_price, price_after_discount, mh_offer_price, mh_offer_name, gst_percentage, gst_amount,cgst_percentage, cgst_amount,sgst_percentage, sgst_amount, total_price, country_code, country_name,phone_no,primary_no,alternate_email_id,address_line_1,address_line_2,state_id,state_name,city,property_city_id,property_city_name,email_id,alternate_no,pincode,gstin_no,booking_status,room_category,address,room_booked_count FROM mh_bookings_table WHERE property_city_name = '${city}'  ORDER BY inserted_date_time DESC`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  let hotel_image = "";
  let room_image1 = "";
  let room_image2 = "";
  let room_image3 = "";
  let guestData = "";
  let partner_name = "";
  let sub_partner_name = "";
  let food_details = "";
  let travel_details = "";
  let medical_details = "";
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      partner_name = await helper.getPartnerName(element.partner_id);
      food_details = await helper.getFoodDetailsData(element.booking_order_id);
      medical_details = await helper.getMedicalDetailsData(
        element.booking_order_id
      );
      travel_details = await helper.getTravelDetailsData(
        element.booking_order_id
      );
      sub_partner_name = await helper.getSubPartnerName(
        element.partner_id,
        element.partner_sub_id
      );
      guestData = await helper.getGuestDetailsDataFromDb(
        element.booking_order_id
      );
      hotel_image = await helper.getHotelImageBasedonPartner(
        element.partner_id,
        element.partner_sub_id,
        element.hotel_txn_id
      );
      room_image1 = await helper.getRoomImage1(
        element.partner_id,
        element.partner_sub_id,
        element.hotel_txn_id,
        element.room_txn_id
      );
      room_image2 = await helper.getRoomImage2(
        element.partner_id,
        element.partner_sub_id,
        element.hotel_txn_id,
        element.room_txn_id
      );
      room_image3 = await helper.getRoomImage3(
        element.partner_id,
        element.partner_sub_id,
        element.hotel_txn_id,
        element.room_txn_id
      );
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
        ...element,
      });
    }
  }
  return { data };
}
async function bookingMedicalManzohomzOffer(param) {
  let date = moment(new Date()).format("YYYY-MM-DD");

  const rows = await db.query(
    `SELECT sno, offer_priority, date_format(offer_start_date,"%d-%m-%Y") as offer_start_date, date_format(offer_end_date,"%d-%m-%Y") as offer_end_date, offer_price, offer_type, offer_from_whom, offer_description, offer_name,offer_money_start,offer_money_end ,inserted_datetime FROM mh_offers_table WHERE offer_from_whom = '${param}' AND offer_start_date <= '${date}' AND offer_end_date >= '${date}'`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  var index = 0;
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
  return { data };
}

async function guestBookingDataTableForStaff(city) {
  const rows = await db.query(
    `SELECT s_no,account_id, booking_id, booking_order_id,reference_id,invoice_number,partner_id, partner_sub_id, hotel_txn_id, room_txn_id, property_name, property_type, room_type, near_hospital_id, near_hospital_name, check_in, check_out, guest_count, no_of_days, room_price, discount,partner_offer_percentage,partner_offer, base_price,discount_price, price_after_discount, mh_offer_price, mh_offer_name, gst_percentage, gst_amount,cgst_percentage, cgst_amount,sgst_percentage, sgst_amount, total_price, country_code, country_name,phone_no,primary_no,alternate_email_id,address_line_1,address_line_2,state_id,state_name,city,property_city_id,property_city_name,email_id,alternate_no,pincode,gstin_no,booking_status,room_category,address,room_booked_count FROM mh_bookings_table WHERE property_city_name = '${city}' ORDER BY inserted_date_time DESC`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  let hotel_image = "";
  let room_image1 = "";
  let room_image2 = "";
  let room_image3 = "";
  let guestData = "";
  let partner_name = "";
  let sub_partner_name = "";
  let food_details = "";
  let travel_details = "";
  let medical_details = "";
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      partner_name = await helper.getPartnerName(element.partner_id);
      food_details = await helper.getFoodDetailsData(element.booking_order_id);
      medical_details = await helper.getMedicalDetailsData(
        element.booking_order_id
      );
      travel_details = await helper.getTravelDetailsData(
        element.booking_order_id
      );
      sub_partner_name = await helper.getSubPartnerName(
        element.partner_id,
        element.partner_sub_id
      );
      guestData = await helper.getGuestDetailsDataFromDb(
        element.booking_order_id
      );
      hotel_image = await helper.getHotelImageBasedonPartner(
        element.partner_id,
        element.partner_sub_id,
        element.hotel_txn_id
      );
      room_image1 = await helper.getRoomImage1(
        element.partner_id,
        element.partner_sub_id,
        element.hotel_txn_id,
        element.room_txn_id
      );
      room_image2 = await helper.getRoomImage2(
        element.partner_id,
        element.partner_sub_id,
        element.hotel_txn_id,
        element.room_txn_id
      );
      room_image3 = await helper.getRoomImage3(
        element.partner_id,
        element.partner_sub_id,
        element.hotel_txn_id,
        element.room_txn_id
      );
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
        ...element,
      });
    }
  }

  return { data };
}

async function guestBookingDataTableForAdmin() {
  const rows = await db.query(
    `SELECT s_no,account_id, booking_id, booking_order_id,reference_id,invoice_number,partner_id, partner_sub_id, hotel_txn_id, room_txn_id, property_name, property_type, room_type, near_hospital_id, near_hospital_name, DATE_FORMAT(check_in,'%d/%m/%Y') as check_in, DATE_FORMAT(check_out,'%d/%m/%Y') as check_out, guest_count, no_of_days, room_price, discount,partner_offer_percentage,partner_offer,base_price, discount_price, price_after_discount, mh_offer_price, mh_offer_name, gst_percentage, gst_amount,cgst_percentage, cgst_amount,sgst_percentage, sgst_amount, total_price, country_code, country_name,phone_no,primary_no,alternate_email_id,address_line_1,address_line_2,state_id,state_name,city,property_city_id,property_city_name,email_id,alternate_no,pincode,gstin_no,booking_status,room_category,address,room_booked_count,property_phone,property_email,DATE_FORMAT(inserted_date_time,'%d/%m/%Y') as booked_date FROM mh_bookings_table WHERE total_price > 500 AND inserted_date_time >= '2023-02-15' ORDER BY inserted_date_time,city DESC`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  // let hotel_image = "";
  // let room_image1 = "";
  // let room_image2 = "";
  // let room_image3 = "";
  let guestData = "";
  let partner_name = "";
  let sub_partner_name = "";
  let food_details = "";
  let travel_details = "";
  let medical_details = "";
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      partner_name = await helper.getPartnerName(element.partner_id);
      food_details = await helper.getFoodDetailsData(element.booking_order_id);
      medical_details = await helper.getMedicalDetailsData(
        element.booking_order_id
      );
      travel_details = await helper.getTravelDetailsData(
        element.booking_order_id
      );
      sub_partner_name = await helper.getSubPartnerName(
        element.partner_id,
        element.partner_sub_id
      );
      guestData = await helper.getGuestDetailsDataFromDb(
        element.booking_order_id
      );
      // hotel_image = await helper.getHotelImageBasedonPartner(
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
        ...element,
      });
    }
  }
  return { data };
}

async function getCustomerMhBookingsData(booking_order_id) {
  const rows = await db.query(
    `SELECT s_no,account_id, booking_id, booking_order_id,reference_id,invoice_number,partner_id, partner_sub_id, hotel_txn_id, room_txn_id, property_name, property_type, room_type, near_hospital_id, near_hospital_name, check_in, check_out, guest_count, no_of_days, room_price, discount,partner_offer_percentage,partner_offer,base_price, discount_price, price_after_discount, mh_offer_price, mh_offer_name, gst_percentage, gst_amount,cgst_percentage, cgst_amount,sgst_percentage, sgst_amount, total_price, country_code, country_name,phone_no,primary_no,alternate_email_id,address_line_1,address_line_2,state_id,state_name,city,property_city_id,property_city_name,email_id,alternate_no,pincode,gstin_no,booking_status,room_category,address,room_booked_count FROM mh_bookings_table WHERE booking_order_id='${booking_order_id}' ORDER BY inserted_date_time DESC`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  let guestDetails = "";
  let partner_name = "";
  let sub_partner_name = "";
  let property_address = "";
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      partner_name = await helper.getPartnerName(element.partner_id);
      sub_partner_name = await helper.getSubPartnerName(
        element.partner_id,
        element.partner_sub_id
      );
      property_address = await helper.getHotelAddress(
        element.partner_id,
        element.partner_sub_id,
        element.hotel_txn_id
      );
      guestDetails = await helper.getGuestDetailsData(element.booking_order_id);
      index = index + 1;
      // console.log("property_address", property_address);
      data.push({
        sno: index,
        partner_name: partner_name,
        sub_partner_name: sub_partner_name,
        property_address: property_address,
        guestDetails: guestDetails,
        ...element,
      });
    }
  }
  return data;
}
async function getCustomerFoodBookingDetails(food_booking_orderid) {
  const rows = await db.query(
    `SELECT s_no,account_id,booking_id,	booking_order_id,food_booking_id,food_booking_orderid,invoice_number,booking_city,booking_city_id,hotel_property_name,near_hospital_name, check_in,check_out,guest_count,no_of_days,	date_format(food_booking_date,"%d-%m-%Y") as food_booking_date,food_booking_type,total_qty_booked,total_item_qty,food_charges,discount,discount_price,base_price,mh_offer_price,mh_offer_coupon,price_after_discount,gst_percentage,gst_on_base_price,final_price_amount,country_name,country_code,mobile_number,gstin_no,foodPartner_name, food_partner_id, foodPartner_sub_name, food_partner_sub_id,whatsapp_number,email_id,food_reference_id,cgst_percentage,cgst_amount,sgst_percentage,sgst_amount,food_booking_time, FROM mh_food_booking_table WHERE food_booking_orderid='${food_booking_orderid}' ORDER BY updated_time DESC`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  let foodBkngData = "";

  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      foodBkngData = await helper.getFoodBkngItems(
        element.food_booking_orderid
      );
      index = index + 1;
      data.push({
        s_no: index,
        foodBkngData: foodBkngData,
        ...element,
      });
    }
  }

  return data;
}
async function getCustomerAccomodationBookingDetails(booking_order_id) {
  const rows = await db.query(
    `SELECT s_no,account_id, booking_id, booking_order_id,reference_id,invoice_number,partner_id, partner_sub_id, hotel_txn_id, room_txn_id, property_name, property_type, room_type, near_hospital_id, near_hospital_name, check_in, check_out, guest_count, no_of_days, room_price, discount,partner_offer_percentage,partner_offer,base_price, discount_price, price_after_discount, mh_offer_price, mh_offer_name, gst_percentage, gst_amount,cgst_percentage, cgst_amount,sgst_percentage, sgst_amount, total_price, country_code, country_name,phone_no,primary_no,alternate_email_id,address_line_1,address_line_2,state_id,state_name,city,property_city_id,property_city_name,property_state_id,property_state_name,email_id,alternate_no,pincode,gstin_no,date_format(inserted_date_time,'%d/%m/%y') as inserted_date_time,room_category,address,room_booked_count FROM mh_bookings_table WHERE booking_order_id='${booking_order_id}' ORDER BY inserted_date_time DESC`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  let hotel_image = "";
  let room_image1 = "";
  let room_image2 = "";
  let room_image3 = "";
  let guestData = "";
  let partner_name = "";
  let sub_partner_name = "";
  let property_address = "";
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      partner_name = await helper.getPartnerName(element.partner_id);
      sub_partner_name = await helper.getSubPartnerName(
        element.partner_id,
        element.partner_sub_id
      );
      property_address = await helper.getHotelAddress(
        element.partner_id,
        element.partner_sub_id,
        element.hotel_txn_id
      );
      guestData = await helper.getGuestDetailsDataFromDb(
        element.booking_order_id
      );
      hotel_image = await helper.getHotelImageBasedonPartner(
        element.partner_id,
        element.partner_sub_id,
        element.hotel_txn_id
      );
      room_image1 = await helper.getRoomImage1(
        element.partner_id,
        element.partner_sub_id,
        element.hotel_txn_id,
        element.room_txn_id
      );
      room_image2 = await helper.getRoomImage2(
        element.partner_id,
        element.partner_sub_id,
        element.hotel_txn_id,
        element.room_txn_id
      );
      room_image3 = await helper.getRoomImage3(
        element.partner_id,
        element.partner_sub_id,
        element.hotel_txn_id,
        element.room_txn_id
      );
      index = index + 1;

      data.push({
        sno: index,
        partner_name: partner_name,
        sub_partner_name: sub_partner_name,
        property_address: property_address,
        hotel_image: hotel_image,
        room_image1: room_image1,
        room_image2: room_image2,
        room_image3: room_image3,
        guestData: guestData,
        ...element,
      });
    }
  }
  return data;
}
// async function getCustomerFoodBookingDetails(food_booking_orderid) {
//   const rows = await db.query(
//     `SELECT s_no,account_id,booking_id,	booking_order_id,account_id,food_booking_id,food_booking_orderid,invoice_number,booking_city,booking_city_id,hotel_property_name,near_hospital_name, check_in,check_out,guest_count,no_of_days,	date_format(food_booking_date,"%d-%m-%Y") as food_booking_date,food_booking_type,total_qty_booked,total_item_qty,food_charges,discount,discount_price,base_price,mh_offer_price,mh_offer_coupon,price_after_discount,gst_percentage,gst_on_base_price,final_price_amount,country_name,country_code,mobile_number,gstin_no,foodPartner_name, food_partner_id, foodPartner_sub_name, food_partner_sub_id,whatsapp_number,email_id,food_reference_id,cgst_percentage,cgst_amount,sgst_percentage,sgst_amount,food_reference_id FROM mh_food_booking_table WHERE food_booking_orderid='${food_booking_orderid}' ORDER BY updated_time DESC`
//   );
//   const result = helper.emptyOrRows(rows);
//   let data = [];
//   let index = 0;
//   let foodBkngData = "";

//   for (const key in result) {
//     if (Object.hasOwnProperty.call(result, key)) {
//       const element = result[key];

//       foodBkngData = await helper.getFoodBkngItems(
//         element.food_booking_orderid
//       );
//       index = index + 1;
//       data.push({
//         s_no: index,
//         foodBkngData: foodBkngData,
//         ...element,
//       });
//     }
//   }

//   return data;
// }
async function customerFoodBkngDetails(food_booking_orderid) {
  const rows = await db.query(
    `SELECT s_no,account_id,booking_id,	booking_order_id,account_id,food_booking_id,food_booking_orderid,invoice_number,booking_city,booking_city_id,hotel_property_name,near_hospital_name, check_in,check_out,guest_count,no_of_days,	date_format(food_booking_date,"%d-%m-%Y") as food_booking_date,food_booking_type,total_qty_booked,total_item_qty,food_charges,discount,discount_price,base_price,mh_offer_price,mh_offer_coupon,price_after_discount,gst_percentage,gst_on_base_price,final_price_amount,country_name,country_code,mobile_number,gstin_no,foodPartner_name, food_partner_id, foodPartner_sub_name, food_partner_sub_id,whatsapp_number,email_id,food_reference_id,cgst_percentage,cgst_amount,sgst_percentage,sgst_amount,food_booking_time,food_booking_time,food_reference_id,mobile_number FROM mh_food_booking_table WHERE food_booking_orderid='${food_booking_orderid}' ORDER BY updated_time DESC`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  let foodData = "";
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      foodData = await helper.getFoodItems(element.food_booking_orderid);
      index = index + 1;
      data.push({
        s_no: index,
        foodData: foodData,
        ...element,
      });
    }
  }
  return { data };
}

async function getCustomerTravelBookingDetails(travel_booking_orderid) {
  const rows = await db.query(
    `SELECT sno,booking_id,booking_order_id,travel_booking_id,travel_booking_orderid,invoice_number,property_city_name,property_city_id,near_hospital_name,check_in,check_out,guest_count,no_of_days,date_format(booked_date,"%d-%m-%Y") as booked_date,booking_origin,	booking_destination,destination_name,booking_time,travel_charges,discount,discount_price,base_price,mh_offer_price,mh_offer_coupon,price_after_discount,gst_percentage,gst_on_base_price,payable_amount,country_code,country_name,mobile_number,gst_number,account_id,agent_id,travel_name,transport_sub_id,transport_sub_name,hotel_property_name,whatsapp_number,email_id,cgst_percentage,cgst_amount,	sgst_percentage,sgst_amount,whatsapp_number,email_id FROM mh_travel_booking_table WHERE travel_booking_orderid = '${travel_booking_orderid}' ORDER BY updated_datetime DESC`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  let travelBkngData = "";

  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      index = index + 1;
      travelBkngData = await helper.getTravelBkngItems(
        element.travel_booking_orderid
      );
      data.push({
        s_no: index,
        travelBkngData: travelBkngData,
        ...element,
      });
    }
  }
  return { data };
}
async function getBookingData(booking_order_id) {
  // let date = moment(new Date()).format("YYYY-MM-DD");

  const rows = await db.query(
    `SELECT * FROM mh_bookings_table WHERE booking_order_id = '${booking_order_id}' GROUP BY  booking_order_id ORDER BY inserted_date_time DESC`
  );

  const result = helper.emptyOrRows(rows);
  let data = [];
  var index = 0;
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
  return { data };
}
async function bookingManzohomzOffer(params) {
  let date = moment(new Date()).format("YYYY-MM-DD");
  const rows = await db.query(
    `SELECT sno, offer_priority, date_format(offer_start_date,"%d-%m-%Y") as offer_start_date, date_format(offer_end_date,"%d-%m-%Y") as offer_end_date, offer_price, offer_type, offer_from_whom, offer_description, offer_name,offer_image,offer_money_start,offer_money_end FROM  mh_offers_table WHERE offer_from_whom='${params}' AND offer_start_date <= '${date}' AND offer_end_date >= '${date}' ORDER BY offer_price`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  var index = 0;
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
  console.log(data);
  return { data };
}

async function getBookingId(
  phoneNumber,
  razorpay_order_id,
  razorpay_signature,
  razorpay_payment_id
) {
  const rows = await db.query(
    `SELECT account_id, booking_id, booking_order_id,reference_id,invoice_number,partner_id, partner_sub_id, hotel_txn_id, room_txn_id, property_name, property_type, room_type, near_hospital_id, near_hospital_name, check_in, check_out, guest_count, no_of_days, room_price,partner_offer_percentage,partner_offer, base_price,discount, discount_price, price_after_discount, mh_offer_price, mh_offer_name, gst_percentage, gst_amount,cgst_percentage, cgst_amount,sgst_percentage, sgst_amount, total_price, country_code, country_name,phone_no,primary_no,alternate_email_id,address_line_1,address_line_2,state_id,state_name,city,property_city_id,property_city_name,property_state_id,property_state_name,email_id,alternate_no,pincode,gstin_no, DATE_FORMAT(inserted_date_time, '%Y-%m-%d %H:%i:%s') AS inserted_date_time1,checkIn_time,checkOut_time,facilities,room_category,address,room_booked_count FROM mh_bookings_table WHERE phone_no='${phoneNumber}' AND rz_order_id='${razorpay_order_id}' AND rz_signature_id='${razorpay_signature}' AND rz_payment_id='${razorpay_payment_id}' ORDER BY inserted_date_time desc limit 1`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  let GuestDetails = "";
  let Gststate = "";
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      GuestDetails = await helper.getbookingDetails(element.booking_order_id);
      Gststate = await helper.getgststate(element.gstin_no);
      index = index + 1;
      data.push({
        s_no: index,
        GuestDetails: GuestDetails,
        gststate: Gststate,
        ...element,
      });
    }
  }
  return data;
}

async function getFoodBookingId(mobile_number, restaurant_offer_price) {
  // console.log("services",mobile_number)
  const rows = await db.query(
    `SELECT s_no,account_id,booking_id,	booking_order_id,account_id,food_booking_id,food_booking_orderid,invoice_number,booking_city,booking_city_id,hotel_property_name,near_hospital_name, check_in,check_out,guest_count,no_of_days,food_booking_date,food_booking_type,total_qty_booked,total_item_qty,food_charges,discount,discount_price,base_price,mh_offer_price,mh_offer_coupon,partner_offer_price,price_after_discount,gst_percentage,gst_on_base_price,final_price_amount,country_name,country_code,mobile_number,gstin_no,foodPartner_name, food_partner_id, foodPartner_sub_name, food_partner_sub_id,whatsapp_number,email_id,food_reference_id,cgst_percentage,cgst_amount,sgst_percentage,sgst_amount,updated_time,food_booking_time,food_booking_time,food_reference_id,mobile_number  FROM mh_food_booking_table WHERE mobile_number='${mobile_number}' ORDER BY updated_time DESC`
  );
  const result = helper.emptyOrRows(rows);

  const guestNameQuery = await db.query(
    `SELECT guest_name FROM mh_booking_txn_table WHERE mh_booking_id='${result[0].booking_order_id}'`
  );

  let data = [];
  let index = 0;
  let foodData = "";
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      foodData = await helper.getFoodItems(element.food_booking_orderid);
      // console.log("foodData",foodData)
      index = index + 1;
      data.push({
        guest_name: guestNameQuery[0].guest_name,
        s_no: index,
        foodData: foodData,
        ...element,
      });
    }
  }
  // console.log("data",data)
  return { data };
}

async function getTravelBookingId(mobile_number) {
  const rows = await db.query(
    `SELECT sno,booking_id,booking_order_id,travel_booking_id,travel_booking_orderid,property_city_name,property_city_id,near_hospital_name,check_in,check_out,guest_count,no_of_days,booked_date,booking_origin,	booking_destination,destination_name,booking_time,travel_charges,discount,discount_price,base_price,mh_offer_price,mh_offer_coupon,price_after_discount,gst_percentage,gst_on_base_price,payable_amount,country_code,country_name,mobile_number,gst_number,account_id,agent_id,travel_name,transport_sub_id,transport_sub_name,hotel_property_name,travel_reference_id,cgst_percentage,cgst_amount,sgst_percentage,sgst_amount,whatsapp_number,email_id,invoice_number,updated_datetime FROM mh_travel_booking_table WHERE mobile_number='${mobile_number}' ORDER BY updated_datetime DESC`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  let GuestDetails = "";
  let Gststate = "";
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      GuestDetails = await helper.getbookingDetails(element.booking_order_id);
      Gststate = await helper.getgststate(element.gst_number);
      index = index + 1;
      data.push({
        s_no: index,
        GuestDetails: GuestDetails,
        gststate: Gststate,
        ...element,
      });
    }
  }
  return data;
}

async function getEquipmentBookingId(mobile_number) {
  const rows = await db.query(
    `SELECT sno,account_id,booking_id,booking_order_id,account_id,medical_booking_id,medical_booking_orderid,invoice_number,booking_city,booking_city_id,hotel_property_name,near_hospital_name, check_in,check_out,guest_count,no_of_days,eqp_booking_date,eqp_booking_type,total_qty_booked,total_item_qty,equipment_name,equipment_id,equipment_sub_name,equipment_sub_id,medical_charges,discount,discount_price,base_price,mh_offer_price,mh_offer_coupon,price_after_discount,gst_percentage,gst_on_base_price,final_price_amount,country_name,country_code,mobile_number,gstin_no,whatsapp_number,email_id,medical_reference_id,cgst_percentage,cgst_amount,sgst_percentage,sgst_amount,days_booked_for, date_format(updated_time,'%d/%m/%y') as updated_time FROM mh_equipment_booking_table WHERE mobile_number='${mobile_number}' ORDER BY updated_time DESC`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  let medicalBkngData = "";

  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      medicalBkngData = await helper.getMedicalBkngItems(
        element.medical_booking_orderid
      );
      index = index + 1;
      data.push({
        s_no: index,
        medicalBkngData: medicalBkngData,

        ...element,
      });
    }
  }
  return { data };
}

async function getBookingDetails(booking_order_id) {
  const rows = await db.query(
    `SELECT *, (SELECT COUNT(*) FROM mh_bookings_table WHERE booking_order_id='${booking_order_id}') AS guests_count FROM mh_bookings_table WHERE booking_order_id='${booking_order_id}' ORDER BY inserted_date_time DESC;`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  var index = 0;
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
  return { data };
}

async function mht_bookings(data) {
  let msg = {};
  const book = new Book();
  //need to handel the payment
  if (data.hotel) msg.hotel = book.hotel(data);
  if (data.food) msg.book = book.food(data);
  if (data.equipment) msg.equipment = book.equipment(data);
  if (data.travel) msg.travel = book.travel(data);
  return msg;
}
async function saveEquipmentBookingDetails(data) {
  let selected_items_arr = [];
  for (let i = 0; i < data.eqp_booking_type.length; i++) {
    selected_items_arr.push(data.eqp_booking_type[i].item_name);
  }
  let ItemsList = selected_items_arr.toString();
  let eqpBkngDate = data.eqp_booking_date.split("/").reverse().join("-");
  let addCode = "";
  let cityLength = data.booking_city_id.length;
  if (cityLength == 1) {
    addCode = `00${data.booking_city_id}`;
  } else if (cityLength == 2) {
    addCode = `0${data.booking_city_id}`;
  } else {
    addCode = `${data.booking_city_id}`;
  }
  let month = moment(new Date()).format("MM");
  let year = moment(new Date()).format("YY");
  // let date = moment(new Date()).format("DDMMYYYY");
  let medicalBkngID = await helper.generateMaxMedicalBookingId();
  let medical_booking_id = medicalBkngID.toString().padStart("6", 0);
  let confirmMedicalBookingId = `MHE${year}${medical_booking_id}${addCode}${month}`;
  let medicalInvoiceID = `MEI${year}${medical_booking_id}${addCode}${month}`;
  let medicalRefID = `MER${year}${medical_booking_id}${addCode}${month}`;
  let result = await db.query(
    `INSERT IGNORE INTO mh_equipment_booking_table (booking_id,booking_order_id,medical_booking_id,medical_booking_orderid,invoice_number,medical_reference_id,rz_order_id,rz_payment_id,rz_signature_id,booking_city,booking_city_id,hotel_property_name,near_hospital_name,check_in,check_out, guest_count,no_of_days,eqp_booking_date,eqp_booking_type,days_booked_for,total_qty_booked,total_item_qty,medical_charges,discount,discount_price,base_price,mh_offer_price,mh_offer_coupon,price_after_discount,gst_percentage,gst_on_base_price,cgst_percentage, cgst_amount,sgst_percentage, sgst_amount,final_price_amount,country_name,country_code,mobile_number,gstin_no,account_id, equipment_name, equipment_id, equipment_sub_name, equipment_sub_id,whatsapp_number,email_id) VALUES 
      (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.booking_id ?? "",
      data.booking_order_id ?? "",
      medical_booking_id ?? "",
      confirmMedicalBookingId ?? "",
      medicalInvoiceID ?? "",
      medicalRefID ?? "",
      data.razorpay_order_id !== null && data.razorpay_order_id !== undefined
        ? data.razorpay_order_id
        : "",
      data.razorpay_payment_id !== null &&
      data.razorpay_payment_id !== undefined
        ? data.razorpay_payment_id
        : "",
      data.razorpay_signature !== null && data.razorpay_signature !== undefined
        ? data.razorpay_signature
        : "",
      data.booking_city ?? "",
      data.booking_city_id ?? "",
      data.hotel_property_name ?? "",
      data.near_hospital_name ?? "",
      data.check_in ?? "",
      data.check_out ?? "",
      data.guest_count ?? "",
      data.no_of_days ?? "",
      eqpBkngDate ?? "",
      ItemsList ?? "",
      data.days_booked_for ?? "",
      data.total_qty_booked ?? "",
      data.total_item_qty ?? "",
      data.medical_charges ?? "",
      data.discount ?? "",
      data.discount_price ?? "",
      data.base_price ?? "",
      data.mh_offer_price ?? "",
      data.mh_offer_coupon ?? "",
      // data.selected_offer_price  ?? "",
      data.price_after_discount ?? "",
      data.gst_percentage ?? "",
      data.gst_on_base_price ?? "",
      data.cgst_percentage ?? "",
      data.cgst_amount ?? "",
      data.sgst_percentage ?? "",
      data.sgst_amount ?? "",
      data.payable_amount ?? "",
      data.country_name ?? "",
      data.country_code ?? "",
      data.mobile_number ?? "",
      data.gstin_no ?? "",
      data.selectedMedicalObj[0].account_id ?? "",
      data.selectedMedicalObj[0].agent_name ?? "",
      data.selectedMedicalObj[0].equipment_id ?? "",
      data.selectedMedicalObj[0].equipment_sub_name ?? "",
      data.selectedMedicalObj[0].equipment_sub_id ?? "",
      data.whatsapp_number ?? "",
      data.email_id ?? "",
    ]
  );
  for (let i = 0; i < data.selectedMedicalObj.length; i++) {
    var result2 = await db.query(
      `INSERT IGNORE INTO mh_equipment_booking_txn_table (mh_booking_id, mh_booking_order_id, medical_booking_id,medical_booking_orderid,invoice_number,medical_reference_id,account_id, equipment_name, equipment_id, equipment_sub_name, equipment_sub_id, txn_id,item_name,	location,medical_store,units,item_quantity,item_price) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        data.booking_id ?? "",
        data.booking_order_id ?? "",
        medical_booking_id ?? "",
        confirmMedicalBookingId ?? "",
        medicalInvoiceID ?? "",
        medicalRefID ?? "",
        data.selectedMedicalObj[i].account_id ?? "",
        data.selectedMedicalObj[i].agent_name ?? "",
        data.selectedMedicalObj[i].equipment_id ?? "",
        data.selectedMedicalObj[i].equipment_sub_name ?? "",
        data.selectedMedicalObj[i].equipment_sub_id ?? "",
        data.selectedMedicalObj[i].txn_id ?? "",
        data.selectedMedicalObj[i].item_name ?? "",
        data.selectedMedicalObj[i].location ?? "",
        data.selectedMedicalObj[i].medical_store ?? "",
        data.selectedMedicalObj[i].units ?? "",
        data.selectedMedicalObj[i].add_qty ?? "",
        data.selectedMedicalObj[i].price ?? "",
      ]
    );
  }
  let message = "Error while submitting Medical Equipment Booking Data";

  if (result.affectedRows && result2.affectedRows) {
    message = "Booking Medical Equipment Items Completed Successfully";
  }

  return { message };
}
async function submittravelDetails(data) {
  // console.log("travel", data);
  let guestData = await helper.getGuestDetailsDataFromDb(data.booking_order_id);
  // console.log(guestData);
  let travelBkngDate = data.booked_date.split("/").reverse().join("-");
  let addCode = "";
  let cityLength = data.property_city_id.length;
  if (cityLength == 1) {
    addCode = `00${data.property_city_id}`;
  } else if (cityLength == 2) {
    addCode = `0${data.property_city_id}`;
  } else {
    addCode = `${data.property_city_id}`;
  }
  let month = moment(new Date()).format("MM");
  let year = moment(new Date()).format("YY");
  // let date = moment(new Date()).format("DDMMYYYY");
  let travelBkngID = await helper.generateMaxTravelBookingId();
  let travel_booking_id = travelBkngID.toString().padStart("6", 0);
  let confirmTravelBookingId = `MHT${year}${travel_booking_id}${addCode}${month}`;
  let travelInvoiceID = `MTI${year}${travel_booking_id}${addCode}${month}`;
  let travelRefID = `MTR${year}${travel_booking_id}${addCode}${month}`;
  // var travelstatus = data.status == true ? 'yes' : 'no';
  let result = await db.query(
    `INSERT IGNORE INTO mh_travel_booking_table (booking_id, booking_order_id, travel_booking_id, travel_booking_orderid, invoice_number, travel_reference_id,rz_order_id,rz_payment_id,rz_signature_id, property_city_name, property_city_id, hotel_property_name, near_hospital_name, check_in, check_out, guest_count, no_of_days, booked_date, booking_origin, booking_destination, destination_name, booking_time, travel_charges, discount, discount_price, base_price, mh_offer_price, mh_offer_coupon, price_after_discount, gst_percentage, gst_on_base_price, cgst_percentage, cgst_amount, sgst_percentage, sgst_amount, payable_amount, country_code, country_name, mobile_number, gst_number, account_id, agent_id, travel_name, transport_sub_id, transport_sub_name, whatsapp_number, email_id,transport_partner_email,transport_partner_AlternateEmail,transport_partner_phone)
    VALUES (?,?,?,?, ? , ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      data.booking_id !== null && data.booking_id !== undefined
        ? data.booking_id
        : "",
      data.booking_order_id !== null && data.booking_order_id !== undefined
        ? data.booking_order_id
        : "",
      travel_booking_id !== null && travel_booking_id !== undefined
        ? travel_booking_id
        : "",
      confirmTravelBookingId !== null && confirmTravelBookingId !== undefined
        ? confirmTravelBookingId
        : "",
      travelInvoiceID !== null && travelInvoiceID !== undefined
        ? travelInvoiceID
        : "",
      travelRefID !== null && travelRefID !== undefined ? travelRefID : "",
      data.razorpay_order_id !== null && data.razorpay_order_id !== undefined
        ? data.razorpay_order_id
        : "",
      data.razorpay_payment_id !== null &&
      data.razorpay_payment_id !== undefined
        ? data.razorpay_payment_id
        : "",
      data.razorpay_signature !== null && data.razorpay_signature !== undefined
        ? data.razorpay_signature
        : "",
      data.property_city_name !== null && data.property_city_name !== undefined
        ? data.property_city_name
        : "",
      data.property_city_id !== null && data.property_city_id !== undefined
        ? data.property_city_id
        : "",
      data.hotel_property_name !== null &&
      data.hotel_property_name !== undefined
        ? data.hotel_property_name
        : "",
      data.near_hospital_name !== null && data.near_hospital_name !== undefined
        ? data.near_hospital_name
        : "",
      data.check_in !== null && data.check_in !== undefined
        ? data.check_in
        : "",
      data.check_out !== null && data.check_out !== undefined
        ? data.check_out
        : "",
      data.guest_count !== null && data.guest_count !== undefined
        ? data.guest_count
        : "",
      data.no_of_days !== null && data.no_of_days !== undefined
        ? data.no_of_days
        : "",
      travelBkngDate !== null && travelBkngDate !== undefined
        ? travelBkngDate
        : "",
      data.origin1 == "" ? data.origin : data.origin1,
      data.destination1 == "" ? data.destination : data.destination1,
      data.destination_name !== null && data.destination_name !== undefined
        ? data.destination_name
        : "",
      data.booking_time !== null && data.booking_time !== undefined
        ? data.booking_time
        : "",
      data.travel_charges !== null && data.travel_charges !== undefined
        ? data.travel_charges
        : "",
      data.discount !== null && data.discount !== undefined
        ? data.discount
        : "",
      data.discount_price !== null && data.discount_price !== undefined
        ? data.discount_price
        : "",
      data.base_price !== null && data.base_price !== undefined
        ? data.base_price
        : "",
      data.mh_offer_price !== null && data.mh_offer_price !== undefined
        ? data.mh_offer_price
        : "",
      data.mh_offer_coupon !== null && data.mh_offer_coupon !== undefined
        ? data.mh_offer_coupon
        : "",
      data.price_after_discount !== null &&
      data.price_after_discount !== undefined
        ? data.price_after_discount
        : "",
      data.gst_percentage !== null && data.gst_percentage !== undefined
        ? data.gst_percentage
        : "",
      data.gst_on_base_price !== null && data.gst_on_base_price !== undefined
        ? data.gst_on_base_price
        : "",
      data.cgst_percentage !== null && data.cgst_percentage !== undefined
        ? data.cgst_percentage
        : "",
      data.cgst_amount !== null && data.cgst_amount !== undefined
        ? data.cgst_amount
        : "",
      data.sgst_percentage !== null && data.sgst_percentage !== undefined
        ? data.sgst_percentage
        : "",
      data.sgst_amount !== null && data.sgst_amount !== undefined
        ? data.sgst_amount
        : "",
      data.payable_amount !== null && data.payable_amount !== undefined
        ? data.payable_amount
        : "",
      data.country_code !== null && data.country_code !== undefined
        ? data.country_code
        : "",
      data.country_name !== null && data.country_name !== undefined
        ? data.country_name
        : "",
      data.mobile_number !== null && data.mobile_number !== undefined
        ? data.mobile_number
        : "",
      data.gst_number !== null && data.gst_number !== undefined
        ? data.gst_number
        : "",
      data.account_id !== null && data.account_id !== undefined
        ? data.account_id
        : "",
      data.agent_id !== null && data.agent_id !== undefined
        ? data.agent_id
        : "",
      data.travel_name !== null && data.travel_name !== undefined
        ? data.travel_name
        : "",
      data.transport_sub_id !== null && data.transport_sub_id !== undefined
        ? data.transport_sub_id
        : "",
      data.transport_sub_name !== null && data.transport_sub_name !== undefined
        ? data.transport_sub_name
        : "",
      data.whatsapp_number !== null && data.whatsapp_number !== undefined
        ? data.whatsapp_number
        : "",
      data.email_id !== null && data.email_id !== undefined
        ? data.email_id
        : "",
      data.transport_partner_email !== null &&
      data.transport_partner_email !== undefined
        ? data.transport_partner_email
        : "",
      data.transport_partner_AlternateEmail !== null &&
      data.transport_partner_AlternateEmail !== undefined
        ? data.transport_partner_AlternateEmail
        : "",
      data.transport_partner_phone !== null &&
      data.transport_partner_phone !== undefined
        ? data.transport_partner_phone
        : "",
    ]
  );
  var result2 = await db.query(
    `INSERT IGNORE INTO mh_travel_booking_txn_table (booking_id, booking_order_id,travel_booking_id,travel_booking_orderid,invoice_number, travel_reference_id, account_id,agent_id,travel_name,transport_sub_id, transport_sub_name,txn_id, vehicle_name,no_of_seaters,price,units ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.booking_id !== null && data.booking_id !== undefined
        ? data.booking_id
        : "",
      data.booking_order_id !== null && data.booking_order_id !== undefined
        ? data.booking_order_id
        : "",
      travel_booking_id !== null && travel_booking_id !== undefined
        ? travel_booking_id
        : "",
      confirmTravelBookingId !== null && confirmTravelBookingId !== undefined
        ? confirmTravelBookingId
        : "",
      travelInvoiceID !== null && travelInvoiceID !== undefined
        ? travelInvoiceID
        : "",
      travelRefID !== null && travelRefID !== undefined ? travelRefID : "",
      data.account_id !== null && data.account_id !== undefined
        ? data.account_id
        : "",
      data.agent_id !== null && data.agent_id !== undefined
        ? data.agent_id
        : "",
      data.travel_name !== null && data.travel_name !== undefined
        ? data.travel_name
        : "",
      data.transport_sub_id !== null && data.transport_sub_id !== undefined
        ? data.transport_sub_id
        : "",
      data.transport_sub_name !== null && data.transport_sub_name !== undefined
        ? data.transport_sub_name
        : "",
      data.txn_id !== null && data.txn_id !== undefined ? data.txn_id : "",
      data.vehicle_name !== null && data.vehicle_name !== undefined
        ? data.vehicle_name
        : "",
      data.no_of_seaters !== null && data.no_of_seaters !== undefined
        ? data.no_of_seaters
        : "",
      data.price !== null && data.price !== undefined ? data.price : "",
      data.units !== null && data.units !== undefined ? data.units : "",
    ]
  );
  let message = "Error in Saving Travel Details";

  if (result.affectedRows && result2.affectedRows) {
    message = "Travel Details saved successfully";
    // sendTravelBookingConfirmedSms(data, confirmTravelBookingId, guestData[0].first_name);
    // sendTravelBookingConfirmedPartnerSms(data, confirmTravelBookingId, guestData[0].first_name);

    var mailOptions = {
      from: "noreply@mangohomz.com",
      to: data.email_id,
      // bcc: 'forward@mangohomz.com',
      subject: `Booking Confirmed / ${data.travel_name}/ ${confirmTravelBookingId} `,
      html: `
      <div class="row">
      <div class="q-pa-md">
        <div class="text-bold text-h5">
          Booking Confirmed -
          ${data.travel_name}
        </div>
        <div class="text-bold text-h5">
          Travel Booking No -
          ${confirmTravelBookingId}
        </div>
      </div>
      <div class="q-pa-md">
        <div class="text-bold">Dear Customer,</div>
        <p style="text-align: justify">
          We appreciate your confidence in MangoHomz and selecting us as
          your go-to travel companion for medical trips. We are pleased
          to confirm that Vehicle from
          <b>${data.travel_name} (from
            ${data.origin1} to
            ${data.destination_name})
          </b>
          has been booked under your name. Three hours prior to the
          scheduled pickup, you will receive the vehicle information and
          driver contact details. Our employees are working nonstop to
          make sure you have patient-friendly travel while you're busy
          packing for your trip.
        </p>
        <div>
          <div style="text-align: justify">
            Thank you.
          </div>

          <div style="text-align: justify">
            Team MangoHomz
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-center q-px-xl" style="font-family: verdana;
              box-sizing: border-box;background-color: white;padding-bottom: 50px;
            ">
      <div class="row col-12 justify-center q-px-sm" style="font-family: verdana;
              border-right: 2px solid lightgrey;
              box-sizing: border-box;
              border-left: 2px solid lightgrey;
              border-top: 2px solid lightgrey;
              border-bottom: 2px solid lightgrey;
              margin-top:5px;background-color: white
            ">
        <div class="row col-12  justify-center bg-secondary" style="font-family: verdana;
              border-right: 2px solid lightgrey;
              box-sizing: border-box;
              border-left: 2px solid lightgrey;
              border-top: 2px solid lightgrey;
              border-bottom: 2px solid lightgrey;
              margin-bottom: 5px;

            ">
          <div class="col-2">
            <div
              style="width:70px; border-radius: 50%; background-color: #e4fae9;padding: 15px;margin-top: 15px;margin-left:60px;">
              <q-icon size="40px" name="mdi-car" color="secondary" />
            </div>
          </div>
          <div class="col-10 text-white">
            <p style="margin-top: 30px;">
              Thank you for booking with us.
            </p>
            <p>
              <b>Your booking at
                ${data.transport_sub_name}
                is confirmed.</b>
            </p>
          </div>
          <div class="col-11"
            style="border: 2px;border-radius: 10px;margin-bottom: 10px;padding: 10px; background-color: white;">
            <p>
              Your booking at
              <b>${data.transport_sub_name}</b>
              on
              <b>
                ${moment(travelBkngDate).format("dddd, DD MMM YYYY")}
              </b>
              Is confirmed. You have reserved for <b> </b> from
              <b>${data.origin1}</b>
              to
              <b>
                ${data.destination_name}
              </b>
            </p>
            <p>
              You have paid amount of INR
              <b>${data.payable_amount}</b>.
            </p>
            <p class="text-green text-bold">
              You booking is under Free Cancellation policy (100%
              refunds) at at least 3 days before the booked date. Any
              cancellation thereafter the guest will be entitled to get
              only 60% refund of the booked amount.
            </p>
            <p align="center">
              <q-btn label="Manage your Additional booking online"
                style="background-color:lightblue;color:darkblue;font-weight: bold;" outlined
                @click="morebookings" />
            </p>
          </div>
        </div>
      </div>
      <div class="row col-12 bg-white justify-center q-px-sm" style="font-family: verdana;
              border-right: 2px solid lightgrey;
              box-sizing: border-box;
              border-left: 2px solid lightgrey;
              border-top: 2px solid lightgrey;
              border-bottom: 2px solid lightgrey;
              margin-top:5px
            ">
        <div>
          <q-card-section>
            <div class="row justify-left col-9 q-mb-md">
              <p class="row col-12 text-bold q-mt-sm q-mb-xs" style="font-size: 15px;font-family: verdana;">
                <b>Travel Booking Details</b>
              </p>
              <table style="width:100%;font-size:14px;background-color: green;color: white;" class="col-9">
                <tr class="row col-12">
                  <td class="row col-6">
                    Travel Booking ID :
                    <b>
                      ${confirmTravelBookingId}
                    </b>
                  </td>
                  <td class="col-6">
                    Booked Date :
                    <b>
                      ${moment(travelBkngDate).format("dddd, DD MMM YYYY")}
                    </b>
                  </td>
                </tr>
                <tr class="row col-12">
                </tr>
                <tr class="row col-12">
                  <td class="col-6">
                    Travel Name :
                    <b>
                      ${data.travel_name}
                    </b>
                  </td>
                  <td class="col-6">
                    Date of Booking :
                    <b>
                      ${moment(travelBkngDate).format("dddd, DD MMM YYYY")}
                    </b>
                  </td>
                </tr>
                <tr class="row col-12">
                  <td class="col-6">
                    Property Address:
                    <b>
                      ${data.property_city_name}
                    </b>
                  </td>
                </tr>
                <tr class="row col-12">
                  <td class="col-6">
                    Mobile Number :
                    <b>
                      ${data.mobile_number}
                    </b>
                  </td>
                  <td class="col-6">
                    Booking Origin :
                    <b>
                      ${data.origin1}
                    </b>
                  </td>
                </tr>
                <tr class="row col-12">
                  <td class="col-6">
                    Email ID :
                    <b>
                      ${data.email_id}
                    </b>
                  </td>
                  <td class="col-6">
                    Booking Destination :
                    <b>
                      ${data.destination_name}
                    </b>
                  </td>
                </tr>
              </table>
            </div>
            <div class="row justify-left col-9 q-mb-md">
              <p class="row col-12 text-bold q-mt-sm q-mb-xs" style="font-size: 15px;font-family: verdana;">
                <b>Travel Price Details</b>
              </p>
              <div class="row col-12 q-mt-sm" style="border: 1px solid silver; ">
                <div style="display:flex;width:100%">
                  <div style="width:60%">
                    <div class="text-subtitle" style="
                    font-size: 12px;
                    padding-left: 10px;
                    padding-top:5px;
                  ">
                      <b> Price Details</b>
                    </div>
                  </div>
                  <div style="font-size: 12px;padding-left: 10px;padding-top:5px;width:40%">
                    <b> Amount (₹) </b>
                  </div>
                </div>
                <div style="display:flex;width:100%; border-top:1px solid silver">
                  <div style="width:60%">
                    <div class="text-subtitle" style="
                    font-size: 12px;
                    padding-left: 10px;
                    padding-top:5px;
                  ">
                      Travel Charges (from
                      ${data.origin1}
                      to
                      ${data.destination_name})
                    </div>
                  </div>
                  <div class="text-subtitle" style="
                    font-size: 12px;
                    padding-left: 10px;
                    padding-top:5px;
                  ">
                    ₹${data.travel_charges}
                  </div>
                </div>
                <div style="display:flex;width:100%;">
                  <div style="width:60%" v-if="
                    this.propTravelBookedGuestNo[0].mh_offer_coupon !=
                    ''
                  ">
                    <div class="text-subtitle" style="
                    font-size: 12px;
                    padding-left: 10px;
                    padding-top:5px
                  ">
                      Applied MH Offer :
                      ${data.mh_offer_coupon}
                    </div>
                  </div>
                  <div class="text-subtitle" style="font-size: 12px;padding-left: 10px;padding-top:5px;width:40%"
                    v-if="
                      this.propTravelBookedGuestNo[0].mh_offer_coupon !=
                      ''
                    ">
                    ₹${data.mh_offer_price}
                  </div>
                </div>
                <div style="display:flex;width:100%;">
                  <div style="width:60%">
                    <div class="text-subtitle" style="
                    font-size: 12px;
                    padding-left: 10px;
                    padding-top:5px;
                  " v-if="
                    this.propTravelBookedGuestNo[0]
                      .mh_offer_coupon != ''
                  ">
                      Price After Discount
                    </div>
                  </div>
                  <div class="text-subtitle" style="font-size: 12px;padding-left: 10px;padding-top:5px;width:40%"
                    v-if="
                      this.propTravelBookedGuestNo[0].mh_offer_coupon !=
                      ''
                    ">
                    ₹${data.price_after_discount}
                  </div>
                </div>
                <div style="display:flex;width:100%">
                  <div class="text-subtitle" style="
                    font-size: 12px;
                    padding-left: 10px;
                    padding-top:5px;
                  ">
                    + Taxes & Fees -
                  </div>
                </div>
                <div style="display:flex;width:100%;">
                  <div style="width:60%">
                    <div class="text-subtitle " style="
                    font-size: 12px;
                    padding-left: 75px;
                    padding-top:5px;
                  ">
                      Taxes
                    </div>
                  </div>
                  <div class="text-subtitle" style="
                    font-size: 12px;
                    padding-left: 10px;
                    padding-top:5px;width:40%;
                  ">
                    ₹${data.gst_on_base_price}
                  </div>
                </div>
                <div style="display:flex;width:100%;">
                  <div style="width:60%">
                    <div class="text-subtitle" style="
                    font-size: 15px;
                    padding-left: 10px;
                    padding-top:5px;
                  ">
                      Total Price
                    </div>
                  </div>
                  <div class="text-subtitle" style="font-size: 12px;padding-left: 10px;padding-top:5px;width:40%">
                    <strong>
                      ₹${data.payable_amount}
                      /-
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
          <div style="margin:10px 0px 0px 0px">
          <div>Thank You.</div>
          <div style="font-weight:700;">TEAM MANGOHOMZ</div>
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
            <h5 style="margin:0px">Please contact with us : </h5> <a href="mailto:care@mangohomz.com" style="color:darkblue;font-weight:700;">care@mangohomz.com</a> & <a href="https://www.mangohomz.com " target="_blank" style="color:darkblue;font-weight:700;">www.mangohomz.ai </a>
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

    var mailOptions1 = {
      from: "noreply@mangohomz.com",
      to: data.transport_partner_email,
      //  bcc: 'forward@mangohomz.com',
      subject: `Booking Confirmed / ${data.travel_name}/ ${confirmTravelBookingId} `,
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
                <div style="height: 5px;width: 30%;background-color:darkblue;"></div>
              </div>
              <div style="padding:10px">
              <div>
              Dear, <span style="font-weight:700">${data.travel_name}</span>,
            </div>
                <div>
                  Greetings!!
                </div>
                <div style="margin: 5px 0px">
                <p>Please be informed that
                <div class="text-bold text-h5">
          Travel Booking No -
          ${confirmTravelBookingId}
        </div>
               is Book a Vehicle from
                <b>
                  ${data.origin1} </b>
                   to
                   <b>
                  ${data.destination_name}
                </b>
                has been booked under your <b> ${
                  data.travel_name
                } </b>. Please find the Customer Booking Details below.</p>
                </div>
            
                <div style="background-color:f3f3f3;padding:5px;margin:auto;border-radius:10px;margin-bottom:15px;color:black;">
                <div style="font-size:15px;font-family:verdana;"><b>Travel Booking Details</b></div>



                <table style="width:100%;font-size:14px;background-color: green;color: white;" class="col-9">
                <tr class="row col-12">
                  <td class="row col-6">
                    Travel Booking ID :
                    <b>
                      ${confirmTravelBookingId}
                    </b>
                  </td>
                  <td class="col-6">
                    Booked Date :
                    <b>
                      ${moment(travelBkngDate).format("dddd, DD MMM YYYY")}
                    </b>
                  </td>
                </tr>
                <tr class="row col-12">
                </tr>
                <tr class="row col-12">
                  <td class="col-6">
                    Travel Name :
                    <b>
                      ${data.travel_name}
                    </b>
                  </td>
                  <td class="col-6">
                    Date of Booking :
                    <b>
                      ${moment(travelBkngDate).format("dddd, DD MMM YYYY")}
                    </b>
                  </td>
                </tr>
                <tr class="row col-12">
                  <td class="col-6">
                    Property Address:
                    <b>
                      ${data.property_city_name}
                    </b>
                  </td>
                </tr>
                <tr class="row col-12">
                  <td class="col-6">
                    Mobile Number :
                    <b>
                      ${data.mobile_number}
                    </b>
                  </td>
                  <td class="col-6">
                    Booking Origin :
                    <b>
                      ${data.origin1}
                    </b>
                  </td>
                </tr>
                <tr class="row col-12">
                  <td class="col-6">
                    Email ID :
                    <b>
                      ${data.email_id}
                    </b>
                  </td>
                  <td class="col-6">
                    Booking Destination :
                    <b>
                      ${data.destination_name}
                    </b>
                  </td>
                </tr>
              </table>
            </div>
            <div class="row justify-left col-9 q-mb-md">
              <p class="row col-12 text-bold q-mt-sm q-mb-xs" style="font-size: 15px;font-family: verdana;">
                <b>Travel Price Details</b>
              </p>
              <div class="row col-12 q-mt-sm" style="border: 1px solid silver; ">
                <div style="display:flex;width:100%">
                  <div style="width:60%">
                    <div class="text-subtitle" style="
                    font-size: 12px;
                    padding-left: 10px;
                    padding-top:5px;
                  ">
                      <b> Price Details</b>
                    </div>
                  </div>
                  <div style="font-size: 12px;padding-left: 10px;padding-top:5px;width:40%">
                    <b> Amount (₹) </b>
                  </div>
                </div>
                <div style="display:flex;width:100%; border-top:1px solid silver">
                  <div style="width:60%">
                    <div class="text-subtitle" style="
                    font-size: 12px;
                    padding-left: 10px;
                    padding-top:5px;
                  ">
                      Travel Charges (from
                      ${data.origin1}
                      to
                      ${data.destination_name})
                    </div>
                  </div>
                  <div class="text-subtitle" style="
                    font-size: 12px;
                    padding-left: 10px;
                    padding-top:5px;
                  ">
                    ₹${data.travel_charges}
                  </div>
                </div>
                <div style="display:flex;width:100%;">
                  <div style="width:60%" v-if="
                    this.propTravelBookedGuestNo[0].mh_offer_coupon !=
                    ''
                  ">
                    <div class="text-subtitle" style="
                    font-size: 12px;
                    padding-left: 10px;
                    padding-top:5px
                  ">
                      Applied MH Offer :
                      ${data.mh_offer_coupon}
                    </div>
                  </div>
                  <div class="text-subtitle" style="font-size: 12px;padding-left: 10px;padding-top:5px;width:40%"
                    v-if="
                      this.propTravelBookedGuestNo[0].mh_offer_coupon !=
                      ''
                    ">
                    ₹${data.mh_offer_price}
                  </div>
                </div>
                <div style="display:flex;width:100%;">
                  <div style="width:60%">
                    <div class="text-subtitle" style="
                    font-size: 12px;
                    padding-left: 10px;
                    padding-top:5px;
                  " v-if="
                    this.propTravelBookedGuestNo[0]
                      .mh_offer_coupon != ''
                  ">
                      Price After Discount
                    </div>
                  </div>
                  <div class="text-subtitle" style="font-size: 12px;padding-left: 10px;padding-top:5px;width:40%"
                    v-if="
                      this.propTravelBookedGuestNo[0].mh_offer_coupon !=
                      ''
                    ">
                    ₹${data.price_after_discount}
                  </div>
                </div>
                <div style="display:flex;width:100%">
                  <div class="text-subtitle" style="
                    font-size: 12px;
                    padding-left: 10px;
                    padding-top:5px;
                  ">
                    + Taxes & Fees -
                  </div>
                </div>
                <div style="display:flex;width:100%;">
                  <div style="width:60%">
                    <div class="text-subtitle " style="
                    font-size: 12px;
                    padding-left: 75px;
                    padding-top:5px;
                  ">
                      Taxes
                    </div>
                  </div>
                  <div class="text-subtitle" style="
                    font-size: 12px;
                    padding-left: 10px;
                    padding-top:5px;width:40%;
                  ">
                    ₹${data.gst_on_base_price}
                  </div>
                </div>
                <div style="display:flex;width:100%;">
                  <div style="width:60%">
                    <div class="text-subtitle" style="
                    font-size: 15px;
                    padding-left: 10px;
                    padding-top:5px;
                  ">
                      Total Price
                    </div>
                  </div>
                  <div class="text-subtitle" style="font-size: 12px;padding-left: 10px;padding-top:5px;width:40%">
                    <strong>
                      ₹${data.payable_amount}
                      /-
                    </strong>
                  </div>
                </div>
              </div>
            </div>


                </div>
                <div style="margin:10px 0px 0px 0px">
                <ul style="list-style-type:number">
                <li><b> Accommodation Partner will receive Check-in day booking amount 24 hrs before the check-in, from MangoHomz towards accommodation charges.</b></li>
              
             
             
              <li>The <b> Accommodation Partner after booking confirmation</b>, is not permitted to cancel any of the bookings without 72 hours prior notice to the Mangohomz and seeking approval to do so in writing.</li>
              
            
            
              <li><b>	In case of cancellation before 3 days of check in there will be no payment to the Accommodation Partner .</b></li>
              
            
             
              <li><b> In case of cancellation by the Customer within 24 hours of check in,, the Accommodation partner will retain the check-in day booking amount .</b></li>
              
              <li><b> In case of any cancellation after check-in the MangoHomz  will pay to the Accommodation  partner the consumed days by the user  plus one additional day room rent.</b></li>
             
              <li><b>	Rest of the terms & conditions as per the agreement between you & Mangohomz Technologies Pvt. Ltd.</b></li>
              </ul>
              </div>
              <div style="margin:10px 0px 0px 0px">
              <div>Please provide the visitor with your best services.
              </div>
            
            </div>
                <div style="margin:10px 0px 0px 0px">
                  <div>Thank You.</div>
                  <div style="font-weight:700;">TEAM MANGOHOMZ</div>
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
                    <h5 style="margin:0px">Please contact with us : </h5> <a href="mailto:care@mangohomz.com" style="color:darkblue;font-weight:700;">care@mangohomz.com</a> & <a href="https://www.mangohomz.com " target="_blank" style="color:darkblue;font-weight:700;">www.mangohomz.ai </a>
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
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Succ", info.response);
      }
    });

    transporter.sendMail(mailOptions1, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Succ", info.response);
      }
    });
  }
  return { message };
}

async function guestBookingAccountData(account_id) {
  const rows = await db.query(
    `SELECT s_no,account_id, booking_id, booking_order_id,reference_id,invoice_number,partner_id, partner_sub_id, hotel_txn_id, room_txn_id, property_name, property_type, room_type, near_hospital_id, near_hospital_name, check_in, check_out, guest_count, no_of_days, room_price, discount,partner_offer_percentage,partner_offer,base_price, discount_price, price_after_discount, mh_offer_price, mh_offer_name, gst_percentage, gst_amount,cgst_percentage, cgst_amount,sgst_percentage, sgst_amount, total_price, country_code, country_name,phone_no,primary_no,alternate_email_id,address_line_1,address_line_2,state_id,state_name,city,property_city_id,property_city_name,email_id,alternate_no,pincode,gstin_no,booking_status,room_category,address,room_booked_count FROM mh_bookings_table WHERE account_id = '${account_id}' ORDER BY inserted_date_time DESC`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  let hotel_image = "";
  let room_image1 = "";
  let room_image2 = "";
  let room_image3 = "";
  let guestData = "";
  let partner_name = "";
  let sub_partner_name = "";

  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      partner_name = await helper.getPartnerName(element.partner_id);
      sub_partner_name = await helper.getSubPartnerName(
        element.partner_id,
        element.partner_sub_id
      );
      guestData = await helper.getGuestDetailsDataFromDb(
        element.booking_order_id
      );
      hotel_image = await helper.getHotelImageBasedonPartner(
        element.partner_id,
        element.partner_sub_id,
        element.hotel_txn_id
      );
      room_image1 = await helper.getRoomImage1(
        element.partner_id,
        element.partner_sub_id,
        element.hotel_txn_id,
        element.room_txn_id
      );
      room_image2 = await helper.getRoomImage2(
        element.partner_id,
        element.partner_sub_id,
        element.hotel_txn_id,
        element.room_txn_id
      );
      room_image3 = await helper.getRoomImage3(
        element.partner_id,
        element.partner_sub_id,
        element.hotel_txn_id,
        element.room_txn_id
      );
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
        ...element,
      });
    }
  }

  return { data };
}

async function guestFoodBookingAccountData(account_id) {
  const rows = await db.query(
    `SELECT s_no,account_id,booking_id,booking_order_id, food_booking_id, food_booking_orderid, invoice_number, booking_city, booking_city_id, hotel_property_name, near_hospital_name, check_in, check_out, guest_count, no_of_days, foodPartner_name, food_partner_id, foodPartner_sub_name, food_partner_sub_id, 	date_format(food_booking_date,"%d-%m-%Y") as food_booking_date, food_booking_type, total_qty_booked,total_item_qty, food_charges, discount, discount_price, base_price, mh_offer_price, mh_offer_coupon, price_after_discount, gst_percentage, gst_on_base_price, final_price_amount, country_name, country_code, mobile_number, gstin_no,foodPartner_name, food_partner_id, foodPartner_sub_name, food_partner_sub_id,whatsapp_number,email_id,food_reference_id,cgst_percentage,cgst_amount,sgst_percentage,sgst_amount, date_format(updated_time,"%d-%m-%Y") as updated_time,food_booking_time,food_booking_time,food_reference_id,mobile_number FROM mh_food_booking_table WHERE account_id = '${account_id}' ORDER BY updated_time DESC`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  let foodBkngData = "";

  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      foodBkngData = await helper.getFoodBkngItems(
        element.food_booking_orderid
      );
      index = index + 1;
      data.push({
        s_no: index,
        foodBkngData: foodBkngData,
        ...element,
      });
    }
  }
  return { data };
}
async function guestTravelBookingAccountData(account_id) {
  const rows = await db.query(
    `SELECT sno,account_id, booking_id, booking_order_id, travel_booking_id, travel_booking_orderid, invoice_number, property_city_name, property_city_id, near_hospital_name, check_in, check_out, guest_count, no_of_days,date_format(booked_date,"%d-%m-%Y") as booked_date, booking_origin, booking_destination,destination_name, booking_time, travel_charges, discount, discount_price, base_price, mh_offer_price, mh_offer_coupon, price_after_discount, gst_percentage, gst_on_base_price, payable_amount, country_code, country_name, mobile_number, gst_number, date_format(updated_datetime,'%d-%m-%y') as update_time, agent_id, travel_name, transport_sub_id, transport_sub_name, hotel_property_name,travel_reference_id,cgst_percentage,cgst_amount,sgst_percentage,sgst_amount,whatsapp_number,email_id FROM mh_travel_booking_table WHERE account_id = '${account_id}' ORDER BY updated_datetime DESC`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  let travelBkngData = "";

  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      travelBkngData = await helper.getTravelBkngItems(
        element.travel_booking_orderid
      );
      index = index + 1;
      data.push({
        s_no: index,
        travelBkngData: travelBkngData,
        ...element,
      });
    }
  }
  return { data };
}
async function guestMedicalBookingAccountData(account_id) {
  const rows = await db.query(
    `SELECT sno,account_id,booking_id,booking_order_id,account_id,medical_booking_id,medical_booking_orderid,invoice_number,booking_city,booking_city_id,hotel_property_name,near_hospital_name, check_in,check_out,guest_count,no_of_days,	date_format(eqp_booking_date,"%d-%m-%Y") as eqp_booking_date,eqp_booking_type,total_qty_booked,total_item_qty,equipment_name,equipment_id,equipment_sub_name,equipment_sub_id,medical_charges,discount,discount_price,base_price,mh_offer_price,mh_offer_coupon,price_after_discount,gst_percentage,gst_on_base_price,final_price_amount,country_name,country_code,mobile_number,gstin_no,whatsapp_number,email_id,medical_reference_id,cgst_percentage,cgst_amount,sgst_percentage,sgst_amount,days_booked_for FROM mh_equipment_booking_table WHERE account_id = '${account_id}' ORDER BY updated_time DESC`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  let medicalBkngData = "";

  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      medicalBkngData = await helper.getMedicalBkngItems(
        element.medical_booking_orderid
      );
      index = index + 1;
      data.push({
        s_no: index,
        medicalBkngData: medicalBkngData,
        ...element,
      });
    }
  }
  return { data };
}

class Book {
  hotel() {
    let message = "Failed to save Hotel booking details";
    let sql = `INSERT INTO mht_bookings`;
    const result = db.query(sql);
    if (result.affectedRows) message = "Hotel Booked successfully";
    return message;
  }

  food() {
    let message = "Failed to order the food";
    let sql = `INSERT INTO mht_bookings_food`;
    const result = db.query(sql);
    if (result.affectedRows) message = "Food Ordered successfully";
    return message;
  }

  equipment() {
    // need to handle the loop
    let message = "Failed to order the Equipment";
    let sql = `INSERT INTO mht_bookings_equipment`;
    const result = db.query(sql);
    if (result.affectedRows) message = "Equipment Ordered successfully";
    return message;
  }

  travel() {
    // need to handle the loop
    let message = "Failed to order the travel";
    let sql = `INSERT INTO mht_bookings_travel`;
    const result = db.query(sql);
    if (result.affectedRows) message = "Travel Ordered successfully";
    return message;
  }
}
// async function createUserDetails(data) {
//   // console.log("ddddattta",data)
//   let upcoming_Cities = data.upcomingCities.toString();
//   result = await db.query(
//     `INSERT IGNORE INTO mh_users_table (full_name, mobile_number, email_id, alternate_number, address, state, country, pincode, cities) VALUES
//       (?,?,?,?,?,?,?,?,?)`,
//     [
//       data.fullName ?? "",
//       data.mobileNumber ?? "",
//       data.emailId ?? "",
//       data.alternateNumber ?? "",
//       data.address ?? "",
//       data.state.state_name ?? data.state1,
//       data.country.name ?? "",
//       data.pincode ?? "",
//       upcoming_Cities ?? "",
//     ]
//   );
//   let message = "Error while submitting Booking Data";

//   if (result.affectedRows) {
//     message = "User Registration Completed Successfully";

//     const mailOptions = {
//       from: "noreply@mangohomz.com",
//       to: data.emailId,
//       subject: "User Registration Login Credentials",
//       html: `
//           <div style="border:1px solid grey;>
//             <div style="box-shadow:2px 2px 10px 2px grey;">
//               <div style="display:flex;">
//                 <div>
//                   <a href="https://mangohomz.com" target="_blank"><img src="https://mangohomz.com/img/logo-main.6f335097.png" width="200px" height="50px" alt="mangohomz logo"></a>
//                 </div>
//                 <div style="font-weight:700;margin-top: 42px;margin-right: 6px;margin-left:300px">
//                   <p><a target="_blank" href="https://mangohomz.com" style="color:darkblue">www.mangohomz.ai</a></p>
//                 </div>
//               </div>
//               <div style="display:flex;">
//                 <div style="height: 5px;width: 70%;background-color:green;"></div>
//                 <div style="height: 5px;width: 30%;background-color:darkblue;"></div>
//               </div>
//               <div style="padding:10px">
//                 <div>
//                   Greetings, <span style="font-weight:700">${data.fullName}</span>,
//                 </div>
//                 <div style="margin: 5px 0px">
//                   <p>We are grateful that you choose MANGOHOMZ.COM. Your registration was successful, so thank you. Visit <a target="_blank" href="https://mangohomz.com" style="color:darkblue;text-decoration:none;font-weight:700;">www.mangohomz.com</a> and log in to Book Mangohomez Services. </p>
//                   <div >
//                     <span style="font-weight:700">Your Username </span>: ${data.mobileNumber}
//                   </div>
//                   <div>
//                     <span style="font-weight:700">Your Password </span>: guest
//                   </div>
//                 </div>

//                 <div style="margin:10px 0px 0px 0px">
//                   <div>Thank You.</div>
//                   <div style="font-weight:700;">TEAM MANGOHOMZ</div>
//                 </div>
//               </div>
//               <div style="display:flex;">
//                 <div style="height: 5px;width: 100%;background-color:darkblue;"></div>
//               </div>
//               <div style="display:flex;">
//                 <div>
//                   <h6 style="margin:5px 0px 2px 4px">JOIN AND BE A PART OF A NATIONWIDE NETWORK</h6>
//                   <a href="https://mangohomz.com" target="_blank"><img src="https://mangohomz.com/img/logo-main.6f335097.png" width="200px" height="50px" alt="mangohomz logo"></a>
//                   <h6 style="margin:5px 0px 2px 4px">NOBODY HANDLES MEDICAL STAYS LIKE WE DO</h6>
//                 </div>
//                 <div style="margin:5px 0px 2px 150px">
//                   <div>
//                     <h5 style="margin:0px">Please contact with us : </h5> <a href="mailto:care@mangohomz.com" style="color:darkblue;font-weight:700;">care@mangohomz.com</a> & <a href="https://www.mangohomz.com " target="_blank" style="color:darkblue;font-weight:700;">www.mangohomz.ai </a>
//                   </div>
//                   <div style="display:flex;">
//                     <div>
//                       <a href="https://www.facebook.com/Mangohomzpage/" target="_blank"><img src="https://mangohomz.com/mhmailer/mailer-1/media/facebook.png" alt=""  width="30px" height="30px" style="margin-top: 7px;"></a>
//                     </div>
//                     <div>
//                       <a href="https://mobile.twitter.com/mangohomz" target="_blank"><img src="https://mangohomz.com/mhmailer/mailer-1/media/twitter.png" alt=""  width="36px" height="36px" style="margin-top: 4px;"></a>
//                     </div>
//                     <div>
//                       <a href="https://instagram.com/mangohomz" target="_blank"><img src="https://mangohomz.com/mhmailer/mailer-1/media/instagram.png" alt=""  width="30px" height="30px" style="margin-top: 7px;"></a>
//                     </div>
//                     <div>
//                       <a href="https://linkedin.com/company/mangohomz" target="_blank"><img src="https://mangohomz.com/mhmailer/mailer-1/media/linkedin.png" alt=""  width="36px" height="36px" style="margin-top: 4px;"></a>
//                     </div>
//                     <div>
//                       <a href="https://www.youtube.com/channel/UCWAmQdY8g8AYI_Yojr8OYlA" target="_blank"><img src="https://mangohomz.com/mhmailer/mailer-1/media/youtube.png" alt=""  width="30px" height="30px" style="margin-top: 7px;"></a>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//       `,
//     };
//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log("Succ", info);
//       }
//     });
//   }
//   return { message };
// }
async function createUserDetails(data) {
  let upcoming_Cities = data.upcomingCities.toString();
  // console.log("ssss", data, upcoming_Cities);

  let message = "";
  let message1 = "";

  const results = await db.query(
    `SELECT mobile_number
    FROM mh_users_table
    WHERE mobile_number = ?`,
    [data.mobileNumber]
  );
  if (results.length > 0) {
    message1 = "Mobile number already registered";
  } else {
    await db.query(
      `INSERT INTO mh_users_table (full_name, mobile_number, email_id, alternate_number, address, state, country, pincode, cities)
      VALUES (?,?,?,?,?,?,?,?,?)`,
      [
        data.fullName ?? "",
        data.mobileNumber ?? "",
        data.emailId ?? "",
        data.alternateNumber ?? "",
        data.address ?? "",
        data.state.state_name ?? data.state1,
        data.country.name ?? "",
        data.pincode ?? "",
        upcoming_Cities ?? "",
      ]
    );
    message = "User data saved successfully";
  }
  return { message, message1 };
}
async function getaccomodationdetails(account_id) {
  const rows = await db.query(
    `SELECT *  FROM mh_property_details_table WHERE account_id='${account_id}'`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  let partnerDetails = "";
  let roomdetails = "";
  let Cancellationdetails = "";
  let monthwisebookingdetails = "";
  let monthwisecancellationdetails = "";
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      partnerDetails = await helper.getpartnerDetails(
        element.partner_id,
        element.partner_sub_id,
        element.txn_id
      );
      roomdetails = await helper.getpartnerroomDetails(
        element.account_id,
        element.txn_id
      );
      Cancellationdetails = await helper.getCancellationByPropertyName(
        element.account_id,
        element.txn_id
      );
      monthwisebookingdetails = await helper.getMonthwisePartnerAccBookings(
        element.txn_id
      );
      monthwisecancellationdetails =
        await helper.getMonthwisePartnerAccCancellations(element.txn_id);
      index = index + 1;
      const total_price = partnerDetails.reduce(
        (acc, curr) => acc + curr.total_price,
        0
      );
      const room_booked_count = partnerDetails.reduce(
        (acc, curr) => acc + curr.room_booked_count,
        0
      );
      const guest_count = partnerDetails.reduce(
        (acc, curr) => acc + curr.guest_count,
        0
      );
      const no_of_days = partnerDetails.reduce(
        (acc, curr) => acc + curr.no_of_days,
        0
      );
      const can_no_of_days = Cancellationdetails.reduce(
        (acc, curr) => acc + curr.no_of_days,
        0
      );
      const can_total_price = Cancellationdetails.reduce(
        (acc, curr) => acc + curr.total_price,
        0
      );
      const refundAmount = Cancellationdetails.reduce(
        (acc, curr) => acc + curr.refundAmount,
        0
      );

      // const month_name = monthwisebookingdetails.length > 0 ? monthwisebookingdetails[0].month_name : '';
      // const total_bookings = monthwisebookingdetails.length > 0 ? monthwisebookingdetails[0].total_bookings : '';
      // const total_nights = monthwisebookingdetails.length > 0 ? monthwisebookingdetails[0].total_nights : '';
      // const total_guests = monthwisebookingdetails.length > 0 ? monthwisebookingdetails[0].total_guests : '';
      // const total_rooms = monthwisebookingdetails.length > 0 ? monthwisebookingdetails[0].total_rooms : '';
      // const booking_amount = monthwisebookingdetails.length > 0 ? monthwisebookingdetails[0].booking_amount : '';

      // const partnercan_month_name = monthwisecancellationdetails.length > 0 ? monthwisecancellationdetails[0].month_name : '';
      // const partnercan_total_cancellations = monthwisecancellationdetails.length > 0 ? monthwisecancellationdetails[0].total_cancellations : '';
      // const partnercan_total_nights = monthwisecancellationdetails.length > 0 ? monthwisecancellationdetails[0].total_nights : '';
      // const partnercan_total_booking_amount = monthwisecancellationdetails.length > 0 ? monthwisecancellationdetails[0].total_booking_amount : '';
      // const partnercan_total_refund_amount = monthwisecancellationdetails.length > 0 ? monthwisecancellationdetails[0].total_refund_amount : '';

      data.push({
        s_no: index,
        partnerDetails: partnerDetails,
        roomdetails: roomdetails,
        Cancellationdetails: Cancellationdetails,
        monthwisebookingdetails: monthwisebookingdetails,
        monthwisecancellationdetails: monthwisecancellationdetails,

        total_price: total_price,
        room_booked_count: room_booked_count,
        guest_count: guest_count,
        no_of_days: no_of_days,
        can_no_of_days: can_no_of_days,
        can_total_price: can_total_price,
        refundAmount: refundAmount,

        // month_name: month_name,
        // total_bookings: total_bookings,
        // total_nights: total_nights,
        // total_guests: total_guests,
        // total_rooms: total_rooms,
        // booking_amount: booking_amount,

        // partnercan_month_name: partnercan_month_name,
        // partnercan_total_cancellations: partnercan_total_cancellations,
        // partnercan_total_nights: partnercan_total_nights,
        // partnercan_total_booking_amount: partnercan_total_booking_amount,
        // partnercan_total_refund_amount: partnercan_total_refund_amount,
        ...element,
      });
      // console.log("data from services",data);
    }
  }
  return { data };
}
async function getTravelDashboardBookingData(accountid) {
  const rows = await db.query(
    `SELECT * FROM mh_transport_details WHERE account_id='${accountid}' `
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  let travelBkngData = "";
  let vehicleData = "";
  let travelcanceldata = "";

  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      travelBkngData = await helper.getTravelVechicle(
        element.account_id,
        element.agent_id,
        element.transport_sub_id
      );
      vehicleData = await helper.getTravelLocationData(
        element.account_id,
        element.agent_id,
        element.transport_sub_id
      );
      travelcanceldata = await helper.getTravelcancelData(
        element.transport_sub_id
      );
      index = index + 1;
      const payable_amount = travelBkngData.reduce(
        (acc, curr) => acc + curr.payable_amount,
        0
      );
      const payable_amountforcancel = travelcanceldata.reduce(
        (acc, curr) => acc + curr.payable_amount,
        0
      );
      const travelrefundamount = travelcanceldata.reduce(
        (acc, curr) => acc + curr.travelrefundamount,
        0
      );

      data.push({
        s_no: index,
        travelBkngData: travelBkngData,
        vehicleData: vehicleData,
        travelcanceldata: travelcanceldata,

        payable_amount: payable_amount,
        payable_amountforcancel: payable_amountforcancel,
        travelrefundamount: travelrefundamount,
        ...element,
      });
    }
  }
  return { data };
}
async function getFoodDashboardBookingData(accountid) {
  const rows = await db.query(
    `SELECT txn_id, account_id, agent_id, agent_sub_id, food_partner_name, food_partner_sub_name, food_partner_phone, name_of_kitchen, type_of_kitchen, fssai_no, upload_fssai, special_offer, date_from, date_to, restaurant_description, restaurant_phone, restaurant_email, restaurant_latitude, restaurant_longitude, building_no, street, land_mark, country, state_id, state_name, city_id, city_name, pin_code, opening_time, closing_time, Name_Of_Contact_Person, upload_image, upload_image1, upload_image2, ip_address FROM mh_restaurant_details_table WHERE account_id='${accountid}'`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  let foodBkngData = "";
  let getFoodDashboardData = "";

  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      getFoodDashboardData = await helper.getFoodItemsData(
        element.txn_id,
        element.account_id,
        element.agent_id,
        element.agent_sub_id
      );

      foodBkngData = await helper.getfood(
        element.account_id,
        element.agent_id,
        element.agent_sub_id
      );
      index = index + 1;
      data.push({
        s_no: index,
        foodBkngData: foodBkngData,
        getFoodDashboardData: getFoodDashboardData,
        ...element,
      });
    }
  }
  return { data };
}

async function getMedicalDashboardBookingData(accountid) {
  const rows = await db.query(
    `SELECT txn_id, account_id, equipment_id, equipment_sub_id, agent_name, equipment_sub_name, medical_store_name, special_offer, from_date, to_date, description, phone, email, name_of_contact_person, building_no, street, land_mark, country, state_id, state_name, city_id, city_name, pin_code, latitude, longitude, opening_time, closing_time, upload_image1, upload_image2, upload_image3, status, created_datetime, updated_datetime, ip_address FROM mh_medical_stores_table WHERE account_id='${accountid}' `
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  let medicalBkngData = "";
  let medicalStoreData = "";
  let upload_image1 = "";
  let upload_image2 = "";
  let upload_image3 = "";

  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      medicalStoreData = await helper.getMedicalStoreitems(
        element.account_id,
        element.equipment_id,
        element.equipment_sub_id
      );

      medicalBkngData = await helper.getequipment(
        element.account_id,
        element.equipment_id,
        element.equipment_sub_id
      );
      index = index + 1;
      data.push({
        s_no: index,
        medicalBkngData: medicalBkngData,
        medicalStoreData: medicalStoreData,
        upload_image1: upload_image1,
        upload_image2: upload_image2,
        upload_image3: upload_image3,
        ...element,
      });
    }
  }
  return { data };
}
async function loadaccallbooking(accountid, partnerid, partnersubid, txn_id) {
  const rows = await db.query(
    `SELECT account_id, booking_id, booking_order_id,reference_id,invoice_number,partner_id, partner_sub_id, hotel_txn_id, room_txn_id, property_name, property_type, room_type, near_hospital_id, near_hospital_name,date_format(check_in,'%d/%m/%y') as check_in,date_format(check_out,'%d/%m/%y') as check_out, guest_count, no_of_days, room_price, discount,partner_offer_percentage,partner_offer,base_price, discount_price, price_after_discount, mh_offer_price, mh_offer_name, gst_percentage, gst_amount,cgst_percentage, cgst_amount,sgst_percentage, sgst_amount, total_price, country_code, country_name,phone_no,primary_no,alternate_email_id,address_line_1,address_line_2,state_id,state_name,city,property_city_id,property_city_name,property_state_id,property_state_name,email_id,alternate_no,pincode,gstin_no,date_format(inserted_date_time,'%d/%m/%y') as inserted_date_time,date_format(inserted_date_time,'DD MMM YYYY') as inserted_date,checkIn_time,checkOut_time,facilities,room_category,address,room_booked_count FROM mh_bookings_table WHERE booking_status='Booked' AND account_id = '${accountid}' AND partner_id = '${partnerid}' AND partner_sub_id = '${partnersubid}' AND hotel_txn_id = '${txn_id}'`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  let guest = "";
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      guest = await helper.getguestdetails(element.booking_order_id);
      index = index + 1;
      data.push({
        sno: index,
        guest: guest,
        ...element,
      });
    }
  }
  return { data };
}

async function loadaccfoodbooking(accountid, agentid, agentsubid) {
  const rows = await db.query(
    `SELECT s_no,account_id,booking_id,booking_order_id, food_booking_id, food_booking_orderid, invoice_number, booking_city, booking_city_id, hotel_property_name, near_hospital_name, date_format(check_in,"%d/%m/%Y") as check_in,date_format(check_out,"%d/%m/%Y") as check_out , guest_count, no_of_days, foodPartner_name, food_partner_id, foodPartner_sub_name, food_partner_sub_id,date_format(food_booking_date,"%d-%m-%Y") as food_booking_date, food_booking_type, total_qty_booked,total_item_qty, food_charges, discount, discount_price, base_price, mh_offer_price, mh_offer_coupon, price_after_discount, gst_percentage, gst_on_base_price, final_price_amount, country_name, country_code, mobile_number, gstin_no,foodPartner_name, food_partner_id, foodPartner_sub_name, food_partner_sub_id,whatsapp_number,email_id,food_reference_id,cgst_percentage,cgst_amount,sgst_percentage,sgst_amount, date_format(updated_time,"%d-%m-%Y") as updated_time,food_booking_time,food_reference_id,mobile_number FROM mh_food_booking_table WHERE account_id = '${accountid}' AND food_partner_id='${agentid}' AND food_partner_sub_id='${agentsubid}' `
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  let foodData = "";
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      foodData = await helper.getfoodDetails(element.food_booking_orderid);
      index = index + 1;
      data.push({
        sno: index,
        foodData: foodData,
        ...element,
      });
    }
  }
  return { data };
}
async function loadacctravelbooking(accountid, agentid, transportsubid) {
  const rows = await db.query(
    `SELECT sno,account_id, booking_id, booking_order_id, travel_booking_id, travel_booking_orderid, invoice_number, property_city_name, property_city_id, near_hospital_name,date_format(check_in,"%d/%m/%Y") as check_in,date_format(check_out,"%d/%m/%Y") as check_out , guest_count, no_of_days,date_format(booked_date,"%d-%m-%Y") as booked_date, booking_origin, booking_destination,destination_name, booking_time, travel_charges, discount, discount_price, base_price, mh_offer_price, mh_offer_coupon, price_after_discount, gst_percentage, gst_on_base_price, payable_amount, country_code, country_name, mobile_number, gst_number, date_format(updated_datetime,'%d-%m-%y') as update_time, agent_id, travel_name, transport_sub_id, transport_sub_name, hotel_property_name,travel_reference_id,cgst_percentage,cgst_amount,sgst_percentage,sgst_amount,whatsapp_number,email_id,booking_status FROM mh_travel_booking_table WHERE booking_status = 'Booked' AND account_id = '${accountid}' AND agent_id='${agentid}' AND transport_sub_id='${transportsubid}' `
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  let travelData = "";
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      travelData = await helper.getVehicledetails(
        element.travel_booking_orderid
      );
      index = index + 1;
      data.push({
        s_no: index,
        travelData: travelData,
        ...element,
      });
    }
  }
  return { data };
}
async function loadaccmedicalbooking(accountid, agentid, agentsubid) {
  const rows = await db.query(
    `SELECT sno,account_id,booking_id,booking_order_id,account_id,medical_booking_id,medical_booking_orderid,invoice_number,booking_city,booking_city_id,hotel_property_name,near_hospital_name,date_format(check_in,"%d/%m/%Y") as check_in,date_format(check_out,"%d/%m/%Y") as check_out ,guest_count,no_of_days,date_format(eqp_booking_date,"%d-%m-%Y") as eqp_booking_date,eqp_booking_type,total_qty_booked,total_item_qty,equipment_name,equipment_id,equipment_sub_name,equipment_sub_id,medical_charges,discount,discount_price,base_price,mh_offer_price,mh_offer_coupon,price_after_discount,gst_percentage,gst_on_base_price,final_price_amount,country_name,country_code,mobile_number,gstin_no,whatsapp_number,email_id,medical_reference_id,cgst_percentage,cgst_amount,sgst_percentage,sgst_amount,days_booked_for FROM mh_equipment_booking_table WHERE account_id = '${accountid}' AND equipment_id='${agentid}' AND equipment_sub_id='${agentsubid}' `
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  let medicalData = "";
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      medicalData = await helper.getmedical(element.medical_booking_orderid);
      index = index + 1;
      data.push({
        index: index,
        medicalData: medicalData,
        ...element,
      });
    }
  }
  return { data };
}
async function revenueBookingData(account_id) {
  const rows = await db.query(
    `SELECT s_no,account_id, booking_id, booking_order_id,reference_id,invoice_number,partner_id, partner_sub_id, hotel_txn_id, room_txn_id, property_name, property_type, room_type, near_hospital_id, near_hospital_name, check_in, check_out, guest_count, no_of_days, room_price, discount,partner_offer_percentage,partner_offer, base_price,discount_price, price_after_discount, mh_offer_price, mh_offer_name, gst_percentage, gst_amount,cgst_percentage, cgst_amount,sgst_percentage, sgst_amount, total_price, country_code, country_name,phone_no,primary_no,alternate_email_id,address_line_1,address_line_2,state_id,state_name,city,property_city_id,property_city_name,email_id,alternate_no,pincode,gstin_no,booking_status,room_category,address,room_booked_count FROM mh_bookings_table WHERE account_id = '${account_id}' ORDER BY inserted_date_time DESC`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  let hotel_image = "";
  let room_image1 = "";
  let room_image2 = "";
  let room_image3 = "";
  let guestData = "";
  let partner_name = "";
  let sub_partner_name = "";
  let propertyGstNumber = "";
  let dateOfCancellationData = "";

  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      partner_name = await helper.getPartnerName(element.partner_id);
      sub_partner_name = await helper.getSubPartnerName(
        element.partner_id,
        element.partner_sub_id
      );
      guestData = await helper.getGuestDetailsDataFromDb(
        element.booking_order_id
      );
      propertyGstNumber = await helper.loadpropertyGstNumberFromDb(
        element.account_id
      );
      dateOfCancellationData = await helper.loaddateOfCancellationDataFromDb(
        element.booking_order_id
      );
      hotel_image = await helper.getHotelImageBasedonPartner(
        element.partner_id,
        element.partner_sub_id,
        element.hotel_txn_id
      );
      room_image1 = await helper.getRoomImage1(
        element.partner_id,
        element.partner_sub_id,
        element.hotel_txn_id,
        element.room_txn_id
      );
      room_image2 = await helper.getRoomImage2(
        element.partner_id,
        element.partner_sub_id,
        element.hotel_txn_id,
        element.room_txn_id
      );
      room_image3 = await helper.getRoomImage3(
        element.partner_id,
        element.partner_sub_id,
        element.hotel_txn_id,
        element.room_txn_id
      );
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
        propertyGstNumber: propertyGstNumber,
        propertyGstNumber: propertyGstNumber,
        dateOfCancellationData: dateOfCancellationData,
        ...element,
      });
    }
  }

  return { data };
}
async function SavingAarthilabsdata(data, ipAddress) {
  try {
    // console.log("services123", data);
    // console.log("services", data.arthiFormsavingdetails.testNameArrayDataObj);

    let month = moment(new Date()).format("MM");
    let year = moment(new Date()).format("YY");
    let ArthiBkngID = await helper.generateMaxAarthiBookingId(
      "mh_aarthi_scan_booking",
      "s_no"
    ); // Pass the column name as a string
    let mh_aarthi_booking_id = ArthiBkngID.toString().padStart(6, "0");
    let confirmArthiBookingId = `AAR${year}${month}${mh_aarthi_booking_id}`;
    const bookDate = moment(new Date(), "DD/MM/YYYY").format("YYYY-MM-DD");
    const testDate = moment(
      data.arthiFormsavingdetails.test_date,
      "DD/MM/YYYY"
    ).format("YYYY-MM-DD HH:mm:ss");

    let noOfTests = 0;
    if (
      data.arthiFormsavingdetails.testNameArrayDataObj &&
      data.arthiFormsavingdetails.testNameArrayDataObj.length > 0
    ) {
      noOfTests = data.arthiFormsavingdetails.testNameArrayDataObj.length;
    }
    let result = await db.query(
      `INSERT IGNORE INTO mh_aarthi_scan_booking(s_no, mh_aarthi_booking_id, city_name, aarthi_center_name, mobile_number, secondary_mobile_no, customer_name, customer_age, gender, email_id, no_of_tests, total_price, booked_date, test_date, status, created_date_time, ip_address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.arthiFormsavingdetails.s_no ?? "",
        confirmArthiBookingId ?? "",
        data.arthiFormsavingdetails.city ?? "",
        data.arthiFormsavingdetails.center_name ?? "",
        data.arthiFormsavingdetails.mobile_no ?? "",
        data.arthiFormsavingdetails.alternate_mobile_no ?? "",
        data.arthiFormsavingdetails.first_name ?? "",
        data.arthiFormsavingdetails.age ?? "",
        data.arthiFormsavingdetails.gender ?? "",
        data.arthiFormsavingdetails.email_id ?? "",
        // data.arthiFormsavingdetails.no_of_tests ?? "",
        noOfTests ?? "",
        data.arthiFormsavingdetails.rate ?? "",
        bookDate ?? "",
        testDate ?? "",
        "Booked",
        //data.arthiFormsavingdetails.status ?? "",
        new Date() ?? "",
        ipAddress ?? "",
      ]
    );

    if (result && result.affectedRows > 0) {
      if (
        data.arthiFormsavingdetails.testNameArrayDataObj &&
        data.arthiFormsavingdetails.testNameArrayDataObj.length > 0
      ) {
        for (
          let i = 0;
          i < data.arthiFormsavingdetails.testNameArrayDataObj.length;
          i++
        ) {
          var result2 = await db.query(
            `INSERT IGNORE INTO mh_aarthi_scan_booking_txn (s_no, mh_aarthi_booking_id, test_type, test_name, price, total_price, booked_date, test_date, test_time, payment_type, status, updated_date, ip_address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              data.arthiFormsavingdetails.s_no ?? "",
              confirmArthiBookingId ?? "",
              data.arthiFormsavingdetails.testNameArrayDataObj[i].test_type ??
                "",
              data.arthiFormsavingdetails.testNameArrayDataObj[i].test_name ??
                "",
              data.arthiFormsavingdetails.testNameArrayDataObj[i].price ?? "",
              // data.arthiFormsavingdetails.testNameArrayDataObj[i].rate ?? "",
              data.arthiFormsavingdetails.rate ?? "",
              bookDate ?? "",
              // data.arthiFormsavingdetails.test_date ?? "",
              testDate ?? "",
              data.arthiFormsavingdetails.test_time ?? "",
              data.arthiFormsavingdetails.payment_type ?? "",
              "Booked",
              //  data.arthiFormsavingdetails.status ?? "",
              new Date() ?? "",
              ipAddress ?? "",
            ]
          );
        }
      }
      let message = " Error Aarthi Booking Data submitted successfully.";
      if (result.affectedRows && result2.affectedRows) {
        message = "Aarthi Booking Data submitted successfully.";
        let testNames = data.arthiFormsavingdetails.testNameArrayDataObj
          .map((test) => test.test_name)
          .join(", ");
        let testtype = data.arthiFormsavingdetails.testNameArrayDataObj
          .map((test) => test.test_type)
          .join(", ");
        const adminMail = {
          from: "noreply@mangohomz.com",
          to: "bindu.madhavi@mangohomz.com",
          //  to: 'admin@mangohomz.com',
          // bcc: 'forward@mangohomz.com',
          subject: "New Aarthi Scans & Labs  Booking ",
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
               <div style="height: 5px;width: 30%;background-color:darkblue;"></div>
             </div>
             <div style="padding:10px">
               <div>
                 Greetings,<span style="font-weight:700">Admin</span>,
               </div>
               <div style="margin: 5px 0px">
                 <p>A new ${data.arthiFormsavingdetails.first_name} has applied for booking in Aarthi Scans and Labs in a${data.arthiFormsavingdetails.city} center name ${data.arthiFormsavingdetails.center_name}..</p>
               </div>
               <div style="margin: 5px 0px">
               <p>Details entered by customer.</p>
             </div>
               <table style="width:100%">
               <style>
               table, th, td {
               border:1px solid black;
               }
               td {
               text-align:left;
               padding:2px;
               }
               </style>
               <tr>
               <td>Aarthi scan Booking Id</td>
               <td>${confirmArthiBookingId}</td>
             </tr>
               
               <tr>
                 <td>Custmer Name</td>
                 <td>${data.arthiFormsavingdetails.first_name}</td>
               </tr>
               <tr>
                 <td>Mobile Number</td>
                 <td>+91-${data.arthiFormsavingdetails.mobile_no}</td>
               </tr>
               <tr>
               <td>Email Id</td>
               <td>${data.arthiFormsavingdetails.email_id}</td>
               </tr>
               <tr>
               <td>City</td>
               <td>${data.arthiFormsavingdetails.city}</td>
               </tr>
               <tr>
               <td>Center Name</td>
               <td>${data.arthiFormsavingdetails.center_name}</td>
               </tr>
               <tr>
               <td>Email Id</td>
               <td>${data.arthiFormsavingdetails.email_id}</td>
               </tr>
               <tr>
               <td>Age</td>
               <td>${data.arthiFormsavingdetails.age}</td>
               </tr>
               <tr>
               <td>Gender</td>
               <td>${data.arthiFormsavingdetails.gender}</td>
               </tr>
               <tr>
               <td>Test Date</td>
               <td>${testDate}</td>
               </tr>
               <tr>
               <td>Test Type</td>
               <td>${testtype}</td>
               </tr>
               <tr>
               <td>Test Name</td>
               <td>${testNames}</td>
               </tr>
               <tr>
               <td>Total Price</td>
               <td>${data.arthiFormsavingdetails.rate}</td>
               </tr>
             
              
              
               
            
  
               
               </table>
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
                   <h5 style="margin:0px">Please contact with us : </h5> <a href="mailto:care@mangohomz.com" style="color:darkblue;font-weight:700;">care@mangohomz.com</a> & <a href="https://www.mangohomz.com " target="_blank" style="color:darkblue;font-weight:700;">www.mangohomz.ai </a>
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
        const mailOptions = {
          from: "noreply@mangohomz.com",
          to: data.arthiFormsavingdetails.email_id,
          subject: "Successfully Aarthi Scans & Labs Booking Completed",
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
               <div style="height: 5px;width: 30%;background-color:darkblue;"></div>
             </div>
             <div style="padding:10px">
               <div>
                 Greetings <span style="font-weight:700">${data.arthiFormsavingdetails.first_name}</span>,
               </div>
               <div style="margin: 5px 0px">
               <p>We are glad that you have choose mangohomz.ai. Your booking at Aarthi Scan & Labs was confirmed,please find below the details.</p>
               </div>
               <table style="width:100%">
             <style>
             table, th, td {
             border:1px solid black;
             }
             td {
             text-align:left;
             padding:2px;
             }
             </style>
             <tr>
             <td>Aarthi scan Booking Id</td>
             <td>${confirmArthiBookingId}</td>
           </tr>
             <tr>
               <td>Full Name</td>
               <td>${data.arthiFormsavingdetails.first_name}</td>
             </tr>
             <tr>
               <td>Mobile Number</td>
               <td>+91-${data.arthiFormsavingdetails.mobile_no}</td>
             </tr>
             <tr>
             <td>Email Id</td>
             <td>${data.arthiFormsavingdetails.email_id}</td>
             </tr>
             <tr>
             <td>Booking appoinment Date</td>
             <td>${testDate}</td>
             </tr>
             <tr>
             <td>Booking appoinment Time</td>
             <td>${data.arthiFormsavingdetails.test_time}</td>
             </tr>
             <tr>
             <td>age</td>
             <td>${data.arthiFormsavingdetails.age}</td>
             </tr>
             <tr>
             <td>Gender</td>
             <td>${data.arthiFormsavingdetails.gender}</td>
             </tr>
            
             <tr>
             <td>City</td>
             <td>${data.arthiFormsavingdetails.city}</td>
             </tr>
            
             <tr>
             <td>Center Name</td>
             <td>${data.arthiFormsavingdetails.center_name}</td>
             </tr>
             <tr>
             <td>Test Type</td>
             <td>${testtype}</td>
             </tr>
             <tr>
             <td>Test Name</td>
             <td>${testNames}</td>
             </tr>
             <tr>
             <td>Total Price</td>
             <td>${data.arthiFormsavingdetails.rate}</td>
             </tr>
             </table>
             <div>
             <span >  kindly show this booking confirmation mail at the Aarthi Scan & Labs center.
             For any further query please call on this number 8929982655</span>
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
                   <h5 style="margin:0px">Please contact with us : </h5> <a href="mailto:care@mangohomz.com" style="color:darkblue;font-weight:700;">care@mangohomz.com</a> & <a href="https://www.mangohomz.com " target="_blank" style="color:darkblue;font-weight:700;">www.mangohomz.ai </a>
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
            // console.log("Succ", info.response);
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
      return { success: true, message };
    } else {
      let message = "Failed to submit Aarthi Booking Data.";
      return { success: false, message };
    }
  } catch (error) {
    console.error("Error while submitting Aarthi Booking Data:", error);
    throw error;
  }
}
async function getAarthilabDetails() {
  const rows = await db.query(
    `SELECT s_no, mh_aarthi_booking_id, city_name, aarthi_center_name, mobile_number, secondary_mobile_no, 
    customer_name, customer_age, gender,email_id,no_of_tests,total_price,date_format(booked_date,'%Y/%m/%d') as booked_date,date_format(test_date,'%Y/%m/%d') as test_date,status,date_format(created_date_time,'%Y/%m/%d') as booked_date FROM mh_aarthi_scan_booking WHERE 1 ORDER BY created_date_time DESC`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  let testdetails = "";

  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      testdetails = await helper.loadtesttypeFromDb(
        element.mh_aarthi_booking_id
      );

      index = index + 1;
      data.push({
        index: index,
        testdetails: testdetails,

        ...element,
      });
      // console.log("data",data);
    }
    // console.log("data123",data);
  }
  return data;
}

module.exports = {
  create,
  createEquipment,
  mht_bookings,
  bookingManzohomzOffer,
  getBookingDetails,
  submittravelDetails,
  loadbookingFoodManzohomzOffer,
  bookingMedicalManzohomzOffer,
  getBookingData,
  getBookingId,
  createFoodBooking,
  createFoodBookingLogs,
  getMHBookingData,
  getBookingGuestData,
  getBookingFoodData,
  guestTravelBookingData,
  getBookingMedicalData,
  guestBookingDataTableForCity,
  guestBookingDataTableForStaff,
  guestBookingDataTableForAdmin,
  saveEquipmentBookingDetails,
  getBookingData,
  travelManzohomzOffer,
  getCustomerMhBookingsData,
  customerEquipmentBkngDetails,
  getCustomerFoodBookingDetails,
  getCustomerTravelBookingDetails,
  getFoodBookingId,
  getTravelBookingId,
  getEquipmentBookingId,
  loadAllBookingDetails,
  guestBookingAccountData,
  guestFoodBookingAccountData,
  guestTravelBookingAccountData,
  guestMedicalBookingAccountData,
  getCustomerAccomodationBookingDetails,
  customerBkngDetails,
  customerFoodBkngDetails,
  createUserDetails,
  getaccomodationdetails,
  getTravelDashboardBookingData,
  getFoodDashboardBookingData,
  getMedicalDashboardBookingData,
  loadaccallbooking,
  loadacctravelbooking,
  loadaccfoodbooking,
  loadaccmedicalbooking,
  revenueBookingData,
  saveBookingDataBeforePay,
  SavingAarthilabsdata,
  getAarthilabDetails,
};
