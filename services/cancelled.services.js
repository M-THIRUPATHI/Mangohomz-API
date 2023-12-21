const db = require("./db");
const helper = require("../helper");
const moment = require("moment");
const request = require('request');
moment.suppressDeprecationWarnings = true;
const nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  host: "mail.mangohomz.com",
  port: 465,
  auth: {
    user: "noreply@mangohomz.com",
    pass: "F0PZ}!]espo2",
  },
});

function sendCancelConfirmedSms(data) {
  request(`http://api.bulksmsgateway.in/sendmessage.php?user=Mangohomzz&password=Mangohomzz@123&mobile=${data.phone_no}&message=Cancellation Confirmation Dear Sachin Your request for Cancellation at Booking MANGOHOMZ with MH ID: ${data.booking_order_id} is Successful. You will receive the Refund within 10 Working Days, Thank you -Team MANGOHOMZ. Stay Well - Get Well&sender=MGHOMZ&type=3&template_id=1007025339815588411`, { json: true }, (err, response, data) => {
    if (err) {
      console.log(err);
    }
  });
}

async function cancellDetails(data) {
  // console.log("data",data);
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
  let cancelID = await helper.generateMaxCancelId();
  let cancel_id = cancelID.toString().padStart("6", 0);
  let confirmCancelId = `MHAC${year}${addCode}${month}${cancel_id}`;
  // console.log("cancelID",cancelID,confirmCancelId)





    let result = await db.query(
      `INSERT IGNORE INTO mh_accommodation_cancellation_table(booking_cancel_id,booking_order_id,account_id,txn_id,property_name,property_type,room_type,phone_no,check_in,check_out,no_of_days,room_price,discount,discount_price,mh_offer_name,mh_offer_price,gst_percentage,gst_amount,cgst_percentage,cgst_amount,sgst_percentage,sgst_amount,total_price,cancellation_percentage,cancellAmount,refundAmount,state_name,facilities,room_booked_count,guest_count,property_city_id,property_city_name,guest_name,near_hospital_name,email_id,property_email,partner_amount_on_cancel,mh_got_on_cancel,gst_status)VALUES
      (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        
        confirmCancelId ?? "",
        data.booking_order_id ?? "",
        data.account_id	?? "",
        data.hotel_txn_id ?? "",
        data.property_name ?? "",
        data.property_type ?? "",
        data.room_type ?? "",
        data.phone_no ?? "",
        data.check_in ?? "",
        data.check_out ?? "",
        data.no_of_days ?? "",
        data.room_price ?? "",
        data.discount ?? "" ,
        data.discount_price ??"" ,
        data.mh_offer_name ?? "",
        data.mh_offer_price ?? "",
        data.gst_percentage ?? "",
        data.gst_amount ?? "",
        data.cgst_percentage ?? "",
        data.cgst_amount ?? "",
        data.sgst_percentage ?? "",
        data.sgst_amount ?? "",
        data.total_price ?? "",
        data.cancellation_percentage ?? "",
        data.cancellAmount ?? "",
        data.payableAmount ?? "",
        data.state_name ?? "",
        data.facilities ?? "",
        data.room_booked_count ?? "",
        data.guest_count ?? "",
        data.property_city_id ?? "",
        data.property_city_name ?? "",
        data.guest_name ?? "",
        data.near_hospital_name ?? "",
        data.email_id ?? "",
        data.property_email ?? "",
        data.partner_amount_on_cancel.partnerAmount ?? "",
        data.partner_amount_on_cancel.mangohomzgotoncancel ?? "",
        data.gst_status ?? "",

      
           ]
    );
    let message = "Error in Cancellation Details";
  
    if (result.affectedRows) {
      message = "Booking Details cancelled successfully";
      const myArray = data.GuestDetails;
      myArray.forEach((element, index, array) => {
        console.log("element.x", element.sno);
        console.log("element.guesy", element.guest_name);
        console.log("element.guesy", element.guest_gender);
        console.log("index", index);
        console.log("array", array);
      });
  
      var newArraySNO = myArray.map((element) => element.sno);
  
      var nameListSNO = newArraySNO.splice(0, data.GuestDetails.length);
  
      var separateListSNO =
        '<ul class="no-bullets" style="list-style-type: none;margin: 0;padding: 0;">';
      nameListSNO.forEach(function (value) {
        separateListSNO += "<li>" + value + "</li>";
      });
      separateListSNO += "</ul>";
      // GUEST NAME
      var totalGuestName = myArray.map(
        (element) => element.guest_gender + element.guest_name
      );
  
      var listGuestName = totalGuestName.splice(0, data.GuestDetails.length);
  
      var separateListGuest =
        '<ul class="no-bullets" style="list-style-type: none;margin: 0;padding: 0;">';
      listGuestName.forEach(function (value) {
        separateListGuest += "<li>" + value + "</li>";
      });
      separateListGuest += "</ul>";
    //  sendCancelConfirmedSms(data);
      var mailOptions = {
        from: "noreply@mangohomz.com",
        to:data.email_id,
       // bcc: 'debasis@mangohomz.com',
        // bcc: 'forward@mangohomz.com',
        subject: `Cancellation / ${data.property_name}/ ${confirmCancelId} `,
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
                    Greetings, <span style="font-weight:700">${data.guest_name}</span>,
                  </div>
                  <div style="margin: 5px 0px">
                  <p> Your Cancellation request for MANGOHOMZ Booking ID : ${data.booking_order_id} is Successful.
                  </br> The Cancellation Id:<b> ${confirmCancelId}</b>.
                  </br> You will receive the Refund within 10  Bank Working Days.
                  </br>
                  Thank you </br>Team MANGOHOMZ. 
                  </br>Stay Well | Get Well
                   </p>
                  </div>
                  <div style="border:2px solid grey; background-color:white">
                    <div>
                      <div style="margin:10px 0 20px 18px">
                        <div style="color:white">Thank you for booking with us.</div>
                        <div style="color:white">
                          <b>Your Cancallation at ${
                            data.property_name
                          } is confirmed.</b>
                        </div>
                      </div>
  
  
                      <div style="background-color:f3f3f3;padding:5px;margin:auto;width:750px;border-radius:10px;margin-bottom:15px">
                        <ul>
                      
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
                        <td> Cancellation ID :<b> 
                        ${confirmCancelId}</b></td>
                        <td>Cancel Date : <b> ${moment(new Date()).format(
                          "DD-MM-YYYY"
                        )} </b></td>
                      </tr>
                      <tr>
                        <td>Customer Name :   <b> 
                      
                                      ${ data.guest_name} </b></td>
                        <td v-if="
                        ${"data.gstin_no"} != ''"> 
                        Customer City/State :<b> 
                       ${data.city}
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
                      <td> Room Type :<b> 
                      ${data.room_type}</b></td>
                      </tr>
                   
                      <tr>
                      <td> Check In Date/Time :<b> 
                      ${data.check_in}/${"12:00PM"}</b></td>
                      <td>  Check Out Date/Time :
                      <b>${data.check_out}/${"11:00AM"} </b></td>
                      </tr>
                      <tr>
                      <td>Total No. Of Room:<b> 
                      ${data.room_booked_count}</b></td>
                      <td>Number Of Night:
                      <b>${data.no_of_days}</b></td>
                      </tr>
                     
                      <tr>
                    
                      <td>Alternate Number :
                      <b>${data.phone_no}</b></td>
                      <td> Room Amenities :<b> 
                      ${data.facilities}</b></td>
                      </tr>
                    
                     
                      </table>
                    </div>
                </div>
  
                <div style="background-color:f3f3f3;padding:5px;margin:auto;width:750px;border-radius:10px;margin-bottom:15px;color:black;">
                <div style="font-size:15px;font-family:verdana;"><b>Accommodation Cancel Guests Details</b></div>
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
             
              
                <div style="display:flex;width:100%;">
                <div style="width:60%">
                  <div class="text-subtitle" style="
              font-size: 12px;
              text-align:left;
              margin-left:3px;
              padding-top:5px;
            ">
          Booking Price
           
                    :
                  </div>
                </div>
  
                <div class="text-subtitle" style="
              font-size: 12px;
              text-align:right;
                margin-right:3px;
              padding-top:5px;width:40%
            ">
                  (-) ₹${data.total_price}
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
              ${"data.usedOffer_price"} !=
                ''
              "
              >
              Cancellation Charges  
                    </div>
                  </div>
                  <div class="text-subtitle"
                    style="font-size: 12px; text-align:right;
                    margin-right:3px;padding-top:5px;width:40%" v-if="
                    ${"data.usedOffer_price"} !=
                      ''
                    ">
                    ₹${data.cancellAmount}
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
                     Net Refund Amount
                    </div>
                  </div>
                  <div class="text-subtitle"
                    style="font-size: 12px; text-align:right;
                    margin-right:3px;padding-top:5px;width:40%">
                    <strong>
                    ₹${data.payableAmount}
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

      var mailOptions1 = {
        from: "noreply@mangohomz.com",
        to:data.property_email,
        // bcc: 'forward@mangohomz.com',
        subject: `Cancellation / ${data.property_name}/ ${confirmCancelId} `,
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
                ${data.guest_name}</b></span>,  has Cancelled</br>. The MANGOHOMZ Booking ID : ${data.booking_order_id} Please find below the cancellation details</p>
                </div>
            
                <div style="background-color:f3f3f3;padding:5px;margin:auto;width:750px;border-radius:10px;margin-bottom:15px;color:black;">
                <div style="font-size:15px;font-family:verdana;"><b>Accommodation Cancel Details</b></div>



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
                  ${data.booking_order_id}</b></td>
                  <td>Booked Date : <b> ${moment(new Date()).format(
                    "DD-MM-YYYY"
                  )} </b></td>
                </tr>
                <tr>
                <td> Cancel ID :<b> 
                ${confirmCancelId}</b></td>
                <td>Cancel Date : <b> ${moment(new Date()).format(
                  "DD-MM-YYYY"
                )} </b></td>
              </tr>
              <tr>
              <td> Check In Date/Time :<b> 
              ${data.check_in}/${"12:00PM"}</b></td>
              <td>  Check Out Date/Time :
              <b>${data.check_out}/${"11:00AM"} </b></td>
              </tr>
                <tr>
                  <td>Customer Name :   <b> 
                  ${ data.guest_name}</b></td>
                  <td>Property Name :   <b> 
                  ${ data.property_name}</b></td>
                 
                </tr>
                <tr>
                <td>Number Of Night :   <b> 
                ${ data.no_of_days}</b></td>
                <td>Number Of Room :   <b> 
                ${ data.room_booked_count}</b></td>
               
              </tr>
                </table>
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
            font-size: 15px;
            text-align:left;
            margin-left:3px;
            padding-top:5px;
          ">
          Net Settle Amount
                </div>
              </div>
              <div class="text-subtitle"
                style="font-size: 12px; text-align:right;
                margin-right:3px;padding-top:5px;width:40%">
                <strong>
                ₹${data.partner_amount_on_cancel.partnerAmount}
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


              <li><b>  If the Booking is less than 2 days then the Accommodation partner will get 50% of the Check-in Day amount along with proportionate GST</b></li>
              
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
    }
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
    return { message };
  }
  async function cancelledfoodbooking(data) {
    let result = await db.query(
      `INSERT IGNORE INTO mh_food_cancellation_table(food_booking_orderid,food_partner_name,food_partner_sub_name,food_booking_type,mobile_number,food_booking_date,total_quantity_booked,food_charges,discount,discount_price,mh_offer_coupon,mh_offer_price,gst_percentage,gst_on_base_price,final_price_amount,cancellation_percentage,cancellationFood,foodrefundamount)VALUES
      (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        data.food_booking_orderid ?? "",
        data.food_partner_name ?? "",
        data.food_partner_sub_name ?? "",
        data.food_booking_type ?? "",
        data.mobile_number ?? "",
        data.food_booking_date ?? "",
        data.total_quantity_booked ?? "",
        data.food_charges ?? "",
        data.discount ?? "" ,
        data.discount_price ??"" ,
        data.mh_offer_coupon ?? "",
        data.mh_offer_price ?? "",
        data.gst_percentage ?? "",
        data.gst_on_base_price ?? "",
        data.final_price_amount ?? "",
        data.cancellation_percentage ?? "",
        data.cancellationFood ?? "",
        data.foodrefundamount ?? "",
      ]
    );
    let message = "Error in Cancellation Details";
  
    if (result.affectedRows) {
      message = "Food Booking Details cancelled successfully";
    }
    return { message };
  }
  async function cancelledequipmentbooking(data) {
    let result = await db.query(
      `INSERT IGNORE INTO mh_equipment_cancellation_table(booking_order_id,medical_booking_orderid,equipment_partner_name,equipment_partner_sub_name,eqp_booking_type,mobile_number,eqp_booking_date,medical_item_count,medical_charges,mh_offer_coupon,mh_offer_price,gst_percentage,cgst_percentage,cgst_amount,sgst_percentage,sgst_amount,final_price_amount,cancellation_percentage,cancellationequipment,equipmentrefundamount)VALUES
      (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        data.booking_order_id ?? "",
        data.medical_booking_orderid ?? "",
        data.equipment_partner_name ?? "",
        data.equipment_partner_sub_name ?? "",
        data.eqp_booking_type ?? "",
        data.mobile_number ?? "",
        data.eqp_booking_date ?? "",
        data.medical_item_count ?? "",
        data.medical_charges ?? "",
        data.mh_offer_coupon ?? "",
        data.mh_offer_price ?? "",
        data.gst_percentage ?? "",
        data.cgst_percentage ?? "",
        data.cgst_amount ?? "",
        data.sgst_percentage ?? "",
        data.sgst_amount ?? "",
        data.final_price_amount ?? "",
        data.cancellation_percentage ?? "",
        data.cancellationequipment ?? "",
        data.equipmentrefundamount ?? "",
      ]
    );
    let message = "Error in Cancellation Details";
  
    if (result.affectedRows) {
      message = "Equipment Booking Details cancelled successfully";
    }
    return { message };
  }
  async function cancelledtravelbooking(data) {
    let result = await db.query(
      `INSERT IGNORE INTO mh_travel_cancellation_table(booking_order_id,travel_booking_orderid,travel_name,transport_sub_name,booking_origin,booking_destination,mobile_number,booked_date,booking_time,travel_charges,mh_offer_coupon,mh_offer_price,gst_percentage,cgst_percentage,cgst_amount,sgst_percentage,sgst_amount,payable_amount,cancellation_percentage,cancellationtravel,travelrefundamount)VALUES
      (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        data.booking_order_id ?? "",
        data.travel_booking_orderid ?? "",
        data.travel_name ?? "",
        data.transport_sub_name ?? "",
        data.booking_origin ?? "",
        data.booking_destination ?? "",
        data.mobile_number ?? "",
        data.booked_date ?? "",
        data.booking_time ?? "",
        data.travel_charges ?? "",
        data.mh_offer_coupon ?? "",
        data.mh_offer_price ?? "",
        data.gst_percentage ?? "",
        data.cgst_percentage ?? "",
        data.cgst_amount ?? "",
        data.sgst_percentage ?? "",
        data.sgst_amount ?? "",
        data.payable_amount ?? "",
        data.cancellation_percentage ?? "",
        data.cancellationtravel ?? "",
        data.travelrefundamount ?? "",
      ]
    );
    let message = "Error in Cancellation Details";
  
    if (result.affectedRows) {
      message = "Travel Booking Details cancelled successfully";
    }
    return { message };
  }
  async function AccomodationStatus(booking_order_id, data) {
    var Accommodationstatus = data.booking_status == true ? "booked" : "Cancelled";
    const result = await db.query(
      `UPDATE mh_bookings_table SET  booking_status=? WHERE booking_order_id='${booking_order_id}' `,
    [Accommodationstatus]
    );
    const result1 = await db.query(
      `UPDATE mh_food_booking_table SET  booking_status=? WHERE booking_order_id='${booking_order_id}' `,
    [Accommodationstatus]
    );
    const result2 = await db.query(
      `UPDATE mh_travel_booking_table SET  booking_status=? WHERE booking_order_id='${booking_order_id}' `,
    [Accommodationstatus]
    );
    const result3 = await db.query(
      `UPDATE mh_equipment_booking_table SET  booking_status=? WHERE booking_order_id='${booking_order_id}' `,
    [Accommodationstatus]
    );
    let message = "Error while changing the accommodation  status Data";
  
    if (result.affectedRows && result1.affectedRows && result2.affectedRows && result3.affectedRows) {
      message = "Accommodation Status Changed Successfully";
    }
  
    return { message };
  }
  async function FoodStatus(food_booking_orderid, data) {
    var foodstatus = data.booking_status == true ? "booked" : "Cancelled";
    const result = await db.query(
      `UPDATE mh_food_booking_table SET  booking_status=? WHERE food_booking_orderid='${food_booking_orderid}' `,
    [foodstatus]
    );
    let message = "Error while changing the food status Data";
  
    if (result.affectedRows) {
      message = "food Status Changed Successfully";
    }
  
    return { message };
  }
  async function TravelStatus(travel_booking_orderid, data) {
    var travelstatus = data.booking_status == true ? "booked" : "Cancelled";
    const result = await db.query(
      `UPDATE mh_travel_booking_table SET  booking_status=? WHERE travel_booking_orderid='${travel_booking_orderid}' `,
    [travelstatus]
    );
    let message = "Error while changing the Travel status Data";
  
    if (result.affectedRows) {
      message = "Travel Status Changed Successfully";
    }
  
    return { message };
  }
  async function EquipmentStatus(medical_booking_orderid, data) {
    var travelstatus = data.booking_status == true ? "booked" : "Cancelled";
    const result = await db.query(
      `UPDATE mh_equipment_booking_table SET  booking_status=? WHERE medical_booking_orderid='${medical_booking_orderid}' `,
    [travelstatus]
    );
    let message = "Error while changing the medical status Data";
  
    if (result.affectedRows) {
      message = "Equipment Status Changed Successfully";
    }
  
    return { message };
  }
  async function loadAccomodationDetails(mh_booking_id) {

    const rows = await db.query(
      `SELECT s_no,account_id, booking_id, booking_order_id,reference_id,invoice_number,partner_id, partner_sub_id, hotel_txn_id, room_txn_id, property_name, property_type, room_type, near_hospital_id, near_hospital_name, check_in, check_out,checkIn_time,checkOut_time, guest_count, no_of_days, room_price, discount, discount_price, price_after_discount, mh_offer_price, mh_offer_name, gst_percentage, gst_amount,cgst_percentage, cgst_amount,sgst_percentage, sgst_amount, total_price, country_code, country_name,phone_no,primary_no,alternate_email_id,address_line_1,address_line_2,state_name,city,property_city_id,property_city_name,email_id,alternate_no,pincode,gstin_no,booking_status,facilities,room_booked_count,DATE_FORMAT(inserted_date_time,'%d/%m/%Y') as booked_date,property_email,mh_service_fee,gst_status FROM mh_bookings_table WHERE booking_order_id='${mh_booking_id}' && booking_status='Booked' ORDER BY inserted_date_time DESC;`
    );
    const result = helper.emptyOrRows(rows);
    let data = [];
    var index = 0;
    let GuestDetails = "";
    for (const key in result) {
      if (Object.hasOwnProperty.call(result, key)) {
        const element = result[key];
        GuestDetails = await helper.getbookingDetails(element.booking_order_id);
       // Gststate = await helper.getcancelgststate(element.gstin_no);
        index = index + 1;
        data.push({
          s_no: index,
          GuestDetails: GuestDetails,
          //gststate: Gststate,
          ...element,
        });
      }
    }
    return {data};
  }
  async function loadTravelDetails(mh_booking_id) {

    const rows = await db.query( `SELECT account_id, booking_id, booking_order_id, travel_booking_id, travel_booking_orderid, invoice_number,travel_reference_id,hotel_property_name,property_city_name, property_city_id, near_hospital_name, check_in, check_out, guest_count, no_of_days, booked_date, booking_origin, booking_destination, booking_time, travel_charges, discount, discount_price, base_price, mh_offer_price, mh_offer_coupon, price_after_discount, gst_percentage, gst_on_base_price,cgst_percentage,cgst_amount,sgst_percentage,sgst_amount, payable_amount, country_code, country_name, mobile_number, gst_number, date_format(updated_datetime,'%d-%m-%y') as update_datetime, agent_id, travel_name, transport_sub_id, transport_sub_name,whatsapp_number,email_id,booking_status FROM mh_travel_booking_table WHERE booking_order_id = '${mh_booking_id}' &&booking_status='Booked' ORDER BY updated_datetime DESC`);
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
    return {data};
  }
  async function loadMedicalDetails(mh_booking_id) {

    const rows = await db.query(`SELECT account_id, booking_id, booking_order_id, medical_booking_id, medical_booking_orderid, booking_city, booking_city_id, hotel_property_name,equipment_name, equipment_sub_name, near_hospital_name, check_in, check_out, guest_count, no_of_days, eqp_booking_date, eqp_booking_type, total_qty_booked, medical_charges, discount, discount_price, base_price, mh_offer_price, mh_offer_coupon, price_after_discount, gst_percentage, gst_on_base_price,cgst_percentage,cgst_amount,sgst_percentage,sgst_amount, final_price_amount, country_name, country_code, mobile_number, gstin_no, date_format(updated_time,'%d-%m-%y') as updated_time FROM mh_equipment_booking_table WHERE booking_status='Booked' && booking_order_id = '${mh_booking_id}' ORDER BY updated_time DESC`);
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
    return {data};
  }

  async function loadFoodDetails(mh_booking_id) {

    const rows = await db.query(`SELECT account_id, booking_id, booking_order_id, food_booking_id, food_booking_orderid, invoice_number, food_reference_id, booking_city, booking_city_id, hotel_property_name, near_hospital_name, near_hospital_id, check_in, check_out, guest_count, no_of_days, restaurant_fssai_no, foodPartner_name, food_partner_id, foodPartner_sub_name, food_partner_sub_id, food_booking_date, food_booking_type, food_booking_time, total_qty_booked, total_item_qty, food_charges, discount_type, discount, discount_price, base_price, mh_offer_price, mh_offer_coupon, price_after_discount, gst_percentage, gst_on_base_price, cgst_percentage, cgst_amount, sgst_percentage, sgst_amount, final_price_amount, country_name, country_code, mobile_number, whatsapp_number, email_id, gstin_no, booking_status, updated_time FROM mh_food_booking_table WHERE booking_status='Booked' && booking_order_id = '${mh_booking_id}' ORDER BY updated_time DESC`);
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
    return {data};
  }


  async function getCancelId(booking_order_id) {
    const rows = await db.query(
      `SELECT  booking_cancel_id,booking_order_id, property_name, property_type, room_type, phone_no, check_in, check_out, no_of_days, room_price, discount, discount_price, mh_offer_name, mh_offer_price, gst_percentage, gst_amount, cgst_percentage, cgst_amount, sgst_percentage, sgst_amount, total_price, cancellation_percentage, cancellAmount, refundAmount,state_name,facilities,booking_cancel_id,room_booked_count,guest_name,partner_amount_on_cancel,mh_got_on_cancel FROM mh_accommodation_cancellation_table WHERE booking_order_id='${booking_order_id}'`
    );
    //console.log(rows)
    const result = helper.emptyOrRows(rows);
    let data = [];
    let index = 0;
    let GuestDetails = "";
  //  let Gststate = "";
    for (const key in result) {
      if (Object.hasOwnProperty.call(result, key)) {
        const element = result[key];
        GuestDetails = await helper.getbookingDetails(element.booking_order_id);
       // Gststate = await helper.getcancelgststate(element.gstin_no);
        index = index + 1;
        data.push({
          s_no: index,
          GuestDetails: GuestDetails,
          //gststate: Gststate,
          ...element,
        });
      }
    }
    return {data}
      ;
  }


  async function gettingTravelCancelId(booking_order_id) {
    const rows = await db.query(
      `SELECT travel_booking_orderid, travel_name, transport_sub_name, booking_origin, booking_destination, mobile_number, booked_date, booking_time, travel_charges, mh_offer_coupon, mh_offer_price, gst_percentage, cgst_percentage, cgst_amount, sgst_percentage, sgst_amount, payable_amount, cancellation_percentage, cancellationtravel, travelrefundamount,date_format(created_datetime,'%Y/%m/%d') as inserted_date FROM mh_travel_cancellation_table WHERE booking_order_id='${booking_order_id}'`
    );
   // console.log(rows)
    const result = helper.emptyOrRows(rows);
    let data = [];
    let index = 0;
  
    for (const key in result) {
      if (Object.hasOwnProperty.call(result, key)) {
        const element = result[key];
      
        index = index + 1;
        data.push({
          s_no: index,
        
          ...element,
        });
      }
    }
    return {data}
      ;
  }
  async function gettingIndividualTravelCancelId(travel_booking_orderid) {
    const rows = await db.query(
      `SELECT booking_order_id,travel_booking_orderid, travel_name, transport_sub_name, booking_origin, booking_destination, mobile_number, booked_date, booking_time, travel_charges, mh_offer_coupon, mh_offer_price, gst_percentage, cgst_percentage, cgst_amount, sgst_percentage, sgst_amount, payable_amount, cancellation_percentage, cancellationtravel, travelrefundamount ,date_format(created_datetime,'%Y/%m/%d') as inserted_date FROM mh_travel_cancellation_table WHERE travel_booking_orderid='${travel_booking_orderid}'`
    );
   // console.log(rows)
    const result = helper.emptyOrRows(rows);
    let data = [];
    let index = 0;
  
    for (const key in result) {
      if (Object.hasOwnProperty.call(result, key)) {
        const element = result[key];
      
        index = index + 1;
        data.push({
          s_no: index,
        
          ...element,
        });
      }
    }
    return {data}
      ;
  }

  async function gettingIndividualMedicalCancelId(medical_booking_orderid) {
    const rows = await db.query(
      `SELECT booking_order_id, medical_booking_orderid, equipment_partner_name, equipment_partner_sub_name, eqp_booking_type, mobile_number, eqp_booking_date, medical_item_count, medical_charges, discount, discount_price, mh_offer_coupon, mh_offer_price, gst_percentage, gst_on_base_price, cgst_percentage, cgst_amount, sgst_percentage, sgst_amount, final_price_amount, cancellation_percentage, cancellationequipment, equipmentrefundamount,date_format(created_datetime,'%Y/%m/%d') as inserted_date FROM mh_equipment_cancellation_table WHERE medical_booking_orderid='${medical_booking_orderid}'`
    );
   // console.log(rows)
    const result = helper.emptyOrRows(rows);
    let data = [];
    let index = 0;
  
    for (const key in result) {
      if (Object.hasOwnProperty.call(result, key)) {
        const element = result[key];
      
        index = index + 1;
        data.push({
          s_no: index,
        
          ...element,
        });
      }
    }
    return {data}
      ;
  }
  async function gettingMedicalCancelId(booking_order_id) {
    const rows = await db.query(
      `SELECT booking_order_id, medical_booking_orderid, equipment_partner_name, equipment_partner_sub_name, eqp_booking_type, mobile_number, eqp_booking_date, medical_item_count, medical_charges, discount, discount_price, mh_offer_coupon, mh_offer_price, gst_percentage, gst_on_base_price, cgst_percentage, cgst_amount, sgst_percentage, sgst_amount, final_price_amount, cancellation_percentage, cancellationequipment, equipmentrefundamount  FROM mh_equipment_cancellation_table WHERE booking_order_id='${booking_order_id}'`
    );
   // console.log(rows)
    const result = helper.emptyOrRows(rows);
    let data = [];
    let index = 0;
  
    for (const key in result) {
      if (Object.hasOwnProperty.call(result, key)) {
        const element = result[key];
      
        index = index + 1;
        data.push({
          s_no: index,
        
          ...element,
        });
      }
    }
    return {data}
      ;
  }
  async function getAccommodationCancellationDetails() {
    const rows = await db.query(
      `SELECT s_no, txn_id, booking_cancel_id, booking_order_id, account_id, property_name, property_type, room_type, phone_no, date_format(check_in, '%Y/%m-%d') as check_in, date_format(check_out, '%Y/%m/%d') as  check_out, no_of_days, room_price, discount, discount_price, mh_offer_name, mh_offer_price, gst_percentage, gst_amount, cgst_percentage, cgst_amount, sgst_percentage, sgst_amount, total_price, cancellation_percentage, cancellAmount, refundAmount, state_name, facilities, room_booked_count, guest_count,  date_format(created_datetime, '%Y/%m/%d') as created_datetime1, property_city_id, property_city_name, guest_name,partner_amount_on_cancel,mh_got_on_cancel  FROM mh_accommodation_cancellation_table WHERE 1 ORDER BY created_datetime DESC`
    );
    const result = helper.emptyOrRows(rows);
    let data = [];
    let index = 0;
    for (const key in result) {
      if (Object.hasOwnProperty.call(result, key)) {
        const element = result[key];
        index = index + 1;
        data.push({
          index:index,
          ...element,
        });
      }
    }
    return data;
  }
  async function getTravelCancellationDetails() {
    const rows = await db.query(
     ` SELECT s_no, booking_order_id, travel_booking_orderid, travel_name, transport_sub_name, booking_origin, booking_destination, mobile_number, booked_date, booking_time, travel_charges, mh_offer_coupon, mh_offer_price, gst_percentage, cgst_percentage, cgst_amount, sgst_percentage, sgst_amount, payable_amount, cancellation_percentage, cancellationtravel, travelrefundamount, created_datetime FROM mh_travel_cancellation_table WHERE 1`
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
    console.log(data)
    return data;
  }
  async function getFoodCancellationDetails() {
    const rows = await db.query(
      `SELECT s_no, booking_order_id, food_booking_orderid, food_partner_name, food_partner_sub_name, food_booking_type, mobile_number, food_booking_date, total_quantity_booked, food_charges, discount, discount_price, mh_offer_coupon, mh_offer_price, gst_percentage, gst_on_base_price, final_price_amount, cancellation_percentage, cancellationFood, foodrefundamount, updated_datetime, created_datetime FROM mh_food_cancellation_table WHERE 1`
    );
    const result = helper.emptyOrRows(rows);
    let data = [];
    let index = 0;
    for (const key in result) {
      if (Object.hasOwnProperty.call(result, key)) {
        const element = result[key];
        index = index + 1;
        data.push({
          ...element,
        });
      }
    }
    return data;
  }
  async function getMedicalCancellationDetails() {
    const rows = await db.query(
      `SELECT s_no, booking_order_id, medical_booking_orderid, equipment_partner_name, equipment_partner_sub_name, eqp_booking_type, mobile_number, eqp_booking_date, medical_item_count, medical_charges, discount, discount_price, mh_offer_coupon, mh_offer_price, gst_percentage, gst_on_base_price, cgst_percentage, cgst_amount, sgst_percentage, sgst_amount, final_price_amount, cancellation_percentage, cancellationequipment, equipmentrefundamount, created_datetime FROM mh_equipment_cancellation_table WHERE 1`
    );
    const result = helper.emptyOrRows(rows);
    let data = [];
    let index = 0;
    for (const key in result) {
      if (Object.hasOwnProperty.call(result, key)) {
        const element = result[key];
        index = index + 1;
        data.push({
          ...element,
        });
      }
    }
    return data;
  }
  async function getPartnerAccCancellation(account_id) {
    const rows = await db.query(
      `SELECT s_no, txn_id, booking_order_id, account_id, partner_id, property_name, property_type, room_type, phone_no, check_in, check_out, no_of_days, room_price, discount, discount_price, mh_offer_name, mh_offer_price, gst_percentage, gst_amount, cgst_percentage, cgst_amount, sgst_percentage, sgst_amount, total_price, cancellation_percentage, cancellAmount, refundAmount, state_name, facilities,partner_amount_on_cancel FROM mh_accommodation_cancellation_table WHERE account_id='${account_id}'`
    );
    const result = helper.emptyOrRows(rows);
    let data = [];
    let index = 0;
    for (const key in result) {
      if (Object.hasOwnProperty.call(result, key)) {
        const element = result[key];
        index = index + 1;
        data.push({
          ...element,
        });
      }
    }
    return data;
  }
module.exports = {
    cancellDetails,
    cancelledfoodbooking,
    cancelledequipmentbooking,
    cancelledtravelbooking,
    AccomodationStatus,
    FoodStatus,
    TravelStatus,
    EquipmentStatus,
    loadAccomodationDetails,
    loadTravelDetails,
    loadMedicalDetails,
    loadFoodDetails,
    getCancelId,
    gettingTravelCancelId,
    gettingMedicalCancelId,
    gettingIndividualTravelCancelId,
    gettingIndividualMedicalCancelId,
    getAccommodationCancellationDetails,
    getTravelCancellationDetails,
    getFoodCancellationDetails,
    getMedicalCancellationDetails,
    getPartnerAccCancellation,
}