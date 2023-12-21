const db = require("./db");
const helper = require("../helper");
const moment = require("moment");
moment.suppressDeprecationWarnings = true;

async function createMhOffers(data) {
  let offerStartDate = data.offer_start_date.split("/").reverse().join("-");
  let offerEndDate = data.offer_end_date.split("/").reverse().join("-");
   
  const result = await db.query(
     `INSERT IGNORE INTO mh_offers_table 
     (offer_start_date,offer_end_date, offer_price, offer_type, offer_from_whom, offer_description, offer_name) 
     VALUES 
     (?,?,?,?,?,?,?)`,
     [
        offerStartDate ?? "",
        offerEndDate ?? "",
       data.offer_price ?? "",
       data.offer_type ?? "",
       data.offer_from_whom ?? "",
       data.offer_description ?? "",
       data.offer_name ?? "",
      
     ]
   );
 
   let message = "Error while submitting Mh Offers data";
 
   if (result.affectedRows) {
     message = "Mh Offers data Submitted Successfully.";
   }
 
   return { message };
 }
 


module.exports = {
    createMhOffers,
    
   
  };