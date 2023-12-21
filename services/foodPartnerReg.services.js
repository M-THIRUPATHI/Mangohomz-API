const db = require("./db");
const helper = require("../helper");
const { query } = require("express");

async function getMultiple(params) {
  //   const offset = helper.getOffset(page, config.listPerPage);

  const rows = await db.query(
    `SELECT agent_id,agent_sub_id,agent_name,agent_sub_name,phone, fax, email_id,description, building_no, street, land_mark, city, country, state, pin_code, concat(building_no,",",street,"," ,state,"," ,city,"," ,country) as address,concat(state,"," ,city) as location,pan, aadhar,gst_registration, gstin,bankAccountNo, bankName, branchName, ifsc, accept,pan_card_file,addhaar_no,gst_tin_loc,mh_agreement_loc,mb_certificate_loc,food_safety_certificate,file_upload5,food_tax,state_id,city_id,status,remarks,alternate_no,fassai_no FROM mh_food_master WHERE account_id = '${params}'`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  var index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      var food_count = "";
      if (element.agent_id) {
        food_count = await helper.getCountOfFoodId(element.agent_id);
        index = index + 1;
      }
      data.push({
        food_count: food_count,
        index: index,
        ...element,
      });
    }
  }
  return {
    data,
  };
}
async function getFoodPartnersForAdmin() {
  const rows = await db.query(
    `SELECT agent_id,agent_sub_id,agent_name,agent_sub_name,phone, fax, email_id,description, building_no, street, land_mark, city, country, state, pin_code,concat(building_no,",",street,"," ,state,"," ,city,"," ,country) as address, concat(state,"," ,city) as location, pan, aadhar,gst_registration, gstin, bankAccountNo, bankName, branchName, ifsc, accept,pan_card_file,addhaar_no,gst_tin_loc,mh_agreement_loc,mb_certificate_loc,food_safety_certificate,file_upload5,food_tax,state_id,city_id,status,remarks FROM mh_food_master WHERE status='verified'`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  var index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      var food_count = "";
      if (element.agent_id) {
        food_count = await helper.getCountOfFoodId(element.agent_id);
      }
      index = index + 1;
      data.push({
        food_count: food_count,
        index: index,
        ...element,
      });
    }
  }
  return {
    data,
  };
}

async function getExistingUserFoodPartner(params) {
  //   const offset = helper.getOffset(page, config.listPerPage);
  //  let agentSubId = await helper.generateFoodSUBID();
  const rows = await db.query(
    `SELECT agent_id,agent_sub_id, agent_name,agent_sub_name,phone, fax, email_id,description, building_no, street, land_mark, city, country, state, pin_code,concat(building_no,",",street,"," ,state,"," ,city,"," ,country) as address,concat(state,"," ,city) as location,pan, aadhar,gst_registration, gstin,bankAccountNo, bankName, branchName, ifsc, accept,pan_card_file,addhaar_no,gst_tin_loc,mh_agreement_loc,mb_certificate_loc,food_safety_certificate,file_upload5,food_tax,state_id,city_id, status,remarks FROM mh_food_master WHERE agent_id='${params}'`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      var food_count = "";
      if (element.agent_id) {
        food_count = await helper.getCountOfFoodId(element.agent_id);
      }
      data.push({
        food_count: food_count,
        ...element,
      });
    }
  }
  return {
    data,
  };
}

async function getFoodDataOnStatus(params, params1) {
  const rows = await db.query(
    `SELECT agent_id,agent_sub_id,agent_name,phone, fax, email_id,description, building_no, street, land_mark, city, country, state, pin_code,concat(building_no,",",street,"," ,state,"," ,city,"," ,country) as address, concat(state,"," ,city) as location,pan, aadhar,gst_registration, gstin,bankAccountNo, bankName, branchName, ifsc, accept,pan_card_file,addhaar_no,gst_tin_loc,mh_agreement_loc,mb_certificate_loc,status,file_upload5,food_tax,remarks FROM mh_food_master WHERE status='${params}' AND account_id = '${params1}' GROUP BY agent_id`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      var food_count = "";
      if (element.agent_id) {
        food_count = await helper.getCountOfFoodId(element.agent_id);
      }
      data.push({
        food_count: food_count,
        ...element,
      });
    }
  }

  return {
    data,
  };
}
async function getStatusCount() {
  const rows = await db.query(
    `SELECT (SELECT COUNT(*) FROM mh_food_master WHERE status='Pending') AS pcount,(SELECT COUNT(*) FROM mh_food_master WHERE status='Verified') AS vcount,(SELECT COUNT(*) FROM mh_food_master WHERE status='Approved') AS acount, (SELECT COUNT(*) FROM mh_food_master WHERE status='Rejected') AS rcount FROM mh_food_master GROUP BY status`
  );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}

async function getMultipleFoodDetails() {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT agent_name,agent_sub_name, company_name, individual_name, phone, fax, email_id,description, building_no, street, land_mark, city, country, state, pin_code,concat(building_no,",",street,"," ,state,"," ,city,"," ,country) as address, concat(state,"," ,city) as location,pan, aadhar, gstin,fssai_no, bankAccountNo, bankName, branchName, ifsc, accept,remarks FROM mh_food_master WHERE 1`
  );
  const data = helper.emptyOrRows(rows);
  //   const meta = { page };

  return {
    data,
  };
}
async function getSingleParentTypeDetail(id) {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT  agent_id,property_name,phone,email,registration_number FROM mh_food_master WHERE parent_type_id=?`,
    [id]
  );
  const data = helper.emptyOrRows(rows);
  //   const meta = { page };
  return data;
}

// get food details

// async function getFoodDetails(account_id, agent_id, agent_sub_id,txn_id) {
//   const rows = await db.query(
//     `SELECT item_txn_id,txn_id,agent_id,agent_sub_id,foodPartner_name,foodPartner_sub_name,kitchen_name, kitchen_type,item_name,items_available_from,items_available_to,food_type_id,food_items_name,price,units,food_image,fssai_no,partner_status,select_offer,special_offer,enter_amount,date_format(updated_datetime,"%d-%m-%Y") as updated_datetime,status,city_id,city,concat(city_id,"," ,city) as location FROM mh_foodpartner_details WHERE account_id = '${account_id}' AND agent_id=${agent_id} AND agent_sub_id=${agent_sub_id};`
//   );
//   const result = helper.emptyOrRows(rows);
//   let data = [];
//   var index = 0;
//   for (const key in result) {
//     if (Object.hasOwnProperty.call(result, key)) {
//       const element = result[key];

//       index = index + 1;
//       data.push({
//         index: index,
//         ...element,
//       });
//     }
//   }
//   return {
//     data,
//   };
// }
async function getFoodDetails( agent_id, agent_sub_id,txn_id) {
  const rows = await db.query(
    `SELECT item_txn_id,txn_id,agent_id,agent_sub_id,foodPartner_name,foodPartner_sub_name,account_id,kitchen_name, kitchen_type,item_name,items_available_from,items_available_to,food_type_id,food_items_name,price,units,food_image,fssai_no,partner_status,select_offer,special_offer,enter_amount,date_format(updated_datetime,"%d-%m-%Y") as updated_datetime,status,city_id,city,concat(city_id,"," ,city) as location FROM mh_foodpartner_details WHERE  agent_id='${agent_id}' AND agent_sub_id='${agent_sub_id}' AND txn_id='${txn_id}';`
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
    // console.log("getfooddetails",data);
  }
  return {
    data,
  };
}
async function getFoodDetailsForAdmin(agent_id, agent_sub_id) {
  const rows = await db.query(
    `SELECT item_txn_id, txn_id, agent_id, agent_sub_id, foodPartner_name, foodPartner_sub_name, account_id, kitchen_name, kitchen_type, item_name, items_available_from, items_available_to, food_type_id, food_items_name, price, units, food_image, fssai_no, status, partner_status, select_offer, special_offer, enter_amount,date_format(updated_datetime,"%d-%m-%Y") as updated_datetime,partner_status FROM mh_foodpartner_details WHERE agent_id=${agent_id} AND agent_sub_id=${agent_sub_id};`
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
  return {
    data,
  };
}
async function getBookingFoodTypes(txn_id,agent_id, agent_sub_id, account_id) {
  const rows = await db.query(
    `SELECT item_txn_id, txn_id, agent_id, agent_sub_id, foodPartner_name, foodPartner_sub_name, account_id, kitchen_name, kitchen_type, item_name, items_available_from, items_available_to, food_type_id, food_items_name, price, units, food_image, fssai_no, status, partner_status, select_offer, special_offer, enter_amount,date_format(updated_datetime,"%d-%m-%Y") as updated_datetime,partner_status FROM mh_foodpartner_details WHERE txn_id = '${txn_id}' AND agent_id = '${agent_id}' AND agent_sub_id = '${agent_sub_id}' AND account_id ='${account_id}' AND partner_status='approved'`
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
  return {
    data
  };
}
async function addFoodItemDetails(agent_id, agent_sub_id, txn_id) {
  const rows = await db.query(
    `SELECT item_txn_id, txn_id, agent_id, agent_sub_id, foodPartner_name, foodPartner_sub_name, account_id, kitchen_name, kitchen_type, item_name, items_available_from, items_available_to, food_type_id, food_items_name, price, units, food_image, fssai_no, status, partner_status, select_offer, special_offer, enter_amount,date_format(updated_datetime,"%d-%m-%Y") as updated_datetime,partner_status FROM mh_foodpartner_details WHERE agent_id = ${agent_id} AND agent_sub_id = ${agent_sub_id} AND txn_id = ${txn_id};`
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
  return {
    data
  };
}
async function getMainFoodPartnerDetails(account_id, agent_id, txn_id) {

  const rows = await db.query(
    `SELECT item_txn_id, txn_id, agent_id, agent_sub_id, foodPartner_name, foodPartner_sub_name, account_id, kitchen_name, kitchen_type, item_name, items_available_from, items_available_to, food_type_id, food_items_name, price, units, food_image, fssai_no, status, partner_status, select_offer, special_offer,enter_amount,date_format(updated_datetime,"%d-%m-%Y") as updated_datetime FROM mh_foodpartner_details WHERE account_id = '${account_id}'  && agent_id='${agent_id}'  && txn_id='${txn_id}'`
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
  return {
    data,
  };
}
async function loadPartnerNames(account_id) {
  const rows = await db.query(
    `SELECT account_id,agent_id,agent_name,status FROM mh_food_master WHERE status='approved' AND account_id = '${account_id}' GROUP BY agent_id; `
  );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}
async function loadSubPartnerNames(account_id, agent_id) {
  const rows = await db.query(
    `SELECT agent_id, agent_sub_id, account_id, status, agent_name, agent_sub_name,phone, fax, alternate_no, email_id, description, building_no, street, land_mark, city, city_id, country, state, state_id, pin_code, pan, aadhar,gst_registration, gstin, bankAccountNo, bankName, branchName, ifsc, pan_card_file, gst_tin_loc, addhaar_no, mh_agreement_loc, partner_pic_loc, mb_certificate_loc, food_safety_certificate, accept, created_datetime, updated_datetime, file_upload5, food_tax, remarks, ip_address FROM mh_food_master WHERE account_id = '${account_id}' && agent_id='${agent_id}' GROUP BY agent_sub_id; `
  );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}
async function loadaccfoodSubPartnerNames(account_id, partner_id) {
  const rows = await db.query(
    `SELECT partner_id,partner_sub_id, agent_sub_name, building_no, street, land_mark, city, state, country, pin_code FROM mh_property_master WHERE account_id='${account_id}' AND partner_id='${partner_id}' GROUP BY partner_sub_id; `
  );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}
async function getTravelSubPartnerNames(account_id, agent_id) {
  const rows = await db.query(
    `SELECT agent_id, transport_sub_id, transport_sub_name, account_id, status, agent_name,phone, fax, alternate_no, email_id, agent_commission, description, building_no, street, land_mark, city, city_id, country, state, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, cancelled_cheque, pan_loc, gst_tin_loc, addhaar_loc, mh_agreement_loc, partner_pic_loc, mb_certificate_loc, undertaking_certificate, property_tax, fire_safety, accept, remarks, created_datetime, updated_datetime, ip_address FROM mh_transport_master WHERE account_id = '${account_id}' && agent_id='${agent_id}' GROUP BY transport_sub_id; `
  );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}

async function loadEquipmentfoodSubpartnerNames(account_id, partner_id) {
  const rows = await db.query(
    `SELECT equipment_id, equipment_sub_id, account_id, status, agent_name, equipment_sub_name,phone, fax, alternate_no, email_id, agent_commission, description, building_no, street, land_mark, city, city_id, country, state, state_id, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, pan_card_file_loc, gst_tin_loc, addhaar_no_loc, mh_agreement_loc, partner_pic_loc, mb_certificate_loc, property_tax_loc, fire_safety_loc, cancelled_cheque_doc, accept, remarks, ip_address, created_datetime, updated_datetime FROM mh_equipment_master WHERE account_id = '${account_id}' && equipment_id='${partner_id}' GROUP BY equipment_sub_id; `
  );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}
async function getFoodTypeDetails(account_id, agent_id, agent_sub_id) {
  const rows = await db.query(
    `SELECT item_txn_id, txn_id, agent_id, agent_sub_id, foodPartner_name, foodPartner_sub_name, account_id, kitchen_name, kitchen_type, item_name, items_available_from, items_available_to, food_type_id, food_items_name, price, units, food_image, fssai_no, status, partner_status, select_offer, special_offer, enter_amount,date_format(updated_datetime,"%d-%m-%Y") as updated_datetime,partner_status  FROM mh_foodpartner_details WHERE account_id = '${account_id}'  && agent_id='${agent_id}'  && agent_sub_id='${agent_sub_id}'`
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
  return {
    data,
  };
}

async function getBookingFoodDetails(params) {
  const rows = await db.query(
    ` SELECT txn_id, account_id, agent_id, agent_sub_id, food_partner_name, food_partner_sub_name, food_partner_phone, name_of_kitchen, type_of_kitchen, fssai_no, upload_fssai,select_offer, special_offer,enter_amount, date_from, date_to, restaurant_description, restaurant_phone, restaurant_email, restaurant_latitude, restaurant_longitude, building_no, street, land_mark, country, state_id, state_name, city_id, city_name, pin_code, opening_time, closing_time, Name_Of_Contact_Person, upload_image, upload_image1, upload_image2, partner_status,concat(state_name,"," ,city_name) as location FROM mh_restaurant_details_table WHERE partner_status="approved" AND city_id = '${params}'`
  );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}
async function loadFoodPartnerData(account_id) {
  const rows = await db.query(
    `SELECT item_txn_id, txn_id, agent_id, agent_sub_id, foodPartner_name, foodPartner_sub_name, account_id, kitchen_name, kitchen_type, item_name, items_available_from, items_available_to, food_type_id, food_items_name, price, units, food_image, fssai_no, status, partner_status, select_offer, special_offer, enter_amount,date_format(updated_datetime,"%d-%m-%Y") as updated_datetime,partner_status FROM mh_foodpartner_details WHERE account_id = '${account_id}' GROUP BY foodPartner_sub_name;`
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
  return {
    data,
  };
}
async function getFoodItemDetails(account_id, agent_id, agent_sub_id, txn_id) {
  const rows = await db.query(
    `SELECT item_txn_id, txn_id, agent_id, agent_sub_id, foodPartner_name, foodPartner_sub_name, account_id, kitchen_name, kitchen_type, item_name, items_available_from, items_available_to, food_type_id, food_items_name, price, units, food_image, fssai_no, status, partner_status, select_offer, special_offer, enter_amount,date_format(updated_datetime,"%d-%m-%Y") as updated_datetime,partner_status  FROM mh_foodpartner_details WHERE account_id = '${account_id}' && agent_id = '${agent_id}' && agent_sub_id = '${agent_sub_id}' && item_txn_id = '${txn_id}'`
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

  return {
    data,
  };
}
// const result = helper.emptyOrRows(rows);
//   let data = [];
//   var index = 0;
//   for (const key in result) {
//     if (Object.hasOwnProperty.call(result, key)) {
//       const element = result[key];

//       index = index + 1;

//       data.push({
//         index: index,
//         ...element,
//       });
//     }
//   }
//   return { data };
// }

async function create(fields, files, docs, ipAddress) {
  let data = JSON.parse(fields.foodPartnerDetails);
  let agentSubId = await helper.generateFoodPartnerSUBID();
  let fileObj = JSON.parse(JSON.stringify(files));

  const result = await db.query(
    `INSERT IGNORE INTO mh_food_master( agent_sub_id,agent_name,agent_sub_name, phone, fax,alternate_no,email_id, description, building_no, street, land_mark, city, country, state,
      pin_code, pan, aadhar,gst_registration, gstin,bankAccountNo, bankName, branchName, ifsc, accept,pan_card_file,addhaar_no,gst_tin_loc,mh_agreement_loc,mb_certificate_loc,food_safety_certificate,file_upload5,food_tax,state_id,city_id,account_id,remarks,fassai_no,ip_address)VALUES
      (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      agentSubId ?? "",
      data.name ?? "",
      data.partner_sub_name == "" ?data.name : data.partner_sub_name,
      // data.company_name ?? "",
      // data.individual_name ?? "",
      data.phone ?? "",
      data.fax == "" ? data.phone : data.fax,
      data.alternate_no ?? "",
      data.email_id ?? "",
      data.description ?? "",
      data.building_no ?? "",
      data.street ?? "",
      data.land_mark ?? "",
      data.city1 == ""?data.city.city : data.city1,
      data.country.name ?? "",
      data.state1 == "" ?data.state.state_name : data.state1,
      data.pin_code ?? "",
      data.pan ?? "",
      data.aadhar ?? "",
      data.gst_registration ?? "",
      data.gstin == ""? data.gst_registration :data.gstin,
      data.bankAccountNo ?? "",
      data.bankName ?? "",
      data.branchName ?? "",
      data.ifsc ?? "",
      data.accept ?? "",
      docs.panCardName ?? "",
      docs.addhaarName ?? "",
      docs.gstInName ?? "",
      docs.mhAgreementName ?? "",
      // docs.partnerPicName ?? "",
      docs.mbCertificateName ?? "",
      docs.foodSafetyName ?? "",
      docs.cancelledCheckName ?? "",
      docs.foodTaxName ?? "",
      data.state.state_id ?? "",
      data.city.city_id ?? "",
      data.user_id ?? "",
      data.remarks?? "",
      data.fssai_no?? "",
      ipAddress
    ]
  );
  let message = "Error in Food Registration Master";

  if (result.affectedRows) {
    message = "Food Registration Master created successfully";
  }

  return { message };
}

// existing user food partner create
async function approveFoodRegDetails(agent_id, agent_sub_id, update) {
  if (update.remarks.length===0){
    update.remarks=""
  }
  let result = await db.query(
    `UPDATE mh_food_master SET status=?, remarks=? WHERE agent_id='${agent_id}' AND agent_sub_id='${agent_sub_id}'`,
    ["approved", update.remarks]
  );

  // var result2 = await db.query(
  //   `UPDATE mh_foodpartner_details SET partner_status=? WHERE agent_id='${agent_id}' AND agent_sub_id='${agent_sub_id}'`,
  //   ["approved"]
  // );
  let message = "Error in Approving Food Data";

  if (result.affectedRows ) {
    message = "Food data Approved successfully";
  }

  return { message };
}
async function rejectFoodRegDetails(agent_id, agent_sub_id, update) {
  const result = await db.query(
    `UPDATE mh_food_master SET status=?, remarks=? WHERE agent_id='${agent_id}' AND agent_sub_id='${agent_sub_id}'`,
    ["rejected", update.remarks]
  );
  let message = "Error in rejecting Food Data";

  if (result.affectedRows) {
    message = "Food data Rejected successfully";
  }

  return { message };
}
  async function approveRestaurantDetails(txn_id,agent_id, agent_sub_id, update) {
    // console.log("approved",update)
    let result = await db.query(
      `UPDATE mh_restaurant_details_table SET 	partner_status=?, remarks=? WHERE txn_id='${txn_id}' AND agent_id='${agent_id}' AND agent_sub_id='${agent_sub_id}'`,
      ["approved", update.remarks]
      
    );
    // console.log("remarks",agent_id,agent_sub_id)
    // var result2 = await db.query(
    //   `UPDATE mh_foodpartner_details SET partner_status=? WHERE agent_id='${agent_id}' AND agent_sub_id='${agent_sub_id}'`,
    //   ["approved"]
    // );
    // console.log("result",result)
    let message = "Error in Approving Resturant Data";
  
    if (result.affectedRows ) {
      message = "Resturant data Approved successfully";
    }
  
    return { message };
  }
  async function approvefoodItemApprove(item_txn_id,txn_id,agent_id, agent_sub_id,update) {
    let result = await db.query(
      `UPDATE mh_foodpartner_details SET 	partner_status=?, remarks=? WHERE item_txn_id='${item_txn_id}' AND txn_id='${txn_id}' AND agent_id='${agent_id}' AND agent_sub_id='${agent_sub_id}'`,
      ["approved", update.remarks]
      
    );
    // console.log("remarks",update.remarks)
    // var result2 = await db.query(
    //   `UPDATE mh_foodpartner_details SET partner_status=? WHERE agent_id='${agent_id}' AND agent_sub_id='${agent_sub_id}'`,
    //   ["approved"]
    // );
    let message = "Error in Approving Food Item Data";
  
    if (result.affectedRows ) {
      message = "Food Item data Approved successfully";
    }
  
    return { message };
  }
  async function rejectRestaurantDetails(txn_id,agent_id, agent_sub_id, update) {
    // console.log("txn_id",txn_id)
    // console.log("rejected",update);
    const result = await db.query(
      `UPDATE mh_restaurant_details_table SET 	partner_status=?, remarks=? WHERE
      txn_id='${txn_id}' AND agent_id='${agent_id}' AND agent_sub_id='${agent_sub_id}'`,
      ["rejected", update.remarks]
    );
    let message = "Error in rejecting Resturant Data";
  
    if (result.affectedRows) {
      message = "Food Item data rejecting successfully";
    }
  
    return { message };
  }
  async function rejectfoodItemReject(item_txn_id,txn_id,agent_id, agent_sub_id,update) {
    const result = await db.query(
      `UPDATE mh_foodpartner_details SET 	partner_status=?, remarks=? WHERE item_txn_id='${item_txn_id}' AND txn_id='${txn_id}' AND agent_id='${agent_id}' AND agent_sub_id='${agent_sub_id}'`,
      ["rejected", update.remarks]
    );
    // console.log("rejected",update.remarks);
    let message = "Error in rejecting Food Item Data";
  
    if (result.affectedRows) {
      message = "Food Item  data Rejected successfully";
    }
  
    return { message };
  }

async function getFoodPartnerApproveData(status) {
  let rows=[]
  let qry = `SELECT
  pm.agent_id,
  pm.agent_sub_id,
  pm.account_id,
  pm.agent_name,
  pm.agent_sub_name,
  pm.phone,
  pm.fax,
  pm.alternate_no,
  pm.email_id,
  pm.description,
  pm.building_no,
  pm.street,
  pm.land_mark,
  pm.city,
  pm.city_id,
  pm.country,
  pm.state,
  pm.state_id,
  pm.pin_code,
  pm.pan,
  pm.aadhar,
  pm.gst_registration,
  pm.gstin,
  pm.bankAccountNo,
  pm.bankName,
  pm.branchName,
  pm.ifsc,
  pm.file_upload5,
  pm.pan_card_file,
  pm.gst_tin_loc,
  pm.addhaar_no,
  pm.mh_agreement_loc,
  pm.partner_pic_loc,
  pm.mb_certificate_loc,
  pm.food_safety_certificate,
  pm.accept,
  pm.status,
  pm.remarks,
  pm.food_tax,
  pm.fassai_no,
  COALESCE(restaurant_count, 0) AS restaurant_count,
  COALESCE(restaurant_approved_count, 0) AS restaurant_approved_count,
  COALESCE(restaurant_pending_count, 0) AS restaurant_pending_count,
  COALESCE(food_menu_count, 0) AS food_menu_count,
  COALESCE(food_menu_approved_count, 0) AS food_menu_approved_count,
  COALESCE(food_menu_pending_count, 0) AS food_menu_pending_count
FROM mh_food_master pm
LEFT JOIN (
  SELECT
      agent_id,
      agent_sub_id,
      account_id,
      COUNT( txn_id) AS restaurant_count,
      SUM(CASE WHEN partner_status = 'approved' THEN 1 ELSE 0 END) AS restaurant_approved_count,
      SUM(CASE WHEN partner_status = 'pending' THEN 1 ELSE 0 END) AS restaurant_pending_count
  FROM mh_restaurant_details_table  
  GROUP BY agent_id,  agent_sub_id, account_id
) pd ON pm.account_id = pd.account_id AND pm.agent_id = pd.agent_id AND pm.agent_sub_id = pd.agent_sub_id
LEFT JOIN (
  SELECT
      agent_id,
      agent_sub_id,
      account_id,
      COUNT(txn_id) AS food_menu_count,
      SUM(CASE WHEN partner_status = 'approved' THEN 1 ELSE 0 END) AS food_menu_approved_count,
      SUM(CASE WHEN partner_status = 'pending' THEN 1 ELSE 0 END) AS food_menu_pending_count
  FROM mh_foodpartner_details
  GROUP BY agent_id, agent_sub_id, account_id
) pr ON pm.account_id = pr.account_id AND pm.agent_id = pr.agent_id AND pm.agent_sub_id = pr.agent_sub_id`;
  if (status === "ALL") {
    rows = await db.query(qry);
  } else {
    qry += " WHERE pm.status=?";
    rows = await db.query(qry, [status]);
  }
  const result = helper.emptyOrRows(rows);
  var data=[]
  for (let index in result){
    const element=result[index]
    data.push({
      index:parseInt(index)+1,
      ...element
    })
  }
  // console.log(data)
  return {
    data,
  };
}
async function FoodExistingUserCreate(fields, files, docs, ipAddress) {
  let data = JSON.parse(fields.foodPartnerDetails);
  let agentSubId = await helper.generateFoodPartnerSUBID();
  const result = await db.query(
    `INSERT IGNORE INTO mh_food_master(agent_id,agent_sub_id,agent_name,agent_sub_name, phone, fax,email_id, description, building_no, street, land_mark, city, country, state,pin_code, pan, aadhar,gst_registration, gstin,bankAccountNo, bankName, branchName, ifsc, accept,pan_card_file,addhaar_no,gst_tin_loc,mh_agreement_loc,mb_certificate_loc,food_safety_certificate,file_upload5,food_tax,state_id,city_id,account_id,ip_address)VALUES
    (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.agent_id ?? "",
      agentSubId ?? "",
      data.agent_name ?? "",
      data.name ?? "",
      
      data.phone ?? "",
      data.fax ?? "",
      data.email_id ?? "",
      data.description ?? "",
      data.building_no ?? "",
      data.street ?? "",
      data.land_mark ?? "",
      data.city.city ?? "",
      data.country ?? "",
      data.state.state_name ?? "",
      data.pin_code ?? "",
      data.pan ?? "",
      data.aadhar ?? "",
      data.gstin ?? "",
      data.bankAccountNo ?? "",
      data.bankName ?? "",
      data.branchName ?? "",
      data.ifsc ?? "",
      data.accept ?? "",
      docs.panCardName ?? "",
      docs.addhaarName ?? "",
      docs.gstInName ?? "",
      docs.mhAgreementName ?? "",
      docs.mbCertificateName ?? "",
      docs.foodSafetyName ?? "",
      docs.cancelledCheckName ?? "",
      docs.foodTaxName ?? "",
      data.state.state_id ?? "",
      data.city.city_id ?? "",
      data.user_id ?? "",
      ipAddress
    ]
  );
  let message = "Error in Food Registration Master";

  if (result.affectedRows) {
    message = "Food Partner Registration Master created successfully ";
  }
  return { message };
}
async function ledgerFoodDetails(data) {

  var foodstatus = data.status == true ? "yes" : "no";
  const result = await db.query(
    `INSERT IGNORE INTO mh_food_ledger_table(txn_id,account_id,agent_id, agent_sub_id,foodPartner_name, foodPartner_sub_name,address,location,city,city_id,gstin,fssai_no,kitchen_name, kitchen_type,item_name,food_type_id,food_items_name,price,units,special_offer,food_image,partner_status,status)VALUES
      (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.txn_id ?? "",
      data.account_id ?? "",
      data.agent_id ?? "",
      data.agent_sub_id ?? "",
      data.foodPartner_name ?? "",
      data.foodPartner_sub_name ?? "",
      data.address ?? "",
      data.location ?? "",
      data.city ?? "",
      data.city_id ?? "",
      data.gstin ?? "",
      data.fssai_no ?? "",
      data.kitchen_name ?? "",
      data.kitchen_type ?? "",
      data.item_name ?? "",
      data.food_type_id ?? "",
      data.food_items_name ?? "",
      data.price ?? "",
      data.units ?? "",
      data.special_offer ?? "",
      data.food_image ?? "",
      data.partner_status ?? "",
      foodstatus ?? "",
    ]
  );
  return { result };
}
async function createFoodDetails(fields, files, docNames, ipAddress) {
  // console.log(docNames)
  let data = JSON.parse(fields.food_details);
//  console.log("data",data.city_name);
  // let food_items_list_arr = [];
  // for (let i = 0; i < data.foodItemsList.length; i++) {
  //   food_items_list_arr.push(data.foodItemsList[i].food_items_name);
  // }
  // let foodItemsList = food_items_list_arr.toString();
  const result = await db.query(
    `INSERT IGNORE INTO mh_foodpartner_details(item_txn_id, txn_id, agent_id, agent_sub_id, foodPartner_name, foodPartner_sub_name, account_id, kitchen_name, kitchen_type, item_name, items_available_from, items_available_to, food_type_id, food_items_name, price, units, food_image, fssai_no, status, partner_status, select_offer, special_offer, enter_amount,city_id, city, location, ip_address, city_name_id, city_name)VALUES
      (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.item_txn_id ?? "",
      data.txn_id ?? "",
      data.agent_id ?? "",
      data.agent_sub_id ?? "",
      data.foodPartner_name ?? "",
      data.foodPartner_sub_name ?? "",
      data.account_id ?? "",
      data.kitchen_name ?? "",
      data.kitchen_type ?? "",
      data.item_name ?? "",
      data.items_available_from ?? "",
      data.items_available_to?? "",
      data.food_type_id ?? "",
      data.food_items_name ?? "",
      data.price ?? "",
      data.units ?? "",
      docNames.foodImg_name ?? "",
      data.fssai_no ?? "",
      data.status ?? "",
      data.partner_status ?? "",
      data.select_offer ?? "",
      data.special_offer ?? "",
      data.enter_amount ?? "",
      data.city_id ?? "",
      data.city ?? "",
      data.location ?? "",
      ipAddress,
      data.city_name.city_id ?? "",
      data.city_name.city ?? "",
    ]
  );

  let message = "Error in Saving Food Details";
  if (result.affectedRows) {
    message = "Food Details Master created successfully";
  }
  return { message };
}
// async function createFoodDetails(fields,docs,ipAddress) {
//   let data = JSON.parse(fields.food_details);
//   console.log("data",data);
//   console.log("docs",docs);
//   let food_items_list_arr = [];
//   // for (let i = 0; i < data.foodItemsList.length; i++) {
//   //   food_items_list_arr.push(data.foodItemsList[i].food_items_name);
//   // }
//   let foodItemsList = food_items_list_arr.toString();

  

// const result = await db.query(
//   `INSERT IGNORE INTO mh_foodpartner_details(item_txn_id,txn_id, agent_id,agent_sub_id,foodPartner_name, foodPartner_sub_name,account_id,kitchen_name,kitchen_type,item_name,items_available_from,items_available_to,food_type_id,food_items_name,price,units,food_image,fssai_no,partner_status, select_offer,special_offer,enter_amount,updated_datetime,city_id,city,location,ip_address)VALUES
//   (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
//   [
//     data.item_txn_id ?? "",
//     data.txn_id ?? "",
//     data.agent_id ?? "",
//     data.agent_sub_id ?? "",
//     data.partner_name ?? "",
//     data.partner_sub_name ?? "",
//     data.account_id ?? "",
//     data.kitchen_name ?? "",
//     data.kitchen_type ?? "",
//     data.foodtype ?? "",
//     data.items_available_from ?? "",
//     data.items_available_to ?? "",
//     data.food_type_id ?? "",
//     data.foodName ?? "",
//     data.price ?? "",
//     data.units ?? "",
//     docs.foodImg_name ?? "",
//     data.fssai_no ?? "",
//     data.partner_status ?? "",
//     data.select_offer ?? "",
//     data.special_offer ?? "",
//     data.enter_amount ?? "",
//     data.updated_datetime ?? "",
//     data.city_id ?? "",
//     data.city ?? "",
//     data.location ?? "",
//     ipAddress
    
//   ]
//   );

//   let message = "Error in Saving Food Details";
//   if (result.affectedRows) {
//     message = "Food Details Master created successfully";
//   }
//   return { message };
// }
async function createOtherFood(fields, files, docs, ipAddress) {
  let data = JSON.parse(fields.food_details);
  let food_items_list_arr = [];
  for (let i = 0; i < data.foodItemsList.length; i++) {
    food_items_list_arr.push(data.foodItemsList[i].food_items_name);
  }
  let foodItemsList = food_items_list_arr.toString();
  const result = await db.query(
     `INSERT IGNORE INTO mh_foodpartner_details(item_txn_id, txn_id, agent_id, agent_sub_id, foodPartner_name, foodPartner_sub_name, account_id, kitchen_name, kitchen_type, item_name, items_available_from, items_available_to, food_type_id, food_items_name,price, units, food_image, fssai_no, status, partner_status, select_offer, special_offer, enter_amount, ip_address)VALUES
    (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.item_txn_id ?? "",
      data.txn_id ?? "",
      data.agent_id ?? "",
      data.agent_sub_id ?? "",
      data.foodPartner_name ?? "",
      data.foodPartner_sub_name ?? "",
      data.account_id ?? "",
      data.kitchen_name ?? "",
      data.kitchen_type ??"",
      data.item_name ?? "",
      data.items_available_from ?? "",
      data.items_available_to ?? "",
      data.food_type_id ?? "",
      data.food_items_name ?? "",
      data.price ?? "",
      data.units ?? "",
      docs.foodImg_name ?? "",
      data.fssai_no??"",
      data.status ?? "",
      data.partner_status ?? "",
      data.select_offer ?? "",
      data.special_offer ?? "",
      data.enter_amount ?? "",
      ipAddress
    ]
  );

  let message = "Error in Saving Food Details";
  if (result.affectedRows) {
    message = "Food Details Master created successfully";
  }
  return { message };
}
async function loadFoodStatus(agent_id, agent_sub_id, txn_id, data) {
  var foodstatus = data.status == true ? "yes" : "no";
  const result = await db.query(
    `UPDATE mh_foodpartner_details SET status=?,txn_id=? WHERE agent_id='${agent_id}' && agent_sub_id='${agent_sub_id}' && item_txn_id='${txn_id}' `,
    [foodstatus, data.txn_id ?? ""]
  );
  let message = "Error while changing the food details status Data";

  if (result.affectedRows) {
    message = "Food Status Changed Successfully";
  }

  return { message };
}
// async function updateFoodDetails(txnID, agentId, agentSubId, data) {
//   let food_items_list_arr = [];
//   for (let i = 0; i < data.foodItemsList.length; i++) {
//     food_items_list_arr.push(
//       data.foodItemsList[i].food_items_name ?? data.foodItemsList[i]
//     );
//   }

//   // let foodItemsList = food_items_list_arr.toString();
//   const result = await db.query(
//     `UPDATE mh_foodpartner_details SET item_txn_id=?,txn_id=?,agent_id=?,agent_sub_id=?,foodPartner_name=?,foodPartner_sub_name=?,account_id=?,kitchen_name=?,kitchen_type=?,item_name=?,items_available_from=?,items_available_to=?,food_type_id=?,food_items_name=?,price=?,units=?,food_image=?,fssai_no=?,partner_status=?,select_offer=?,special_offer=?,enter_amount=?, WHERE item_txn_id='${txnID}' AND agent_id='${agentId}' AND agent_sub_id='${agentSubId}'`,
//     [
//       data.item_txn_id ?? "",
//       data.txn_id ?? "",
//       data.agent_id ?? "",
//       data.agent_sub_id ?? "",
//       data.foodPartner_name ?? "",
//       data.foodPartner_sub_name ?? "",
//       data.account_id ?? "",
//       data.kitchen_name ?? "",
//       data.kitchen_type ?? "",
//       data.item_name ?? "",
//       data.items_available_from ?? "",
//       data.items_available_to ?? "",
//       data.foodName.food_type_id ?? data.food_type_id ??"",
//       data.item_name ?? "",
//       data.price ?? "",
//       data.units ?? "",
//       data.food_image ?? "",
//       data.fssai_no ?? "",
//       data.partner_status ?? "",
//       data.select_offer ?? "",
//       data.special_offer ?? "",
//       data.enter_amount ?? "",
//     ]
//   );
//   let message = "Error in updating Food Details Registration";

//   if (result.affectedRows) {
//     message = "Food Details Master updated successfully";
//   }

//   return { message };
// }
async function fooditemdetailsUpdating(item_txn_id, agent_id, agent_sub_id, data,docNames) {
  // console.log("fooditemdetailsUpdating",data.city_name);
  
  let food_items_list_arr = [];
  if (data.foodItemsList && data.foodItemsList.length) {
    for (let i = 0; i < data.foodItemsList.length; i++) {
      food_items_list_arr.push(
        data.foodItemsList[i].food_items_name ?? data.foodItemsList[i]
      );
    }
  }

  // let foodItemsList = food_items_list_arr.toString();
  const result = await db.query(
    `UPDATE mh_foodpartner_details SET item_txn_id=?,txn_id=?,agent_id=?,agent_sub_id=?,foodPartner_name=?,foodPartner_sub_name=?,account_id=?,kitchen_name=?,kitchen_type=?,item_name=?,items_available_from=?,items_available_to=?,food_items_name=?,price=?,units=?,food_image=?,fssai_no=?,partner_status=?,select_offer=?,special_offer=?,enter_amount=?,city_name_id=?,city_name=? WHERE item_txn_id='${item_txn_id}' AND agent_id='${agent_id}' AND agent_sub_id='${agent_sub_id}'`,
    [
      data.item_txn_id ?? "",
      data.txn_id ?? "",
      data.agent_id ?? "",
      data.agent_sub_id ?? "",
      data.foodPartner_name ?? "",
      data.foodPartner_sub_name ?? "",
      data.account_id ?? "",
      data.kitchen_name ?? "",
      data.kitchen_type ?? "",
      data.item_name ?? "",
      data.items_available_from ?? "",
      data.items_available_to ?? "",
      // data.foodName.food_type_id ?? data.food_type_id ??"",
      data.food_items_name ?? "",
      data.price ?? "",
      data.units ?? "",
      docNames.food_image_name ?? "",
      data.fssai_no ?? "",
      data.partner_status ?? "",
      data.select_offer ?? "",
      data.special_offer ?? "",
      data.enter_amount ?? "",
      data.city_name.city_id ?? "",
      data.city_name.city ?? "",
    ]
  );
  let message = "Error in updating Food Details Registration";

  if (result.affectedRows) {
    message = "Food Details Master updated successfully";
  }

  return { message };
}

async function update(userId, agentId, agentSubid, agentName, agentSubName, data
  ) {
    // console.log("updatedata",data);
    let city="";
    if(data.city !=""){
      city = data.city.city;
    } else {
      city = data.city1
    }
    let state="";
    if(data.state !=""){
      state = data.state.state_name;
    } else {
      state = data.state1
    }
    const result1 = await db.query(
      `UPDATE mh_food_master SET account_id=?, agent_id=?, agent_sub_id=?, agent_name=?, agent_sub_name=?, phone=?, fax=?, alternate_no=?, email_id=?, description=?, building_no=?, street=?, land_mark=?, city=?, city_id=?, country=?, state=?, pin_code=?, bankAccountNo=?, bankName=?, branchName=?, ifsc=?, accept=?, fassai_no=?, gst_registration=? WHERE account_id='${userId}' AND agent_id='${agentId}' AND agent_sub_id='${agentSubid}'`,
      [
        data.user_id ?? "",
      data.agent_id ?? "",
      data.agent_sub_id ?? "",
      data.name ?? "",
      agentSubName === agentName ? agentSubName : agentName,
      data.phone ?? "",
      data.fax ?? "",
      data.alternate_no ?? "",
      data.email_id ?? "",
      data.description ?? "",
      data.building_no ?? "",
      data.street ?? "",
      data.land_mark ?? "",
      data.prevcity === data.city ? data.city : city,
      data.city.city_id ?? 0,
      data.country.name ?? data.country,
      data.prevstate === data.state ? data.state : state,
      // data.state.state_id ?? 0,
      data.pin_code ?? "",
      data.bankAccountNo ?? "",
      data.bankName ?? "",
      data.branchName ?? "",
      data.ifsc ?? "",
      data.accept ?? "",
      data.fssai_no ?? "",
      data.gst_registration ?? "",
      ]
    );
    if (agentName == agentSubName) {
      const result2 = await db.query(
        `UPDATE mh_food_master SET agent_name=? WHERE agent_id='${agentId}'`,
        [agentSubName == agentSubName ? data.partner_sub_name : agentName]
      );
      let message = "Error in updating Food Registration Master";
      if (result2.affectedRows) {
        message = "Food Registration Master updated successfully";
      }
      return { message };
    }
  
    let message = "Error in updating Food Registration Master";
  
    if (result1.affectedRows) {
      message = "Food Registration Master updated successfully";
    }
    return { message };
  }
  
async function remove(id) {
  const result = await db.query(
    `DELETE FROM mh_food_master WHERE parent_type_id=?`,
    [id]
  );

  let message = "Error in deleting Food Registration Master";

  if (result.affectedRows) {
    message = "Food Registration Master deleted successfully";
  }

  return { message };
}

async function createOtherFoodPropertyDetails(fields, files, docs, ipAddress) {
  let data = JSON.parse(fields.property_details);
  // console.log("data",data)
  let amenity_nameArr = [];
  let amenity_iconArr = [];
  for (let i = 0; i < data.amenities.length; i++) {
    amenity_nameArr.push(data.amenities[i].amenity_name);
    amenity_iconArr.push(data.amenities[i].icon_image);
  }
  let amenityName = amenity_nameArr.toString();
  let amenityIcon = amenity_iconArr.toString();
  const result = await db.query(
    `INSERT IGNORE INTO mh_property_details_table( account_id, partner_id, partner_sub_id, partner_name,sub_partner_name, partner_phone,property_id, property_name, sub_property_name, property_phone,property_email,property_description, property_latitude,property_longitude,building_no,street,land_mark,country,state_id,state_name,city_id,city_name,pin_code,amenity_name, amenity_icon, checkIn_time, checkOut_time,Name_Of_Contact_Person, upload_image,upload_image1,upload_image2,upload_image3,upload_image4,ip_address)VALUES
   (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.account_id ?? "",
      data.partner_id ?? "",
      data.partner_sub_id ?? "",
      data.partner_name ?? "",
      data.partner_sub_name ?? "",
      data.partner_phone ?? "",
      data.property_name.property_id ?? "",
      data.property_name.property_name ?? "",
      data.sub_property_name ?? "",
      data.property_phone ?? "",
      data.property_email_id ?? "",
      data.property_description ?? "",
      data.property_latitude ?? "",
      data.property_longitude ?? "",
      data.building_no ?? "",
      data.street ?? "",
      data.land_mark ?? "",
      data.country ?? "",
      data.state.state_id ?? "",
      data.state.state_name ?? "",
      data.city.city_id ?? "",
      data.city.city ?? "",
      data.pin_code ?? "",
      amenityName ?? "",
      amenityIcon ?? "",
      data.checkIn_time ?? "",
      data.checkOut_time ?? "",
      data.Name_Of_Contact_Person ?? "",
      docs.upload_image1_name ?? "",
      docs.upload_image2_name ?? "",
      docs.upload_image3_name ?? "",
      docs.upload_image4_name ?? "",
      docs.upload_image5_name ?? "",
      ipAddress
    ]
  );
  const result2 = await db.query(
    `INSERT IGNORE INTO mh_search_city_master(city_id, city_name)VALUES(?,?)`,
    [
      data.city.city_id,
      data.city.city,
    ]
  );
  let message = "Error in Saving Property Details";

  if (result.affectedRows) {
    message = "Property Details Master created successfully";
  }
  if (result2.affectedRows) {
    message = "Property Details Master created successfully";
  }
  return { message };
}

async function createOtherFoodMedical(fields, files, docs, ipAddress) {
  let data = JSON.parse(fields.equipmentItemDetails);
  const result = await db.query(
    `INSERT IGNORE INTO mh_equipment_location_table(account_id, equipment_id, equipment_sub_id, agent_name, equipment_sub_name, item_name, item_id, price, units,units_id,medical_store,purchased_type,address,city,city_id,location,special_offer,partner_status,equipment_image,ip_address)VALUES
   (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.account_id ?? "",
      data.equipment_id ?? "",
      data.equipment_sub_id ?? "",
      data.agent_name ?? "",
      data.equipment_sub_name ?? "",
      data.item_name.item_name ?? "",
      data.item_name.item_id ?? "",
      data.price ?? "",
      data.units.units ?? "",
      data.units.unit_id ?? "",
      data.medical_store ?? "",
      data.purchased_type ?? "",
      data.address ?? "",
      data.city ?? "",
      data.city_id ?? "",
      data.location ?? "",
      data.special_offer ?? "",
      data.partner_status ?? "",
      docs.equipmentImageName ?? "",
      ipAddress
    ]
  );
  let message = "Error in Equipment Registration Location Master";

  if (result.affectedRows) {
    message = "Equipment Registration Location Master created successfully";
  }

  return { message };
}


async function createOtherFoodTravelParter(fields, files, docs, ipAddress) {
  //let transportSubId = await helper.generateTransportSUBID();
  let data = JSON.parse(fields.travelLocation);
  const result = await db.query(
    `INSERT IGNORE INTO mh_travel_location_table(agent_id,account_id,transport_sub_id,travel_name,no_of_seaters,transport_sub_name,address,city_id,city,location,vehicle_name,day_price,night_price,units,description,vehicle_image,travel_status,ip_address)
   VALUES
   (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.agent_id ?? "",
      data.account_id ?? "",
      data.transport_sub_id ?? "",
      data.agent_name ?? "",
      data.no_of_seaters ?? "",
      data.transport_sub_name ?? "",
      data.address ?? "",
      data.city_id ?? "",
      data.city ?? "",
      data.location ?? "",
      data.vehicle_name ?? "",
      data.day_price ?? "",
      data.night_price ?? "",
      data.units ?? "",
      data.description ?? "",
      docs.vehicleImageName ?? "",
      data.travel_status ?? "",
      ipAddress
    ]
  );
  let message = "Error in Travel Location  Registration";

  if (result.affectedRows) {
    message = "Travel Location  Registration created successfully";
  }
  return { message };
}



async function loadPropertyData(accountId, partnerId, partnerSubId) {
  const rows = await db.query(
    `SELECT txn_id, account_id, partner_id, partner_sub_id, partner_name, sub_partner_name, partner_phone, property_name, sub_property_name, property_phone, property_email, property_description, property_latitude, property_longitude,building_no, street, land_mark, country, state_id, state_name, city_id, city_name, pin_code,amenity_name,checkIn_time,checkOut_time,Name_Of_Contact_Person,upload_image, upload_image1, upload_image2, upload_image3, upload_image4 FROM mh_property_details_table WHERE account_id='${accountId}' AND partner_id='${partnerId}' AND partner_sub_id='${partnerSubId}'`
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
  return {
    data,
  };
};

async function loadRoomsData(accountId, partnerId, partnerSubId, txnId) {
  const rows = await db.query(
    `SELECT txn_id, property_txn_id, partner_id, partner_sub_id, partner_name, sub_partner_name, property_name, sub_property_name, facilities, icon_image, no_of_avail_rooms,room_category,room_type,room_numbers, price, units, room_image_1, room_image_2, room_image_3, room_image_4, room_image_5, date_format(date_from,"%d-%m-%Y") as date_from,date_format(date_to,"%d-%m-%Y") as date_to,select_offer,property_specialOffer,enter_amount,other_amenities FROM mh_property_rooms_table WHERE account_id='${accountId}' && partner_id='${partnerId}' && partner_sub_id='${partnerSubId}' && property_txn_id='${txnId}'`
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


async function loadMedicalEqpData(account_id, equipment_id, equipment_sub_id) {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT txn_id,equipment_id,account_id, equipment_sub_id, agent_name, equipment_sub_name, item_name, price, units, equipment_image,status,medical_store,address,location,city,city_id,special_offer,item_id,units_id,purchased_type,partner_status FROM mh_equipment_location_table WHERE account_id='${account_id}' && equipment_id='${equipment_id}' && equipment_sub_id='${equipment_sub_id}'`
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
  return {
    data,
  };
}



async function TravelcityNames() {
  const rows = await db.query(`SELECT city,city_id FROM mh_city_master`);
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}
async function otherTravelLocation(account_id, agent_id, transport_sub_id) {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT txn_id,agent_id,account_id, transport_sub_id,account_id, travel_name, transport_sub_name,city_id,city, address,location,
    vehicle_name,day_price,night_price,no_of_seaters, units, description,special_offer,vehicle_image,travel_status FROM mh_travel_location_table WHERE account_id='${account_id}' && agent_id='${agent_id}' && transport_sub_id='${transport_sub_id}'`
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

  return {
    data,
  };
}
async function updateOtherPropertyData(txnID, data) {
  const result = await db.query(
    `UPDATE mh_property_details_table SET  partner_id=?, partner_sub_id=?, partner_name=?, sub_partner_name=?, partner_phone=?, property_name=?, sub_property_name=?, property_phone=?, property_email=?, property_description=?, property_latitude=?, property_longitude=?, building_no=?, street=?, land_mark=?, country=?, state_id=?, state_name=?, city_id=?, city_name=?, pin_code=?, checkIn_time=?, checkOut_time=?,Name_Of_Contact_Person=? WHERE txn_id='${txnID}'`,
    [
      data.partner_id ?? "",
      data.partner_sub_id ?? "",
      data.partner_name ?? "",
      data.sub_partner_name ?? "",
      data.partner_phone ?? "",
      data.property_name ?? "",
      data.sub_property_name ?? "",
      data.property_phone ?? "",
      data.property_email ?? "",
      data.property_description ?? "",
      data.property_latitude ?? "",
      data.property_longitude ?? "",
      data.building_no ?? "",
      data.street ?? "",
      data.land_mark ?? "",
      data.country ?? "",
      data.state.state_id ?? "",
      data.state.state_name ?? "",
      data.city.city_id ?? "",
      data.city.city ?? "",
      data.pin_code ?? "",
      data.checkIn_time ?? "",
      data.checkOut_time ?? "",
      data.Name_Of_Contact_Person??"",
    ]
  );
  let message = "Error in updating Property Data";

  if (result.affectedRows) {
    message = "Property Data  updated successfully";
  }

  return { message };
}


async function putOtherEquipmentDetails(
  equipment_id,
  equipment_sub_id,
  txn_id,
  data
) {
  const result = await db.query(
    `UPDATE mh_equipment_location_table SET account_id=?, txn_id=?, equipment_id=?, equipment_sub_id=?,agent_name=?,equipment_sub_name=?, item_name=?,item_id=?, medical_store=?, price=?, units=?, units_id=?, partner_status=?,purchased_type=? WHERE equipment_id='${equipment_id}' AND equipment_sub_id='${equipment_sub_id}' AND txn_id='${txn_id}'`,
    [
      data.account_id ?? "",
      data.txn_id ?? "",
      data.equipment_id ?? "",
      data.equipment_sub_id ?? "",
      data.agent_name ?? "",
      data.equipment_sub_name ?? "",
      data.item_name.item_name ?? data.item_name,
      data.item_name.item_id ?? data.item_id,
      data.medical_store ?? "",
      data.price ?? "",
      data.units.units ?? data.units,
      data.units.unit_id ?? data.unit_id,
      // data.special_offer ?? "",
      data.partner_status ?? "",
      data.purchased_type ?? "",
    ]
  );

  let message = "Error in updating Equipment Registration Master";

  if (result.affectedRows) {
    message = "Equipment Details updated successfully";
  }
  return { message };
}


async function updateOtherRoomsData(txnID, partner_id, partner_sub_id, data) {
  let amenity_arr = [];
  let amenity_iconArr = [];
  let room_numbers =[];
  for (let i = 0; i < data.facilities.length; i++) {
    amenity_arr.push(data.facilities[i].amenity_name ?? data.facilities[i]);
    amenity_iconArr.push(data.facilities[i].icon_image);
  }
  let amenities = amenity_arr.toString();
  let amenityIcon = amenity_iconArr.toString();
  let roomNumber = room_numbers.toString();
  const result = await db.query(
    `UPDATE mh_property_rooms_table SET  partner_id=?,partner_sub_id=?, property_name=?, sub_property_name=?, facilities=?, icon_image=?,room_numbers=?, no_of_avail_rooms=?, room_type=?, price=?,other_amenities=?, units=?, date_from=?, date_to=?,room_category=?,select_offer=?, property_specialOffer=?, enter_amount=? WHERE txn_id='${txnID}' AND partner_id='${partner_id}' AND partner_sub_id='${partner_sub_id}'`,
    [
      // data.property_txn_id ??"",
      data.partner_id ?? "",
      data.partner_sub_id ?? "",
      data.property_name ?? "",
      data.sub_property_name ?? "",
      amenities ?? "",
      amenityIcon ?? "",
      roomNumber ?? "",
      data.no_of_avail_rooms ?? "",
      data.room_type ?? "",
      data.price ?? "",
      data.other_amenities ?? "",
      data.units ?? "",
      data.date_from ?? data.data_from_up,
      data.date_to ?? data.data_to_up,
      data.room_category ?? "",
      data.select_offer ?? "",
      data.property_specialOffer ?? "",
      data.enter_amount ??"",
    ]
  );

  let message = "Error in Updating Room Details";

  if (result.affectedRows) {
    message = "Room Details Updated successfully";
  }
  return { message };
}

async function updateOtherTravelDetails(txnID, agentId, transportSubId, data) {
  const result = await db.query(
    `UPDATE mh_travel_location_table SET  account_id=?,agent_id=?, transport_sub_id=?,travel_name=?, transport_sub_name=?,city_id=?,city=?,vehicle_name=?,day_price=?,night_price=?,units=?,description=?,no_of_seaters=?,travel_status=? WHERE txn_id='${txnID}' AND agent_id='${agentId}' AND transport_sub_id='${transportSubId}'`,
    [
      data.account_id ?? "",
      data.agent_id ?? "",
      data.transport_sub_id ?? "",
      data.agent_name ?? "",
      data.transport_sub_name ?? "",
      data.city_id ?? "",
      data.city ?? "",
      data.vehicle_name ?? "",
      data.day_price ?? "",
      data.night_price ?? "",
      data.units ?? "",
      data.description ?? "",
      // data.special_offer ?? "",
      data.no_of_seaters ?? "",
      data.travel_status ?? "",
    ]
  );
  let message = "Error in Travel Location  Registration";

  if (result.affectedRows) {
    message = "Travel Location  Registration updated successfully";
  }
  return { message };
}


async function createOtherRoomDetails(fields, files, docs, ipAddress) {
  let data = JSON.parse(fields.room_details);
 // console.log("sassss",data,docs);

  let amenity_arr = [];
  let amenity_iconArr = [];
  for (let i = 0; i < data.facilities.length; i++) {
    amenity_arr.push(data.facilities[i].amenity_name);
    amenity_iconArr.push(data.facilities[i].icon_image);
  }
  let amenities = amenity_arr.toString();
  let amenityIcon = amenity_iconArr.toString();
  let roomNumber = data.room_numbers.toString();
  const result = await db.query(
    `INSERT IGNORE INTO mh_property_rooms_table(property_txn_id, partner_id, partner_sub_id, partner_name, sub_partner_name, property_name, sub_property_name, no_of_avail_rooms, room_type,price, units, room_image_1,room_image_2,room_image_3,room_image_4,room_image_5,room_category,date_from,date_to,account_id,select_offer,property_specialOffer,enter_amount,ip_address)VALUES
    (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.property_txn_id ?? "",
      data.partner_id ?? "",
      data.partner_sub_id ?? "",
      data.partner_name ?? "",
      data.sub_partner_name ?? "",
      data.property_name ?? "",
      data.sub_property_name ?? "",
      data.no_of_avail_rooms ?? "",
      data.room_type ?? "",
      // amenities ?? "",
      // amenityIcon ?? "",
     // roomNumber ?? "",
     // data.other_amenities ?? "",
      data.price ?? "",
      data.units ?? "",
      docs.upload_room_image1_name ?? "",
      docs.upload_room_image2_name ?? "",
      docs.upload_room_image3_name ?? "",
      docs.upload_room_image4_name ?? "",
      docs.upload_room_image5_name ?? "",
      data.room_category ?? "",
      data.date_from ?? "",
      data.date_to ?? "",
      data.account_id ?? "",
      data.select_offer ?? "",
      data.property_specialOffer ?? "",
      data.enter_amount ?? "",
      ipAddress
    ]
  );

  let message = "Error in Saving Room Details";

  if (result.affectedRows) {
    message = "Room Details created successfully";
  }
  return { message };
}
async function createFoodRestaurantDetails(fields, docs, ipAddress) {
  // console.log("fkjgfgjfj")
  let data = JSON.parse(fields.restaurant_details);
  // console.log("thiruy",data.partner_status)
  const result = await db.query(
    `INSERT IGNORE INTO mh_restaurant_details_table(txn_id,account_id, agent_id, agent_sub_id, food_partner_name, food_partner_sub_name, food_partner_phone, name_of_kitchen, type_of_kitchen, fssai_no,upload_fssai, select_offer, special_offer,enter_amount,date_from,date_to, restaurant_description, restaurant_phone, restaurant_email, restaurant_latitude, restaurant_longitude, building_no, street, land_mark, country,state_id,state_name,city_id, city_name, pin_code, opening_time, closing_time, Name_Of_Contact_Person, partner_status,upload_image, upload_image1, upload_image2, ip_address)VALUES
    (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
  [
    data.txn_id ??"",
    data.account_id ?? "",
    data.agent_id ?? "",
    data.agent_sub_id ?? "",
    data.food_partner_name ?? "",
    data.food_partner_sub_name ?? "",
    data.phone ?? "",
    data.name_of_kitchen ?? "",
    data.type_of_kitchen ?? "",
    data.fssai_no ?? "",
    docs.upload_fssai_name ??"",
    data.select_offer ??"",
    data.special_offer ?? "",
    data.enter_amount ?? "",
    data.date_from ?? "",
    data.date_to ?? "",
    data.restaurant_description ?? "",
    data.restaurant_phone ?? "",
    data.restaurant_email ?? "",
    data.restaurant_latitude ?? "",
    data.restaurant_longitude ?? "",
    data.building_no ?? "",
    data.street ?? "",
    data.land_mark ?? "",
    data.country ?? "",
    data.state.state_id ?? "",
    data.state.state_name ?? "",
    data.city.city_id ?? "",
    data.city.city ?? "",
    data.pin_code ?? "",
    data.opening_time ?? "",
    data.closing_time ?? "",
    data.Name_Of_Contact_Person ?? "",
    data.partner_status ?? "",
    docs.upload_image1_name ?? "",
    docs.upload_image2_name ?? "",
    docs.upload_image3_name ?? "",
    ipAddress
    ]
  );
  let message = "Error in Saving Restaurant Details";
  if (result.affectedRows) {
    message = "Restaurant Details Master created successfully";
  }
  return { message };
}
async function getFoodRestaurantDetails( agent_id, agent_sub_id) {
  const rows = await db.query(
    `SELECT txn_id, account_id, agent_id, agent_sub_id, food_partner_name, food_partner_sub_name, food_partner_phone, name_of_kitchen, type_of_kitchen, fssai_no, upload_fssai, select_offer, special_offer, enter_amount, date_from, date_to, restaurant_description, restaurant_phone, restaurant_email, restaurant_latitude, restaurant_longitude, building_no, street, land_mark, country, state_id, state_name, city_id, city_name, pin_code, concat(building_no, ",", street, ",", state_name, ",", city_name, ",", country) as address, concat(state_name, ",", city_name) as location, opening_time, closing_time, Name_Of_Contact_Person, upload_image, upload_image1, upload_image2, ip_address,partner_status,remarks,partner_status FROM mh_restaurant_details_table WHERE  agent_id='${agent_id}' AND agent_sub_id='${agent_sub_id}'`
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
  // console.log("getFoodRestaurantDetails", data);
  return {
    data,
  };
}
async function getFoodRestaurantDetailsadmin(txn_id, agent_id, agent_sub_id) {
  const rows = await db.query(
  `SELECT
    pm.txn_id, 
    pm.account_id, 
    pm.agent_id, 
    pm.agent_sub_id, 
    pm.food_partner_name, 
    pm.food_partner_sub_name, 
    pm.food_partner_phone, 
    pm.name_of_kitchen, 
    pm.type_of_kitchen, 
    pm.fssai_no, 
    pm.upload_fssai, 
    pm.select_offer, 
    pm.special_offer, 
    pm.enter_amount, 
    pm.date_from, 
    pm.date_to, 
    pm.restaurant_description, 
    pm.restaurant_phone, 
    pm.restaurant_email, 
    pm.restaurant_latitude, 
    pm.restaurant_longitude, 
    pm.building_no, 
    pm.street, 
    pm.land_mark, 
    pm.country, 
    pm.state_id, 
    pm.state_name, 
    pm.city_id, 
    pm.city_name, 
    pm.pin_code, 
    concat(pm.building_no, ",", pm.street, ",", pm.state_name, ",", pm.city_name, ",", pm.country) as address,    
    concat(pm.state_name, ",", pm.city_name) as location, 
    pm.opening_time, 
    pm.closing_time, 
    pm.Name_Of_Contact_Person, 
    pm.upload_image, 
    pm.upload_image1, 
    pm.upload_image2, 
    pm.ip_address,
    pm.partner_status,
    pm.remarks,
     COALESCE(food_menu_count, 0) AS food_menu_count,
     COALESCE(food_menu_approved_count, 0) AS food_menu_approved_count,
     COALESCE(food_menu_pending_count, 0) AS food_menu_pending_count
   FROM  mh_restaurant_details_table pm
   LEFT JOIN (
     SELECT
         agent_id,
         agent_sub_id,
         account_id,
         txn_id,
         COUNT(txn_id) AS food_menu_count,
         SUM(CASE WHEN partner_status = 'approved' THEN 1 ELSE 0 END) AS food_menu_approved_count,
         SUM(CASE WHEN partner_status = 'pending' THEN 1 ELSE 0 END) AS food_menu_pending_count
     FROM mh_foodpartner_details 
     GROUP BY txn_id, agent_id,  agent_sub_id, account_id
   ) pd ON pm.txn_id = pd.txn_id AND pm.account_id = pd.account_id AND pm.agent_id = pd.agent_id AND pm.agent_sub_id = pd.agent_sub_id`
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
  // console.log("getFoodRestaurantDetails", data);
  return {
    data,
  };
}
// async function getFoodRestaurantDetails(accountId, agentId, agentSubId) {
//   const rows = await db.query(
//     `SELECT txn_id,account_id, agent_id, agent_sub_id, food_partner_name, food_partner_sub_name, food_partner_phone, name_of_kitchen, type_of_kitchen, fssai_no,upload_fssai, select_offer, special_offer,enter_amount, date_from, date_to,restaurant_description, restaurant_phone, restaurant_email, restaurant_latitude, restaurant_longitude, building_no, street, land_mark, country, state_id, state_name, city_id, city_name, pin_code,concat(building_no,",",street,"," ,state_name,"," ,city_name,"," ,country) as address,concat(state_name,"," ,city_name) as location, opening_time, closing_time, Name_Of_Contact_Person, upload_image, upload_image1, upload_image2, ip_address FROM mh_restaurant_details_table WHERE account_id='${accountId}' AND agent_id='${agentId}' AND agent_sub_id='${agentSubId}'`
//   );
//   const result = helper.emptyOrRows(rows);
//   let data = [];
//   var index = 0;
//   for (const key in result) {
//     if (Object.hasOwnProperty.call(result, key)) {
//       const element = result[key];

//       index = index + 1;

//       data.push({
//         index: index,
//         ...element,
//       });
//     }
//   }
//   return {
//     data,
//   };
// }
// async function updateFoodRestaurant(txnID, data) {
//   const result = await db.query(
//     `UPDATE mh_restaurant_details_table SET txn_id=?,account_id=?,agent_id=?, agent_sub_id=?, food_partner_name=?, food_partner_sub_name=?, food_partner_phone=?, name_of_kitchen=?, type_of_kitchen=?, fssai_no=?, select_offer=?, special_offer=?, enter_amount=?,, date_from=?, date_to=?, restaurant_description=?, restaurant_phone=?, restaurant_email=?,restaurant_latitude=?, restaurant_longitude=?, building_no=?, street=?, land_mark=?, country=?, state_id=?, state_name=?,city_id=?, city_name=?, pin_code=?, opening_time=?, closing_time=?, Name_Of_Contact_Person=? WHERE txn_id='${txnID}'`,
//     [
//     data.txn_id ?? "",
//     data.account_id ?? "",
//     data.agent_id ?? "",
//     data.agent_sub_id ?? "",
//     data.food_partner_name ?? "",
//     data.food_partner_sub_name ?? "",
//     data.food_partner_phone ?? "",
//     data.name_of_kitchen ?? "",
//     data.type_of_kitchen ?? "",
//     data.fssai_no ?? "",
//     data.select_offer ??"",
//     data.special_offer ?? "",
//     data.enter_amount ??"",
//     data.date_from ?? "",
//     data.date_to ?? "",
//     data.restaurant_description ?? "",
//     data.restaurant_phone ?? "",
//     data.restaurant_email ?? "",
//     data.restaurant_latitude ?? "",
//     data.restaurant_longitude ?? "",
//     data.building_no ?? "",
//     data.street ?? "",
//     data.land_mark ?? "",
//     data.country ?? "",
//     data.state.state_id ?? "",
//     data.state.state_name ?? "",
//     data.city.city_id ?? "",
//     data.city.city ?? "",
//     data.pin_code ?? "",
//     data.opening_time ?? "",
//     data.closing_time ?? "",
//     data.Name_Of_Contact_Person ?? "",
//     data.partner_status ?? "",
//     ]
//   );
//   let message = "Error in updating Restaurant Data";
//   if (result.affectedRows) {
//     message = "Restaurant Data updated successfully";
//   }
//   return { message };
// }
async function updateFoodRestaurant(txn_id, data, docNames) {
  // console.log("updatefood123", data);
  // console.log("docNames", docNames);
  const result = await db.query(
    `UPDATE mh_restaurant_details_table SET txn_id=?, account_id=?, agent_id=?, agent_sub_id=?, food_partner_name=?, food_partner_sub_name=?, food_partner_phone=?, name_of_kitchen=?, type_of_kitchen=?, fssai_no=?, select_offer=?, special_offer=?, enter_amount=?, date_from=?, date_to=?, restaurant_description=?, restaurant_phone=?, restaurant_email=?, restaurant_latitude=?, restaurant_longitude=?, building_no=?, street=?, land_mark=?, country=?, state_id=?, state_name=?, city_id=?, city_name=?, pin_code=?, opening_time=?, closing_time=?, Name_Of_Contact_Person=?, upload_image=?, upload_image1=?, upload_image2=? WHERE txn_id='${txn_id}'`,
    [ 
      data.txn_id !== null && data.txn_id !== undefined ? data.txn_id : "",
      data.account_id !== null && data.account_id !== undefined ? data.account_id : "",
      data.agent_id !== null && data.agent_id !== undefined ? data.agent_id : "",
      data.agent_sub_id !== null && data.agent_sub_id !== undefined ? data.agent_sub_id : "",
      data.food_partner_name !== null && data.food_partner_name !== undefined ? data.food_partner_name : "",
      data.food_partner_sub_name !== null && data.food_partner_sub_name !== undefined ? data.food_partner_sub_name : "",
      data.food_partner_phone !== null && data.food_partner_phone !== undefined ? data.food_partner_phone : "",
      data.name_of_kitchen !== null && data.name_of_kitchen !== undefined ? data.name_of_kitchen : "",
      data.type_of_kitchen !== null && data.type_of_kitchen !== undefined ? data.type_of_kitchen : "",
      data.fssai_no !== null && data.fssai_no !== undefined ? data.fssai_no : "",
      data.select_offer !== null && data.select_offer !== undefined ? data.select_offer : "",
      data.special_offer !== null && data.special_offer !== undefined ? data.special_offer : "",
      data.enter_amount !== null && data.enter_amount !== undefined ? data.enter_amount : "",
      data.date_from !== null && data.date_from !== undefined ? data.date_from : "",
      data.date_to !== null && data.date_to !== undefined ? data.date_to : "",
      data.restaurant_description !== null && data.restaurant_description !== undefined ? data.restaurant_description : "",
      data.restaurant_phone !== null && data.restaurant_phone !== undefined ? data.restaurant_phone : "",
      data.restaurant_email !== null && data.restaurant_email !== undefined ? data.restaurant_email : "",
      data.restaurant_latitude !== null && data.restaurant_latitude !== undefined ? data.restaurant_latitude : "",
      data.restaurant_longitude !== null && data.restaurant_longitude !== undefined ? data.restaurant_longitude : "",
      data.building_no !== null && data.building_no !== undefined ? data.building_no : "",
      data.street !== null && data.street !== undefined ? data.street : "",
      data.land_mark !== null && data.land_mark !== undefined ? data.land_mark : "",
      data.country !== null && data.country !== undefined ? data.country : "",
      data.state.state_id !== null && data.state.state_id !== undefined ? data.state.state_id : "",
      data.state.state_name !== null && data.state.state_name !== undefined ? data.state.state_name : "",
      data.city.city_id !== null && data.city.city_id !== undefined ? data.city.city_id : "",
      data.city.city !== null && data.city.city !== undefined ? data.city.city : "",
      data.pin_code !== null && data.pin_code !== undefined ? data.pin_code : "",
      data.opening_time !== null && data.opening_time !== undefined ? data.opening_time : "",
      data.closing_time !== null && data.closing_time !== undefined ? data.closing_time : "",
      data.Name_Of_Contact_Person !== null && data.Name_Of_Contact_Person !== undefined ? data.Name_Of_Contact_Person : "",
      docNames.upload_Image_name !== null && docNames.upload_Image_name !== undefined ? docNames.upload_Image_name : "",
      docNames.upload_Image1_name !== null && docNames.upload_Image1_name !== undefined ? docNames.upload_Image1_name : "",
      docNames.upload_Image2_name !== null && docNames.upload_Image2_name !== undefined ? docNames.upload_Image2_name : "",
    
      // data.partner_status !== null && data.partner_status !== undefined ? data.partner_status : "",
      // data.txn_id ?? "",
      // data.account_id ?? "",
      // data.agent_id ?? "",
      // data.agent_sub_id ?? "",
      // data.food_partner_name ?? "",
      // data.food_partner_sub_name ?? "",
      // data.food_partner_phone ?? "",
      // data.name_of_kitchen ?? "",
      // data.type_of_kitchen ?? "",
      // data.fssai_no ?? "",
      // data.select_offer ?? "",
      // data.special_offer ?? "",
      // data.enter_amount ?? "",
      // data.date_from ?? "",
      // data.date_to ?? "",
      // data.restaurant_description ?? "",
      // data.restaurant_phone ?? "",
      // data.restaurant_email ?? "",
      // data.restaurant_latitude ?? "",
      // data.restaurant_longitude ?? "",
      // data.building_no ?? "",
      // data.street ?? "",
      // data.land_mark ?? "",
      // data.country ?? "",
      // data.state.state_id ?? "",
      // data.state.state_name ?? "",
      // data.city.city_id ?? "",
      // data.city.city_name ?? "",
      // data.pin_code ?? "",
      // data.opening_time ?? "",
      // data.closing_time ?? "",
      // data.Name_Of_Contact_Person ?? "",
      // docNames.upload_Image_name ?? "",
      // docNames.upload_Image1_name ?? "",
      // docNames.upload_Image2_name ?? "",
    ]
  );
  let message = "Error in updating Restaurant Data";
  if (result.affectedRows) {
    message = "Restaurant Data updated successfully";
  }
  return { message };
}

module.exports = {
  getMultiple,
  getStatusCount,
  getMultipleFoodDetails,
  getFoodDataOnStatus,
  getSingleParentTypeDetail,
  create,
  update,
  remove,
  getExistingUserFoodPartner,
  FoodExistingUserCreate,
  createFoodDetails,
  getFoodDetails,
  // updateFoodDetails,
  getFoodItemDetails,
  getFoodPartnersForAdmin,
  getMainFoodPartnerDetails,
  getFoodTypeDetails,
  loadFoodPartnerData,
  loadPartnerNames,
  loadSubPartnerNames,
  loadFoodStatus,
  ledgerFoodDetails,
  getBookingFoodDetails,
  getBookingFoodTypes,
  addFoodItemDetails,
  getFoodDetailsForAdmin,
  approveFoodRegDetails,
  rejectFoodRegDetails,
  getFoodPartnerApproveData,
  createOtherFood,
  createOtherFoodMedical,
  createOtherFoodPropertyDetails,
  createOtherFoodTravelParter,
  createOtherRoomDetails,
  loadPropertyData,
  loadRoomsData,
  loadMedicalEqpData,
  otherTravelLocation,
  updateOtherPropertyData,
  updateOtherRoomsData,
  putOtherEquipmentDetails,
  updateOtherTravelDetails,
  loadaccfoodSubPartnerNames,
  loadEquipmentfoodSubpartnerNames,
  createFoodRestaurantDetails,
  getFoodRestaurantDetails,
  updateFoodRestaurant,
  getTravelSubPartnerNames,
  fooditemdetailsUpdating,
  getFoodRestaurantDetailsadmin,
  approveRestaurantDetails,
  rejectRestaurantDetails,
  approvefoodItemApprove,
  rejectfoodItemReject,
  // test_create,
};