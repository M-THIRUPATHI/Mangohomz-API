const db = require("./db");
const helper = require("../helper");

async function getTravelbookingDetails(time,city_id) {
  
  let splittime= time.split(":");
      splittime = (splittime[0]);
      if (parseInt(splittime) >6 && parseInt(splittime)<20) {
       result= await db.query(`SELECT tnx_id, agent_id, transport_sub_id, account_id, transport_sub_name, agent_name, transport_company_name,select_offer, special_offer,enter_amount,from_date, to_date, transport_phone, transport_email_id, Name_Of_Contact_Person, transport_description, building_no, street, land_mark, country, city_id, city, state_id, state, pin_code, transport_latitude, transport_longitude, upload_image1, upload_image2, status, created_datetime, updated_datetime, ip_address FROM mh_transport_details WHERE status='approved' AND city_id = '${city_id}'`);
      } else {
        result= await db.query(`SELECT tnx_id, agent_id, transport_sub_id, account_id, transport_sub_name, agent_name, transport_company_name, select_offer, special_offer,enter_amount, from_date, to_date, transport_phone, transport_email_id, Name_Of_Contact_Person, transport_description, building_no, street, land_mark, country, city_id, city, state_id, state, pin_code, transport_latitude, transport_longitude, upload_image1, upload_image2, status, created_datetime, updated_datetime, ip_address FROM mh_transport_details  WHERE status='approved' AND city_id = '${city_id}'`);
      }
  // const rows = await db.query(
  //   `SELECT * FROM mh_travel_location_table  WHERE city_id = '${city_id}' && status="yes" && travel_status="approved" GROUP BY transport_sub_id; `
  // );
  const data = helper.emptyOrRows(result);
  return {
    data,
  };
}
async function getTransportRegAdminMaster() {
  const rows = await db.query(
    `SELECT agent_id,agent_name, transport_sub_name,transport_sub_id,company_name,individual_name,phone, fax, email_id, description, building_no, street, land_mark, city,city_id, country, state, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, cancelled_cheque, accept,pan_loc,addhaar_loc,gst_tin_loc,mh_agreement_loc,partner_pic_loc,mb_certificate_loc,status,undertaking_certificate,property_tax,fire_safety,concat(building_no,",",street,"," ,state,"," ,city,"," ,country) as address,concat(state,"," ,city) as location FROM mh_transport_master WHERE status='verified'`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  var index =0;
  //   const meta = { page };
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      var transport_count = "";
      if (element.agent_id) {
        transport_count = await helper.getCountOfTransportId(element.agent_id);
        index = index + 1;
      }
      data.push({
        transport_count: transport_count,
        index : index,
        ...element,
      });
    }
  }
  return {
    data,
  };
}

async function getMultiple(params) {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT agent_id,agent_name, transport_sub_name,transport_sub_id,company_name,individual_name,phone, fax, email_id, description, building_no, street, land_mark, city,city_id, country, state, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, cancelled_cheque, accept,pan_loc,addhaar_loc,gst_tin_loc,mh_agreement_loc,partner_pic_loc,mb_certificate_loc,status,undertaking_certificate,property_tax,fire_safety,concat(building_no,",",street,"," ,state,"," ,city,"," ,country) as address,concat(state,"," ,city) as location FROM mh_transport_master WHERE account_id = '${params}'`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  var index =0;
  //   const meta = { page };
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      var transport_count = "";
      if (element.agent_id) {
        transport_count = await helper.getCountOfTransportId(element.agent_id);
        index = index + 1;
      }
      data.push({
        transport_count: transport_count,
        index : index,
        ...element,
      });
    }
  }
  return {
    data,
  };
}
async function getTravelpartnerNames(account_id) {
  const rows = await db.query(
    `SELECT agent_id, transport_sub_id, transport_sub_name, account_id, status, agent_name, company_name, individual_name, phone, fax, alternate_no, email_id, agent_commission, description, building_no, street, land_mark, city, city_id, country, state, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, cancelled_cheque, pan_loc, gst_tin_loc, addhaar_loc, mh_agreement_loc, partner_pic_loc, mb_certificate_loc, undertaking_certificate, property_tax, fire_safety, accept, remarks, created_datetime, updated_datetime FROM mh_transport_master WHERE account_id = '${account_id}' && status="approved" GROUP BY agent_id; `
  );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}
async function getSubTravelpartnerNames(account_id, agentId) {
  const rows = await db.query(
    `SELECT agent_id, transport_sub_id, transport_sub_name, account_id, status, agent_name, company_name, individual_name, phone, fax, alternate_no, email_id, agent_commission, description, building_no, street, land_mark, city, city_id, country, state, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, cancelled_cheque, pan_loc, gst_tin_loc, addhaar_loc, mh_agreement_loc, partner_pic_loc, mb_certificate_loc, undertaking_certificate, property_tax, fire_safety, accept, remarks, created_datetime, updated_datetime, ip_address FROM mh_transport_master WHERE account_id = '${account_id}' && agent_id='${agentId}' GROUP BY transport_sub_id;
    `
  );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}
async function loadAccTravelSubpartnerNames(accountID, partner_id) {
  const rows = await db.query(
    `SELECT partner_id, partner_sub_id, agent_sub_name, building_no, street, land_mark, city, state, country, pin_code FROM mh_property_master WHERE account_id='${accountID}' AND partner_id='${partner_id}'`
  );
  const data = helper.emptyOrRows(rows);
  return { data };
}

async function loadFoodTravelSubpartnerNames(accountID, agent_id) {
  const rows = await db.query(
    `SELECT agent_id, agent_sub_id, account_id, status, agent_name, agent_sub_name, phone, fax, alternate_no, email_id, description, building_no, street, land_mark, city, city_id, country, state, state_id, pin_code, pan, aadhar, gst_registration, gstin, bankAccountNo, bankName, branchName, ifsc, pan_card_file, gst_tin_loc, addhaar_no, mh_agreement_loc, partner_pic_loc, mb_certificate_loc, food_safety_certificate, accept, created_datetime, updated_datetime, file_upload5, food_tax, remarks, ip_address FROM mh_food_master WHERE account_id='${accountID}' AND agent_id='${agent_id}'`
  );
  const data = helper.emptyOrRows(rows);
  return { data };
}
// async function loadAccTravelSubpartnerNames(account_id, agentId) {
//   const rows = await db.query(
//     `SELECT txn_id,agent_id,account_id, transport_sub_id,account_id, travel_name, transport_sub_name,city_id,city,vehicle_name,day_price,night_price,no_of_seaters, units, description,special_offer,vehicle_image,travel_status  FROM mh_travel_location_table WHERE account_id = '${account_id}' && agent_id='${agentId}' GROUP BY transport_sub_id;
//     `
//   );
//   const data = helper.emptyOrRows(rows);
//   return {
//     data,
//   };
// }
async function loadEquipmentTravelSubpartnerNames(account_id, equipment_id) {
  const rows = await db.query(
    `SELECT  equipment_id, equipment_sub_id, agent_name, equipment_sub_name, company_name,individual_name, phone, fax, email_id, agent_commission, description, building_no, street, land_mark, city, country, state, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, accept,pan_card_file_loc,gst_tin_loc,addhaar_no_loc,mh_agreement_loc,mb_certificate_loc,property_tax_loc,fire_safety_loc,cancelled_cheque_doc,status,concat(building_no,",",street,"," ,state,"," ,city,"," ,country) as address,concat(state,"," ,city) as location  FROM mh_equipment_master WHERE account_id = '${account_id}' && equipment_id='${equipment_id}' GROUP BY equipment_id;
    `
  );
  const data = helper.emptyOrRows(rows);
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
async function getTravelLocation(account_id, agent_id, transport_sub_id) {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT txn_id,agent_id,account_id, transport_sub_id,account_id, travel_name, transport_sub_name,city_id,city, 
    vehicle_name,day_price,night_price,no_of_seaters, units, description,special_offer,vehicle_image,travel_status,vehicle_type,vehicle_name,vehicle_from,vehicle_to FROM mh_travel_location_table WHERE   
    account_id='${account_id}' && agent_id='${agent_id}' && transport_sub_id='${transport_sub_id}'`
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
async function getTravelData(agent_id, transport_sub_id,time) {
  let splittime= time.split(":");
      splittime = (splittime[0]);
      if (parseInt(splittime) >6 && parseInt(splittime)<20) {
        rows= await db.query(`SELECT txn_id,agent_id,account_id, transport_sub_id,account_id, travel_name, transport_sub_name,city_id,city, vehicle_name,day_price as price,no_of_seaters, units, description,special_offer,vehicle_image,travel_status,status FROM mh_travel_location_table  WHERE agent_id='${agent_id}' && transport_sub_id='${transport_sub_id}' && status='yes'`);
      } else {
        rows= await db.query(`SELECT txn_id,agent_id,account_id, transport_sub_id,account_id, travel_name, transport_sub_name,city_id,city, 
       vehicle_name,night_price as price,no_of_seaters, units, description,special_offer,vehicle_image,travel_status,status FROM mh_travel_location_table  WHERE agent_id='${agent_id}' && transport_sub_id='${transport_sub_id}' && status='yes'`);
      }
  // const rows = await db.query(    
  //   `SELECT txn_id,agent_id,account_id, transport_sub_id,account_id, travel_name, transport_sub_name,city_id,city,vehicle_name,day_price,night_price,no_of_seaters, units, description,special_offer,vehicle_image,travel_status FROM mh_travel_location_table WHERE agent_id='${agent_id}' && transport_sub_id='${transport_sub_id}' && status='${status}'&& travel_status='${travel_status}'`
  // );
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
async function getTravelCartData(agent_id, transport_sub_id, txn_id) {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT txn_id,agent_id,account_id, transport_sub_id,account_id, travel_name, transport_sub_name,city_id,city,vehicle_name, 
    day_price,night_price,no_of_seaters,units, description,special_offer,vehicle_image,status,travel_status FROM mh_travel_location_table WHERE 
    agent_id=${agent_id} && transport_sub_id=${transport_sub_id} && txn_id=${txn_id}`
    // `SELECT * FROM mh_travel_location_table WHERE agent_id=${agent_id} && transport_sub_id=${transport_sub_id} && txn_id=${txn_id}`
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
async function loadTravelStatus(agent_id, transport_sub_id, txn_id, data) {
  var travelstatus = data.status == true ? "yes" : "no";
  const result = await db.query(
    `UPDATE mh_travel_location_table SET  status=?,txn_id=? WHERE agent_id='${agent_id}' && transport_sub_id='${transport_sub_id}' && txn_id='${txn_id}' `,
    [travelstatus, data.txn_id ?? ""]
  );
  let message = "Error while changing the Travel details status Data";

  if (result.affectedRows) {
    message = "Travel Status Changed Successfully";
  }

  return { message };
}
async function ledgertravelDetails(data) {
  var travelstatus = data.status == true ? "yes" : "no";
  const result = await db.query(
    `INSERT IGNORE INTO mh_travel_ledger_table(txn_id,agent_id, transport_sub_id,account_id, travel_name, transport_sub_name,city_id,city,vehicle_name,no_of_seaters, day_price,night_price,units, description, vehicle_image,status)VALUES
      (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.txn_id ?? "",
      data.agent_id ?? "",
      data.transport_sub_id ?? "",
      data.account_id ?? "",
      data.travel_name ?? "",
      data.transport_sub_name ?? "",
    // data.vehicle_type ?? "",
      data.city_id ?? "",
      data.city ?? "",
      data.vehicle_name ?? "",
      data.no_of_seaters ?? "",
      data.day_price ?? "",
      data.night_price ?? "",
      data.units ?? "",
      data.description ?? "",
      // data.special_offer ?? "",
      data.vehicle_image ?? "",
      travelstatus ?? "",
    ]
  );

  let message = "Error in Saving Travel Details";

  if (result.affectedRows) {
    message = "Travel Details created successfully";
  }
  return { message };
}
async function getTravelDetails(account_id,agent_id, transport_sub_id) {
   
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT  txn_id, agent_id, account_id, transport_sub_id, travel_name, no_of_seaters, transport_sub_name, city_id, city, address, location, vehicle_type, vehicle_name, day_price, night_price, units, description, special_offer, vehicle_image, travel_status, vehicle_from,status FROM mh_travel_location_table WHERE account_id='${account_id}' AND agent_id='${agent_id}' AND transport_sub_id='${transport_sub_id}' `
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
async function getTravelDetailsForAdmin(accountId, agentId, transportSubId) {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT txn_id, agent_id,account_id, transport_sub_id, travel_name, transport_sub_name,city_id,city,vehicle_name,day_price,night_price,no_of_seaters,units, description,special_offer,vehicle_image,status,travel_status FROM mh_travel_location_table WHERE account_id='${accountId}' && agent_id='${agentId}' && transport_sub_id='${transportSubId}'`
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

async function getPartnersDataForAdmin() {
  const rows = await db.query(
    `SELECT agent_id, transport_sub_id, transport_sub_name, account_id, status, agent_name, company_name,individual_name, phone, fax, email_id, agent_commission, description, building_no, street, land_mark, city, city_id, country, state, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, cancelled_cheque, pan_loc, gst_tin_loc, addhaar_loc, mh_agreement_loc, partner_pic_loc, mb_certificate_loc, undertaking_certificate, property_tax, fire_safety, accept FROM mh_transport_master WHERE status='verified'`
  );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}

async function getTransportPartnerApproveData() {
  const rows = await db.query(
    `SELECT agent_id, transport_sub_id, transport_sub_name, account_id, status, agent_name,company_name,individual_name, phone, fax, email_id, agent_commission, description, building_no, street, land_mark, city, city_id, country, state, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, cancelled_cheque, pan_loc, gst_tin_loc, addhaar_loc, mh_agreement_loc, partner_pic_loc, mb_certificate_loc, undertaking_certificate, property_tax, fire_safety, accept FROM mh_transport_master WHERE status= 'approved'`
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
async function getAllTravelDetailsForAdmin(status) {
  console.log("status",status);
  if(status !="all"){
  const rows = await db.query(
    `SELECT agent_id, transport_sub_id, transport_sub_name, account_id, status, agent_name,company_name,individual_name, phone, fax, email_id, agent_commission, description, building_no, street, land_mark, city, city_id, country, state, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, cancelled_cheque, pan_loc, gst_tin_loc, addhaar_loc, mh_agreement_loc, partner_pic_loc, mb_certificate_loc, undertaking_certificate, property_tax, fire_safety, accept FROM mh_transport_master WHERE status= '${status}'`
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
} else if(status =="all"){
  const rows = await db.query(
    `SELECT agent_id, transport_sub_id, transport_sub_name, account_id, status, agent_name,company_name,individual_name, phone, fax, email_id, agent_commission, description, building_no, street, land_mark, city, city_id, country, state, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, cancelled_cheque, pan_loc, gst_tin_loc, addhaar_loc, mh_agreement_loc, partner_pic_loc, mb_certificate_loc, undertaking_certificate, property_tax, fire_safety, accept FROM mh_transport_master WHERE 1`
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
}
async function getTravelDisplayCountOfPartner(status) {
  console.log("status",status);
  if(status !="all"){
  const rows = await db.query(
    `SELECT agent_id, transport_sub_id, transport_sub_name, account_id, status, agent_name,company_name,individual_name, phone, fax, email_id, agent_commission, description, building_no, street, land_mark, city, city_id, country, state, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, cancelled_cheque, pan_loc, gst_tin_loc, addhaar_loc, mh_agreement_loc, partner_pic_loc, mb_certificate_loc, undertaking_certificate, property_tax, fire_safety, accept FROM mh_transport_master WHERE status= '${status}'`
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
} else if(status =="all"){
  const rows = await db.query(
    `SELECT agent_id, transport_sub_id, transport_sub_name, account_id, status, agent_name,company_name,individual_name, phone, fax, email_id, agent_commission, description, building_no, street, land_mark, city, city_id, country, state, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, cancelled_cheque, pan_loc, gst_tin_loc, addhaar_loc, mh_agreement_loc, partner_pic_loc, mb_certificate_loc, undertaking_certificate, property_tax, fire_safety, accept FROM mh_transport_master WHERE 1`
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
}
async function getStatusCount() {
  const rows = await db.query(
    `SELECT (SELECT COUNT(*) FROM mh_transport_master WHERE status='pending') AS pcount,(SELECT COUNT(*) FROM mh_transport_master WHERE status='approved') AS acount, (SELECT COUNT(*) FROM mh_transport_master WHERE status='rejected') AS rcount FROM mh_transport_master GROUP BY pcount;`
    );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}
async function getSingleParentTypeDetail(id) {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT  id,property_name,phone,email,registration_number FROM mht_hotels WHERE parent_type_id=?`,
    [id]
  );
  const data = helper.emptyOrRows(rows);
  //   const meta = { page };
  return data;
}
/* Save Travel Details */
async function createTravelDetails(fields, files, docs, ipAddress) {
  console.log("image",docs)
  //let transportSubId = await helper.generateTransportSUBID();
  let data = JSON.parse(fields.travelLocation);
  const result = await db.query(
    `INSERT IGNORE INTO mh_travel_location_table(agent_id,account_id,transport_sub_id,travel_name,no_of_seaters,transport_sub_name,city,vehicle_name,day_price,night_price,description,vehicle_image,travel_status,ip_address,vehicle_type,units,vehicle_from,vehicle_to)
    VALUES
    (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.agent_id ?? "",
      data.partner_id ?? "",
      // data.account_id ?? "",
      data.transport_sub_id ?? "",
      data.travel_name ?? "",
      // data.agent_name ?? "",
      data.no_of_seaters ?? "",
      data.transport_sub_name ?? "",
      //data.city_id ?? "",
      data.city ?? "",
      data.Vehicle_Name ?? "",
      data.Vehicle_Day_Price ?? "",
      data.Vehicle_Night_Price ?? "",
      //data.units ?? "",
      data.description ?? "",
      docs.vehicleImageName ?? "",
      data.travel_status ??"",
      ipAddress,
      // data.address ??"",
      // data.location??"",
      data.Vehicle_Type??"",
      data.Vehicle_Trip??"",
      data.Vehicle_From??"",
      data.Vehicle_To??"",
    ]
  );
  let message = "Error in Travel Location  Registration";

  if (result.affectedRows) {
    message = "Travel Location  Registration created successfully";
  }
  return { message };
}
async function create(fields, files, docs,ipAddress) {
  let data = JSON.parse(fields.transportPartnerForm);
  console.log("data",data)
  let transportSubId = await helper.generateTransportSUBID();
  const result = await db.query(
    `INSERT IGNORE INTO mh_transport_master(transport_sub_id,agent_name,transport_sub_name,phone,fax,alternate_no,email_id,description,building_no,street,land_mark,city,city_id,country,state,pin_code,pan,aadhar,gstin,bankAccountNo,bankName,branchName,ifsc,accept,pan_loc,addhaar_loc,gst_tin_loc,mh_agreement_loc,undertaking_certificate,property_tax,fire_safety,cancelled_cheque,account_id,ip_address)VALUES
    (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      transportSubId ?? "",
      data.name ?? "",
      data.partner_sub_name == "" ?data.name : data.partner_sub_name,
      // data.company_name ?? "",
      // data.individual_name?? "",
      data.phone ?? "",
      data.fax == "" ? data.phone : data.fax,
      data.alternate_no ?? "",
      data.email_id ?? "",
      data.description ?? "",
      data.building_no ?? "",
      data.street ?? "",
      data.land_mark ?? "",
      data.city1 == ""?data.city.city : data.city1,
      data.city.city_id ?? "",
      data.country.name ?? "",
      data.state1 == "" ?data.state.state_name : data.state1,
      data.pin_code ?? "",
      data.pan ?? "",
      data.aadhar ?? "",
      data.gstin ?? "",
      data.bankAccountNo ?? "",
      data.bankName ?? "",
      data.branchName ?? "",
      data.ifsc ?? "",
      data.accept ?? "",
      docs.pan ?? "",
      docs.addhaar ?? "",
      docs.gst ?? "",
      docs.mh_agreement ?? "",
      docs.undertaking_certificate ?? "",
      docs.property_tax ?? "",
      docs.fire_safety ?? "",
      docs.cancelled_cheque ?? "",
      data.user_id ?? "",
      ipAddress
    ]
  );
  let message = "Error in Transport Registration Master";

  if (result.affectedRows) {
    message = "Transport Registration Master created successfully";
  }

  return { message };
}
async function getTransportAdminBasedOnStatus(params) {
  const rows = await db.query(
    `SELECT (SELECT COUNT(*) FROM mh_transport_master WHERE status='pending') AS pcount,(SELECT COUNT(*) FROM mh_transport_master WHERE status='verified') AS vcount,(SELECT COUNT(*) FROM mh_transport_master WHERE status='approved') AS acount, (SELECT COUNT(*) FROM mh_transport_master WHERE status='rejected') AS rcount FROM mh_transport_master  WHERE status='${params}' GROUP BY transport_sub_id`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      var transport_count = "";
      if (element.agent_id) {
        transport_count = await helper.getCountOfTransportId(element.agent_id);
      }
      data.push({
        transport_count: transport_count,
        ...element,
      });
    }
  }
  return {
    data,
  };
}
async function getTransportDataOnStatus(params, params1) {
  const rows = await db.query(
    `SELECT agent_id,agent_name,company_name,individual_name, phone, fax, status, email_id, description, building_no, street, land_mark, city, country, state, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, cancelled_cheque, accept,pan_loc,addhaar_loc,gst_tin_loc,mh_agreement_loc,partner_pic_loc,mb_certificate_loc FROM mh_transport_master WHERE status='${params}' AND account_id = '${params1}' GROUP BY agent_id`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      var transport_count = "";
      if (element.agent_id) {
        transport_count = await helper.getCountOfTransportId(element.agent_id);
      }
      data.push({
        transport_count: transport_count,
        ...element,
      });
    }
  }
  return {
    data,
  };
}
async function createTransportExistingUser(fields, files, docs,ipAddress) {
  let data = JSON.parse(fields.transportPartnerForm);
  let transportSubId = await helper.generateTransportSUBID();
  const result = await db.query(
    `INSERT IGNORE INTO mh_transport_master(transport_sub_id,agent_name,transport_sub_name,company_name,individual_name,phone,fax,email_id,description,building_no,street,land_mark,city,city_id,country,state,pin_code,pan,aadhar,gstin,bankAccountNo,bankName,branchName,ifsc,accept,pan_loc,addhaar_loc,gst_tin_loc,mh_agreement_loc,undertaking_certificate,property_tax,fire_safety,cancelled_cheque,account_id,ip_address)VALUES
    (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      transportSubId ?? "",
      data.name ?? "",
      data.transport_sub_name ?? "",
      data.company_name ?? "",
      data.individual_name?? "",
      data.phone ?? "",
      data.fax ?? "",
      data.email_id ?? "",
      data.description ?? "",
      data.building_no ?? "",
      data.street ?? "",
      data.land_mark ?? "",
      data.city.city ?? "",
      data.city.city_id ?? "",
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
      docs.pan ?? "",
      docs.addhaar ?? "",
      docs.gst ?? "",
      docs.mh_agreement ?? "",
      docs.undertaking_certificate ?? "",
      docs.property_tax ?? "",
      docs.fire_safety ?? "",
      docs.cancelled_cheque ?? "",
      data.user_id ?? "",
      ipAddress
    ]
  );
  let message = "Error in Transport Registration Master";

  if (result.affectedRows) {
    message = "Transport Registration Master created successfully";
  }
  return { message };
}
async function transportExistingUser(params) {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT agent_id,agent_name, transport_sub_name,transport_sub_id,company_name,individual_name,phone, fax, email_id, description, building_no, street, land_mark, city,city_id, country, state, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, cancelled_cheque, accept,pan_loc,addhaar_loc,gst_tin_loc,mh_agreement_loc,partner_pic_loc,mb_certificate_loc,status,undertaking_certificate,property_tax,fire_safety,concat(building_no,",",street,"," ,state,"," ,city,"," ,country) as address,concat(state,"," ,city) as location FROM mh_transport_master WHERE agent_id='${params}'`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];

  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      var transport_count = "";
      if (element.agent_id) {
        transport_count = await helper.getCountOfTransportId(element.agent_id);
      }
      data.push({
        transport_count: transport_count,
        ...element,
      });
    }
  }
  return {
    data,
  };
}

async function update(
  accountId,
  agentId,
  transportSubId,
  agentName, 
  agentSubName,
  data
) {
  console.log("data",data)
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
  const result = await db.query(
    `UPDATE mh_transport_master SET transport_sub_id=?,agent_id=?,agent_name=?,transport_sub_name=?,phone=?,fax=?,alternate_no=?,email_id=?,description=?,building_no=?,street=?,land_mark=?,city=?,city_id=?,country=?,state=?,pin_code=?,accept=?,account_id=? WHERE account_id='${accountId}' AND agent_id='${agentId}' AND transport_sub_id='${transportSubId}'`,
    [
      data.transport_sub_id ?? "",
      data.agent_id ?? "",
      data.name ?? "",
      agentSubName ==agentSubName ? agentSubName : agentName,
      // data.company_name ?? "",
      // data.individual_name??"",
      data.phone ?? "",
      data.fax ?? "",
      data.alternate_no ??"",
      data.email_id ?? "",
      data.description ?? "",
      data.building_no ?? "",
      data.street ?? "",
      data.land_mark ?? "",
      data.prevcity == data.city ? data.city : city,
      data.city.city_id ?? 0,
      data.country.name ?? data.country,
      data.prevstate == data.state ?data.state :state,
      // data.state.state_id ?? 0,
      // data.city.city_id ?? "",
      data.pin_code ?? "",
      data.accept ?? "",
      data.user_id ?? "",
    ]
  );

  if (agentName == agentSubName) {
    const result2 = await db.query(
      `UPDATE mh_transport_master SET agent_name=? WHERE agent_id='${agentId}'`,
      [agentSubName == agentSubName ? data.partner_sub_name : agentName]
    );
    let message = "Error in updating Transport Registration Master";
    if (result2.affectedRows) {
      message = "Transport Registration Master updated successfully";
    }
    return { message };
  }

  let message = "Error in updating Transport Registration Master";

  if (result.affectedRows) {
    message = "Transport Registration Master updated successfully";
  }

  return { message };
}
async function remove(id) {
  const result = await db.query(
    `DELETE FROM mht_hotels WHERE parent_type_id=?`,
    [id]
  );

  let message = "Error in deleting Transport Registration Master";

  if (result.affectedRows) {
    message = "Transport Registration Master deleted successfully";
  }

  return { message };
}
async function approveTravelRegDetails(agent_id, transport_sub_id, update) {
  let result = await db.query(
    `UPDATE mh_transport_master SET status=?, remarks=? WHERE agent_id='${agent_id}' AND transport_sub_id='${transport_sub_id}'`,
    ["approved", update.remarks]
  );
  // var result2 = await db.query(
  //   `UPDATE mh_travel_location_table SET travel_status=? WHERE agent_id='${agent_id}' AND transport_sub_id='${transport_sub_id}'`,
  //   ["approved"]
  // );
  let message = "Error in Approving Transport Data";

  if (result.affectedRows) {
    message = "Transport data Approved successfully";
  }

  return { message };
}
async function rejectTravelRegDetails(agent_id, transport_sub_id, update) {
  const result = await db.query(
    `UPDATE mh_transport_master SET status=?, remarks=? WHERE agent_id='${agent_id}' AND transport_sub_id='${transport_sub_id}'`,
    ["rejected", update.remarks]
  );
  let message = "Error in rejecting Travel Data";

  if (result.affectedRows) {
    message = "Travel data Rejected successfully";
  }

  return { message };
}
async function approveTrasnportDetails(tnx_id,  update) {
  console.log("apptransport",update);
  var result2 = await db.query(
    `UPDATE mh_transport_details SET status=?,remarks=? WHERE tnx_id='${tnx_id}' `,
    ["approved",update.transport_remarks]
  );
  let message = "Error in Approving Transport Data";

  if (result2.affectedRows) {
    message = "Transport data Approved successfully";
  }

  return { message };
}
async function rejectTransportDetails(tnx_id,  update) {
  console.log("rejecttravel",update);
  const result = await db.query(
    `UPDATE mh_transport_details SET status=?, remarks=? WHERE tnx_id='${tnx_id}'`,
    ["rejected",update.transport_remarks]
  );
  let message = "Error in rejecting Travel Data";

  if (result.affectedRows) {
    message = "Travel data Rejected successfully";
  }

  return { message };
}
async function approveTravelDetails(agent_id, transport_sub_id, update) {

  var result2 = await db.query(
    `UPDATE mh_travel_location_table SET travel_status=?,remarks=? WHERE agent_id='${agent_id}' AND transport_sub_id='${transport_sub_id}'`,
    ["approved",update.travel_details_remarks]
  );
  let message = "Error in Approving Travel Data";

  if (result2.affectedRows) {
    message = "Travel data Approved successfully";
  }

  return { message };
}
async function rejectTravelDetails(agent_id, transport_sub_id, update) {
  console.log("rejecttravel",update);
  const result = await db.query(
    `UPDATE mh_travel_location_table SET travel_status=?, remarks=? WHERE agent_id='${agent_id}' AND transport_sub_id='${transport_sub_id}'`,
    ["rejected",update.travel_details_remarks]
  );
  let message = "Error in rejecting Travel Data";

  if (result.affectedRows) {
    message = "Travel data Rejected successfully";
  }

  return { message };
}
// async function updateTravelDetails(txnID, agentId, transportSubId, data) {
//   const result = await db.query(
//     `UPDATE mh_travel_location_table SET  account_id=?,agent_id=?, transport_sub_id=?,travel_name=?, transport_sub_name=?,city_id=?,city=?,vehicle_name=?,day_price=?,night_price=?,units=?,description=?,no_of_seaters=?,travel_status=? WHERE txn_id='${txnID}' AND agent_id='${agentId}' AND transport_sub_id='${transportSubId}'`,
//     [
//       data.account_id ?? "",
//       data.agent_id ?? "",
//       data.transport_sub_id ?? "",
//       data.agent_name ?? "",
//       data.transport_sub_name ?? "",
//       data.city_id ?? "",
//       data.city ?? "",
//       data.vehicle_name ?? "",
//       data.day_price ?? "",
//       data.night_price ?? "",
//       data.units ?? "",
//       data.description ?? "",
//       // data.special_offer ?? "",
//       data.no_of_seaters ?? "",
//       data.travel_status ??"",
//     ]
//   );
//   let message = "Error in Travel Location  Registration";

//   if (result.affectedRows) {
//     message = "Travel Location  Registration updated successfully";
//   }
//   return { message };
// }
async function updateTravelDetails(txn_id, agent_id, transport_sub_id, data,docNames) {
  console.log("travelupdate",data);
  console.log("dataupdocNamesdate",docNames);
  const result = await db.query(
    `UPDATE mh_travel_location_table SET  account_id=?,agent_id=?, transport_sub_id=?,travel_name=?, transport_sub_name=?,city_id=?,city=?,vehicle_name=?,day_price=?,night_price=?,units=?,description=?,no_of_seaters=?,vehicle_image=?,travel_status=? WHERE txn_id='${txn_id}' AND agent_id='${agent_id}' AND transport_sub_id='${transport_sub_id}'`,
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
      docNames.vehicle_image ?? "",
      data.travel_status ??"",
    ]
  );
  let message = "Error in Travel Location  Registration";

  if (result.affectedRows) {
    message = "Travel Location  Registration updated successfully";
  }
  return { message };
}
async function updatingTravellocationDetails(txn_id, agent_id, transport_sub_id, data,docNames) {
  console.log("travelupdate",data);
   console.log("docNamestravel",docNames);

  let vehicleType = "";
  if (typeof(data.vehicle_type) == 'object'){
    vehicleType = data.vehicle_type.vehicle_name;
  } else {
    vehicleType = data.vehicle_type
  }

  let vehicleTo = typeof(data.vehicle_to) == 'object' ? data.vehicle_to.near_hospital_name : data.vehicle_to;
  let vehicleFrom = typeof(data.vehicle_From) == 'object' ? data.vehicle_From.point_type : data.Vehicle_From;


  const result = await db.query(
    `UPDATE mh_travel_location_table SET  account_id=?,agent_id=?, transport_sub_id=?,travel_name=?, transport_sub_name=?,city_id=?,city=?,vehicle_name=?,day_price=?,night_price=?,units=?,description=?,no_of_seaters=?,vehicle_image=?,travel_status=?,vehicle_type=?,vehicle_from=?,vehicle_to=? WHERE txn_id='${txn_id}' AND agent_id='${agent_id}' AND transport_sub_id='${transport_sub_id}'`,
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
      data.vehicle_per_trip ?? "",
      data.description ?? "",
      // data.special_offer ?? "",
      data.no_of_seaters ?? "",
      docNames.vehicle_image_name ?? "",
      data.travel_status ??"",
vehicleType ?? "",
      data.vehicle_from ?? "",
      vehicleTo ?? "",

    ]
  );
  let message = "Error in Travel Location  Registration";

  if (result.affectedRows) {
    message = "Travel Location  Registration updated successfully";
  }
  return { message };
}
async function createOtherPropertyDetails(fields, files, docs, ipAddress) {
  let data = JSON.parse(fields.property_details);
  console.log("data",data)
  let amenity_nameArr = [];
  let amenity_iconArr = [];
  for (let i = 0; i < data.amenities.length; i++) {
    amenity_nameArr.push(data.amenities[i].amenity_name);
    amenity_iconArr.push(data.amenities[i].icon_image);
  }
  let amenityName = amenity_nameArr.toString();
  let amenityIcon = amenity_iconArr.toString();
  const result = await db.query(
    `INSERT IGNORE INTO mh_property_details_table( account_id, partner_id, partner_sub_id, partner_name,sub_partner_name, partner_phone,property_id, property_name, sub_property_name, property_phone,property_email,property_description, property_latitude,property_longitude,building_no,street,land_mark,country,state_id,state_name,city_id,city_name,pin_code, amenity_name, amenity_icon, checkIn_time, checkOut_time,Name_Of_Contact_Person, upload_image,upload_image1,upload_image2,upload_image3,upload_image4,ip_address)VALUES
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

  // if (result.affectedRows) {
  //   message = "Property Details Master created successfully";
  // }
  if (result.affectedRows && result2.affectedRows) {
    message = "Property Details Master created successfully";
  }
  return { message };
}
async function createOtherMedical(fields, files, docs, ipAddress) {
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
async function otherTravelProperty(accountId, partnerId, partnerSubId) {
  const rows = await db.query(
    `SELECT txn_id, account_id, partner_id, partner_sub_id, partner_name, sub_partner_name, partner_phone, property_name, sub_property_name, property_phone, property_email, property_description, property_latitude, property_longitude,building_no, street, land_mark, country, state_id, state_name, city_id, city_name, pin_code,amenity_name, checkIn_time,checkOut_time, Name_Of_Contact_Person,upload_image, upload_image1, upload_image2, upload_image3, upload_image4 FROM mh_property_details_table WHERE account_id='${accountId}' AND partner_id='${partnerId}' AND partner_sub_id='${partnerSubId}'`
  );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
};


async function loadTravelRoomsData(accountId, partnerId, partnerSubId, txnId) {
  const rows = await db.query(
    `SELECT txn_id, property_txn_id, partner_id, partner_sub_id, partner_name, sub_partner_name, property_name, sub_property_name, facilities, icon_image, no_of_avail_rooms,room_numbers,room_category,room_type, price, units, room_image_1, room_image_2, room_image_3, room_image_4, room_image_5, date_format(date_from,"%d-%m-%Y") as date_from,date_format(date_to,"%d-%m-%Y") as date_to,select_offer,property_specialOffer,enter_amount,other_amenities FROM mh_property_rooms_table WHERE account_id='${accountId}' && partner_id='${partnerId}' && partner_sub_id='${partnerSubId}' && property_txn_id='${txnId}'`
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

async function travelfoodDetails(account_id, agent_id, agent_sub_id,txn_id) {
  const rows = await db.query(
    `SELECT account_id,item_txn_id,agent_id,agent_sub_id,kitchen_name, kitchen_type,item_name,food_type_id,food_items_name,price,units,food_image,status,date_format(updated_datetime,"%d-%m-%Y") as updated_datetime,partner_status,items_available_from,items_available_to FROM mh_foodpartner_details WHERE account_id = '${account_id}' AND agent_id=${agent_id} AND agent_sub_id=${agent_sub_id} AND txn_id='${txn_id}';`
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

async function loadTravelMedicalEqpData(account_id, equipment_id, equipment_sub_id) {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT txn_id,equipment_id,account_id, equipment_sub_id, agent_name, equipment_sub_name, item_name, price, units, equipment_image,status,medical_store,address,location,city,city_id,special_offer,item_id,units_id,partner_status FROM mh_equipment_location_table WHERE account_id='${account_id}' && equipment_id='${equipment_id}' && equipment_sub_id='${equipment_sub_id}'`
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


async function putTravelEquipmentDetails(
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


async function updateTravelRoomsData(txnID, partner_id, partner_sub_id, data) {
  let amenity_arr = [];
  let amenity_iconArr = [];
  for (let i = 0; i < data.facilities.length; i++) {
    amenity_arr.push(data.facilities[i].amenity_name ?? data.facilities[i]);
    amenity_iconArr.push(data.facilities[i].icon_image);
  }
  let amenities = amenity_arr.toString();
  let amenityIcon = amenity_iconArr.toString();
  let roomNumbers = data.room_numbers.toString();
  const result = await db.query(
    `UPDATE mh_property_rooms_table SET  partner_id=?,partner_sub_id=?, property_name=?, sub_property_name=?, facilities=?, icon_image=?,room_numbers=?, no_of_avail_rooms=?, room_type=?, price=?,other_amenities=?, units=?, date_from=?, date_to=?,room_category=? ,select_offer=?,property_specialOffer=?,enter_amount=?  WHERE txn_id='${txnID}' AND partner_id='${partner_id}' AND partner_sub_id='${partner_sub_id}'`,
    [
      // data.property_txn_id ??"",
      data.partner_id ?? "",
      data.partner_sub_id ?? "",
      data.property_name ?? "",
      data.sub_property_name ?? "",
      amenities ?? "",
      amenityIcon ?? "",
      roomNumbers ?? "",
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
      data.enter_amount ?? "",
    ]
  );

  let message = "Error in Updating Room Details";

  if (result.affectedRows) {
    message = "Room Details Updated successfully";
  }
  return { message };
}



async function createTravelRoomDetails(fields, files, docs, ipAddress) {
  let data = JSON.parse(fields.room_details);
  let amenity_arr = [];
  let amenity_iconArr = [];
  for (let i = 0; i < data.facilities.length; i++) {
    amenity_arr.push(data.facilities[i].amenity_name);
    amenity_iconArr.push(data.facilities[i].icon_image);
  }
  let amenities = amenity_arr.toString();
  let amenityIcon = amenity_iconArr.toString();
  let roomNumbers = data.room_numbers.toString();
  const result = await db.query(
    `INSERT IGNORE INTO mh_property_rooms_table(property_txn_id, partner_id, partner_sub_id, partner_name, sub_partner_name, property_name, sub_property_name, no_of_avail_rooms, room_type, facilities, icon_image,room_numbers, other_amenities,price, units, room_image_1,room_image_2,room_image_3,room_image_4,room_image_5,room_category,date_from,date_to,account_id,select_offer,property_specialOffer,enter_amount,ip_address)VALUES
    (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
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
    amenities ?? "",
    amenityIcon ?? "",
    roomNumbers ?? "",
    data.other_amenities ?? "",
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


async function updateTravelFoodDetails(txnID, agentId, agentSubId, data) {
  // let food_items_list_arr = [];
  // for (let i = 0; i < data.foodItemsList.length; i++) {
  //   food_items_list_arr.push(
  //     data.foodItemsList[i].food_items_name ?? data.foodItemsList[i]
  //   );
  // }

  // let foodItemsList = food_items_list_arr.toString();
  const result = await db.query(
    `UPDATE mh_foodpartner_details SET  account_id=?,agent_id=?, agent_sub_id=?,kitchen_name=?, kitchen_type=?,item_name=?,food_items_name=?,price=?,units=?,partner_status=?,food_image=?,items_available_from=?,items_available_to=? WHERE item_txn_id='${txnID}' AND agent_id='${agentId}' AND agent_sub_id='${agentSubId}'`,
    [
      data.account_id ?? "",
      data.agent_id ?? "",
      data.agent_sub_id ?? "",
      // data.agent_name ?? "",
      // data.sub_Name ?? "",
      // data.address ?? "",
      // data.location ?? "",
      // data.city ?? "",
      // data.city_id ?? "",
      // data.gstin ?? "",
      // data.fssai_no ?? "",
      data.kitchen_name ?? "",
      data.kitchen_type ?? "",
      data.item_name ?? "",
      data.food_items_name ?? "",
      data.price ?? "",
      data.units ?? "",
      //data.special_offer ?? "",
      data.partner_status ?? "",
      data.food_image ?? "",
      data.items_available_from ?? "",
      data.items_available_to?? "",
    ]
  );
  let message = "Error in updating Food Details Registration";

  if (result.affectedRows) {
    message = "Food Details Master updated successfully";
  }

  return { message };
}



async function updateTravelPropertyData(txnID, data) {
  let amenity_nameArr = [];
  let amenityName = amenity_nameArr.toString();
  const result = await db.query(
    `UPDATE mh_property_details_table SET  partner_id=?, partner_sub_id=?, partner_name=?, sub_partner_name=?, partner_phone=?, property_name=?, sub_property_name=?, property_phone=?, property_email=?, property_description=?, property_latitude=?, property_longitude=?, building_no=?, street=?, land_mark=?, country=?, state_id=?, state_name=?, city_id=?, city_name=?, pin_code=?,amenity_name=?,checkIn_time=?, checkOut_time=?, Name_Of_Contact_Person=? WHERE txn_id='${txnID}'`,
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
      data.state_id ?? "",
      data.state_name ?? "",
      data.city_id ?? "",
      data.city_name ?? "",
      data.pin_code ?? "",
      amenityName ?? "",
      data.checkIn_time ?? "",
      data.checkOut_time ?? "",
      data.Name_Of_Contact_Person ?? "",
    ]
  );
  let message = "Error in updating Property Data";

  if (result.affectedRows) {
    message = "Property Data  updated successfully";
  }

  return { message };
}

async function createOtherFood(fields, files, docs, ipAddress) {
  let data = JSON.parse(fields.food_details);
  // let food_items_list_arr = [];
  // for (let i = 0; i < data.foodItemsList.length; i++) {
  //   food_items_list_arr.push(data.foodItemsList[i].food_items_name);
  // }
  // let foodItemsList = food_items_list_arr.toString();
  const result = await db.query(
    `INSERT IGNORE INTO mh_foodpartner_details(account_id,agent_id, agent_sub_id,kitchen_name, kitchen_type,item_name,food_items_name,items_available_from,items_available_to,price,units,partner_status,food_image, ip_address)VALUES
      (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.account_id ?? "",
      data.agent_id ?? "",
      data.agent_sub_id ?? "",
      // data.foodPartner_name ?? "",
      // data.foodPartner_sub_name ?? "",
      // data.address ?? "",
      // data.location ?? "",
      // data.city ?? "",
      // data.city_id ?? "",
      // data.gstin ?? "",
      // data.fssai_no ?? "",
      // data.kitchen_txn_id ??"",
      data.kitchen_name ?? "",
      data.kitchen_type ?? "",
      data.item_name ?? "",
      data.food_items_name ??"",
      data.items_available_from ?? "",
      data.items_available_to?? "",
      data.price ?? "",
      data.units ?? "",
      // data.special_offer ?? "",
      data.partner_status ?? "",
      docs.foodImg_name ?? "",
      ipAddress
    ]
  );

  let message = "Error in Saving Food Details";
  if (result.affectedRows) {
    message = "Food Details Master created successfully";
  }
  return { message };
}



async function createTransportDetails(fields, docs, ipAddress) {
  let data = JSON.parse(fields.transport_details);
  const result = await db.query(
    `INSERT IGNORE INTO mh_transport_details(agent_id, transport_sub_id,account_id, transport_sub_name, agent_name, transport_company_name, special_offer,select_offer,enter_amount,from_date,to_date, transport_phone, transport_email_id,alternatetransport_email_id, Name_Of_Contact_Person, transport_description, building_no, street,land_mark,city_id, city,state_id, state,country,pin_code,transport_latitude,transport_longitude,upload_image1,upload_image2,ip_address)VALUES
    (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
  [
    data.agent_id ?? "",
    data.transport_sub_id ?? "",
    data.account_id ?? "",
    data.transport_sub_name ?? "",
    data.agent_name ?? "",
    data.transport_company_name ?? "",
    data.special_offer ?? "",
    data.select_offer ?? "",
    data.enter_amount ?? "",
    data.from_date ?? "",
    data.to_date ?? "",
    data.transport_phone ?? "",
    data.transport_email_id ?? "",
    data.alternatetransport_email_id ?? "",
    data.Name_Of_Contact_Person ?? "",
    data.transport_description ?? "",
    data.building_no ?? "",
    data.street ?? "",
    data.land_mark ?? "",
    data.city.city_id ?? "",
    data.city.city ?? "",
    data.state.state_id ?? "",
    data.state.state_name ?? "",
    data.country ?? "",
    data.pin_code ?? "",
    data.transport_latitude ?? "",
    data.transport_longitude ?? "",
    docs.upload_image1_name ?? "",
    docs.upload_image2_name ?? "",
    //data.account_id ?? "",
    ipAddress
    ]
  );

  let message = "Error in Saving Transport Details";

  if (result.affectedRows) {
    message = "Transport Details created successfully";
  }
  return { message };
}


async function getTransportDetails(account_id, agent_id, transport_sub_id) {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT  tnx_id,agent_id, transport_sub_id, account_id, transport_sub_name, agent_name, transport_company_name, special_offer,enter_amount,select_offer,  from_date,to_date,transport_phone, transport_email_id, alternatetransport_email_id , Name_Of_Contact_Person, transport_description, building_no, street, land_mark,country, city, state, pin_code, transport_latitude, transport_longitude, upload_image1, upload_image2,	status, ip_address  FROM mh_transport_details WHERE   
    account_id='${account_id}' && agent_id='${agent_id}' && transport_sub_id='${transport_sub_id}'`
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
 // console.log(data);
  
  return {
    data,
  };
}



// async function updateTransportDetails(
//   agent_id,
//   transport_sub_id,
//   tnx_id,
//   data
// ) {
//   const result = await db.query(
//     `UPDATE mh_transport_details SET agent_id=?, transport_sub_id=?, account_id=?, transport_sub_name=?, agent_name=?, transport_company_name=?, special_offer=?,select_offer=?, enter_amount=?,from_date=?,to_date=?, transport_phone=?, transport_email_id=?, Name_Of_Contact_Person=?, transport_description=?, building_no=?, street=?, land_mark=?,country=?, city=?,city_id=?, state=?,state_id=?, pin_code=?, transport_latitude=?, transport_longitude=?,  ip_address=?  WHERE   
//    agent_id='${agent_id}' && transport_sub_id='${transport_sub_id}' && tnx_id='${tnx_id}'`,
//     [
     
//       data.agent_id ?? "",
//       data.transport_sub_id ?? "",
//       data.account_id ?? "",
//       data.transport_sub_name ?? "",
//       data.agent_name ?? "",
//       data.transport_company_name ?? "",
//       data.special_offer ?? "",
//       data.select_offer ?? "",
//       data.enter_amount ?? "",
//       data.from_date ?? "",
//       data.to_date ?? "",
//       data.transport_phone ?? "",
//       data.transport_email_id ?? "",
//       data.Name_Of_Contact_Person ?? "",
//       data.transport_description ?? "",
//       data.building_no ?? "",
//       data.street ?? "",
//       data.land_mark ?? "",
//       data.country ?? "",
//       data.city.city ?? "",
//       data.city.city_id ?? "",
//       data.state.state?? "",
//       data.state.state_id ?? "",
//       data.pin_code ?? "",
//       data.transport_latitude ?? "",
//       data.transport_longitude ?? "",
//       data.ip_address ?? "",
//     ]
//   );

//   let message = "Error in updating Transport Details";

//   if (result.affectedRows) {
//     message = "Transport Details updated successfully";
//   }
//   return { message };
// }

async function updateTransportDetails(
 
  agent_id,
  transport_sub_id,
  tnx_id,
  data,
  docNames
  
) {
  // console.log("dataupdate",data);
  //  console.log("dataupdate",docNames);
  const result = await db.query(

    `UPDATE mh_transport_details SET agent_id=?, transport_sub_id=?, account_id=?, transport_sub_name=?, agent_name=?, transport_company_name=?, special_offer=?,select_offer=?, enter_amount=?,from_date=?,to_date=?, transport_phone=?, transport_email_id=?, Name_Of_Contact_Person=?, transport_description=?, building_no=?, street=?, land_mark=?,country=?, city=?,city_id=?, state=?,state_id=?, pin_code=?, transport_latitude=?, transport_longitude=?,upload_image1=?,upload_image2=?,  ip_address=?  WHERE   
   agent_id='${agent_id}' && transport_sub_id='${transport_sub_id}' && tnx_id='${tnx_id}'`,
    [
     
      data.agent_id ?? "",
      data.transport_sub_id ?? "",
      data.account_id ?? "",
      data.transport_sub_name ?? "",
      data.agent_name ?? "",
      data.transport_company_name ?? "",
      data.special_offer ?? "",
      data.select_offer ?? "",
      data.enter_amount ?? "",
      data.from_date ?? "",
      data.to_date ?? "",
      data.transport_phone ?? "",
      data.transport_email_id ?? "",
      data.Name_Of_Contact_Person ?? "",
      data.transport_description ?? "",
      data.building_no ?? "",
      data.street ?? "",
      data.land_mark ?? "",
      data.country ?? "",
      // data.city.city ?? "",
      // data.city.city_id ?? "",
      // data.state.state?? "",
      // data.state.state_id ?? "",
      data.city ?? "",
      data.city_id ?? "",
      data.state?? "",
      data.state_id ?? "",
      data.pin_code ?? "",
      data.transport_latitude ?? "",
      data.transport_longitude ?? "",
      docNames.upload_image1_name ?? "",
      docNames.upload_image2_name ?? "",
      data.ip_address ?? "",
    ]
  );

  let message = "Error in updating Transport Details";

  if (result.affectedRows) {
    message = "Transport Details updated successfully";
  }
  return { message };
}



async function createAccomodationTransportDetails(fields, docs, ipAddress) {
  let data = JSON.parse(fields.transport_details);
  //console.log(data)
  const result = await db.query(
    `INSERT IGNORE INTO mh_transport_details(agent_id, transport_sub_id,account_id, transport_sub_name, agent_name, transport_company_name, special_offer,select_offer,enter_amount,from_date,to_date, transport_phone, transport_email_id, Name_Of_Contact_Person, transport_description, building_no, street,land_mark,city_id, city,state_id, state,country,pin_code,transport_latitude,transport_longitude,upload_image1,upload_image2,upload_image3,ip_address)VALUES
    (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
  [
    data.agent_id ?? "",
    data.transport_sub_id ?? "",
    data.account_id ?? "",
    data.transport_sub_name ?? "",
    data.agent_name ?? "",
    data.transport_company_name ?? "",
    data.special_offer ?? "",
    data.select_offer ??"",
    data.enter_amount ?? "",
    data.from_date ?? "",
    data.to_date ?? "",
    data.transport_phone ?? "",
    data.transport_email_id ?? "",
    data.Name_Of_Contact_Person ?? "",
    data.transport_description ?? "",
    data.building_no ?? "",
    data.street ?? "",
    data.land_mark ?? "",
    data.city.city_id ?? "",
    data.city.city ?? "",
    data.state.state_id ?? "",
    data.state.state_name ?? "",
    data.country ?? "",
    data.pin_code ?? "",
    data.transport_latitude ?? "",
    data.transport_longitude ?? "",
    docs.upload_image1_name ?? "",
    docs.upload_image2_name ?? "",
    docs.upload_image3_name ?? "",
    //data.account_id ?? "",
    ipAddress
    ]
  );

  let message = "Error in Saving Transport Details";

  if (result.affectedRows) {
    message = "Transport Details created successfully";
  }
  return { message };
}



async function accomodationtransportDetails(account_id, partner_id, partner_sub_id) {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT tnx_id,agent_id, transport_sub_id, account_id, transport_sub_name, agent_name, transport_company_name, special_offer,select_offer,enter_amount, from_date,to_date,transport_phone, transport_email_id, Name_Of_Contact_Person, transport_description, building_no, street, land_mark,country,city_id, city, state, concat(city,"," ,state) as location,concat(building_no,",",street,"," ,state,"," ,city,"," ,country) as address ,pin_code, transport_latitude, transport_longitude, upload_image1, upload_image2,upload_image3, status  FROM mh_transport_details WHERE   
    account_id='${account_id}' && agent_id='${partner_id}' && transport_sub_id='${partner_sub_id}'`
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
  // console.log(data);
  
  return {
    data,
  };
}


async function updateAccoTransportDetails(
  agent_id,
  transport_sub_id,
  tnx_id,
  data
) {
  const result = await db.query(
    `UPDATE mh_transport_details SET agent_id=?, transport_sub_id=?, account_id=?, transport_sub_name=?, agent_name=?, transport_company_name=?, special_offer=?,select_offer=?,enter_amount=?,from_date=?,to_date=?, transport_phone=?, transport_email_id=?, Name_Of_Contact_Person=?, transport_description=?, building_no=?, street=?, land_mark=?,country=?, city=?, state=?, pin_code=?, transport_latitude=?, transport_longitude=?,  ip_address=?  WHERE   
   agent_id='${agent_id}' && transport_sub_id='${transport_sub_id}' && tnx_id='${tnx_id}'`,
    [
      data.agent_id ?? "",
      data.transport_sub_id ?? "",
      data.account_id ?? "",
      data.transport_sub_name ?? "",
      data.agent_name ?? "",
      data.transport_company_name ?? "",
      data.special_offer ?? "",
      data.select_offer ?? "",
      data.enter_amount ?? "",
      data.from_date ?? "",
      data.to_date ?? "",
      data.transport_phone ?? "",
      data.transport_email_id ?? "",
      data.Name_Of_Contact_Person ?? "",
      data.transport_description ?? "",
      data.building_no ?? "",
      data.street ?? "",
      data.land_mark ?? "",
      data.country ?? "",
      data.city.city ?? "",
      data.state.state_name ?? "",
      data.pin_code ?? "",
      data.transport_latitude ?? "",
      data.transport_longitude ?? "",
      data.ip_address ?? "",
    ]
  );

  let message = "Error in updating Transport Details";

  if (result.affectedRows) {
    message = "Transport Details updated successfully";
  }
  return { message };
}

async function saveFoodTransportDetails(fields, docs, ipAddress) {
  let data = JSON.parse(fields.transport_details);
  const result = await db.query(
    `INSERT IGNORE INTO mh_transport_details(agent_id, transport_sub_id,account_id, transport_sub_name, agent_name, transport_company_name, select_offer, special_offer, enter_amount, from_date,to_date, transport_phone, transport_email_id, Name_Of_Contact_Person, transport_description, building_no, street,land_mark, city, state,city_id,state_id,country,pin_code,transport_latitude,transport_longitude,upload_image1,upload_image2,upload_image3,ip_address)VALUES
    (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
  [
    data.agent_id ?? "",
    data.transport_sub_id ?? "",
    data.account_id ?? "",
    data.transport_sub_name ?? "",
    data.agent_name ?? "",
    data.transport_company_name ?? "",
    data.select_offer ?? "",

    data.special_offer ?? "",
    data.enter_amount ?? "",

    data.from_date ?? "",
    data.to_date ?? "",
    data.transport_phone ?? "",
    data.transport_email_id ?? "",
    data.Name_Of_Contact_Person ?? "",
    data.country ?? "",
    data.transport_description ?? "",
    data.building_no ?? "",
    data.street ?? "",
    data.land_mark ?? "",
    data.city.city ?? "",
    data.state.state_name ?? "",
    data.city.city_id ?? "",
    data.state.state_id ?? "",
    data.pin_code ?? "",
    data.transport_latitude ?? "",
    data.transport_longitude ?? "",
    docs.upload_image1_name ?? "",
    docs.upload_image2_name ?? "",
    docs.upload_image3_name ?? "",
    //data.account_id ?? "",
    ipAddress
    ]
  );

  let message = "Error in Saving Transport Details";

  if (result.affectedRows) {
    message = "Transport Details created successfully";
  }
  return { message };
}

async function foodtransportDetails(account_id, agent_id, agent_sub_id) {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT tnx_id,agent_id, transport_sub_id, account_id, transport_sub_name, agent_name, transport_company_name,select_offer, special_offer, enter_amount,from_date,to_date, transport_phone, transport_email_id, Name_Of_Contact_Person, transport_description, building_no, street, land_mark,country,city_id, city,concat(building_no,",",street,"," ,state,"," ,city,"," ,country) as address,concat(state,"," ,city) as location, state, pin_code, transport_latitude, transport_longitude, upload_image1, upload_image2,upload_image3  FROM mh_transport_details WHERE    
    account_id='${account_id}' && agent_id='${agent_id}' && transport_sub_id='${agent_sub_id}'`
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
 // console.log(data);
  
  return {
    data,
  };
}
async function editFoodTransportDetails(
  agent_id,
  transport_sub_id,
  tnx_id,
  data
) {
  const result = await db.query(
    `UPDATE mh_transport_details SET agent_id=?, transport_sub_id=?, account_id=?, transport_sub_name=?, agent_name=?, transport_company_name=?, select_offer=?, special_offer=?, enter_amount=?, from_date=?,to_date=?, transport_phone=?, transport_email_id=?, Name_Of_Contact_Person=?, transport_description=?, building_no=?, street=?, land_mark=?,country=?, city=?, state=?, pin_code=?, transport_latitude=?, transport_longitude=?,  ip_address=?  WHERE   
   agent_id='${agent_id}' && transport_sub_id='${transport_sub_id}' && tnx_id='${tnx_id}'`,
    [
     
      data.agent_id ?? "",
      data.transport_sub_id ?? "",
      data.account_id ?? "",
      data.transport_sub_name ?? "",
      data.agent_name ?? "",
      data.transport_company_name ?? "",
      data.select_offer ?? "",
      data.special_offer ?? "",
      data.enter_amount ?? "",
      data.from_date ?? "",
      data.to_date ?? "",
      data.transport_phone ?? "",
      data.transport_email_id ?? "",
      data.Name_Of_Contact_Person ?? "",
      data.transport_description ?? "",
      data.building_no ?? "",
      data.street ?? "",
      data.land_mark ?? "",
      data.country ?? "",
      data.city.city ?? "",
      data.state.state_name ?? "",
      data.pin_code ?? "",
      data.transport_latitude ?? "",
      data.transport_longitude ?? "",
      data.ip_address ?? "",
    ]
  );

  let message = "Error in updating Transport Details";

  if (result.affectedRows) {
    message = "Transport Details updated successfully";
  }
  return { message };
}

async function saveMedicalTransportDetails(fields, docs, ipAddress) {
  let data = JSON.parse(fields.transport_details);
  //console.log(data)
  const result = await db.query(
    `INSERT IGNORE INTO mh_transport_details(agent_id, transport_sub_id,account_id, transport_sub_name, agent_name, transport_company_name, select_offer, special_offer, enter_amount,from_date,to_date, transport_phone, transport_email_id, Name_Of_Contact_Person, transport_description, building_no, street,land_mark,city_id, city,state_id, state,country,pin_code,transport_latitude,transport_longitude,upload_image1,upload_image2,ip_address)VALUES
    (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
  [
    data.agent_id ?? "",
    data.transport_sub_id ?? "",
    data.account_id ?? "",
    data.transport_sub_name ?? "",
    data.agent_name ?? "",
    data.transport_company_name ?? "",
    data.select_offer ?? "",
    data.special_offer ?? "",
    data.enter_amount ?? "",
    data.from_date ?? "",
    data.to_date ?? "",
    data.transport_phone ?? "",
    data.transport_email_id ?? "",
    data.Name_Of_Contact_Person ?? "",
    data.transport_description ?? "",
    data.building_no ?? "",
    data.street ?? "",
    data.land_mark ?? "",
    data.city.city_id ?? "",
    data.city.city ?? "",
    data.state.state_id ?? "",
    data.state.state_name ?? "",
    data.country ?? "",
    data.pin_code ?? "",
    data.transport_latitude ?? "",
    data.transport_longitude ?? "",
    docs.upload_image1_name ?? "",
    docs.upload_image2_name ?? "",
    //data.account_id ?? "",
    ipAddress
    ]
  );

  let message = "Error in Saving Transport Details";

  if (result.affectedRows) {
    message = "Transport Details created successfully";
  }
  return { message };
}


async function medicaltransportDetails(account_id, equipment_id, equipment_sub_id) {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT tnx_id,agent_id, transport_sub_id, account_id, transport_sub_name, agent_name, transport_company_name, select_offer, special_offer, enter_amount,  from_date,to_date,transport_phone, transport_email_id, Name_Of_Contact_Person, transport_description, building_no, street, land_mark,country, city, state, pin_code, transport_latitude, transport_longitude, upload_image1, upload_image2, ip_address  FROM mh_transport_details WHERE   
    account_id='${account_id}' && agent_id='${equipment_id}' && transport_sub_id='${equipment_sub_id}'`
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
 // console.log(data);
  
  return {
    data,
  };
}

async function editMedicalTransportDetails(
  agent_id,
  transport_sub_id,
  tnx_id,
  data
) {
  const result = await db.query(
    `UPDATE mh_transport_details SET agent_id=?, transport_sub_id=?, account_id=?, transport_sub_name=?, agent_name=?, transport_company_name=?,select_offer=?, special_offer=?, enter_amount=?,from_date=?,to_date=?, transport_phone=?, transport_email_id=?, Name_Of_Contact_Person=?, transport_description=?, building_no=?, street=?, land_mark=?,country=?, city=?, state=?, pin_code=?, transport_latitude=?, transport_longitude=?,  ip_address=?  WHERE   
   agent_id='${agent_id}' && transport_sub_id='${transport_sub_id}' && tnx_id='${tnx_id}'`,
    [
     
      data.agent_id ?? "",
      data.transport_sub_id ?? "",
      data.account_id ?? "",
      data.transport_sub_name ?? "",
      data.agent_name ?? "",
      data.transport_company_name ?? "",
      data.select_offer ??"",
      data.special_offer ?? "",
      data.enter_amount ??"",
      data.from_date ?? "",
      data.to_date ?? "",
      data.transport_phone ?? "",
      data.transport_email_id ?? "",
      data.Name_Of_Contact_Person ?? "",
      data.transport_description ?? "",
      data.building_no ?? "",
      data.street ?? "",
      data.land_mark ?? "",
      data.country ?? "",
      data.city.city ?? "",
      data.state.state_name ?? "",
      data.pin_code ?? "",
      data.transport_latitude ?? "",
      data.transport_longitude ?? "",
      data.ip_address ?? "",
    ]
  );

  let message = "Error in updating Transport Details";

  if (result.affectedRows) {
    message = "Transport Details updated successfully";
  }
  return { message };
}
async function createTravelRestaurantDetails(fields, docs, ipAddress) {
  // console.log("fgfgfgc",fields);
  // console.log("docs",docs);
  // console.log("ipAddress",ipAddress);
  let data = JSON.parse(fields.restaurant_details);

  // console.log("data",data);

  const result = await db.query(
    `INSERT IGNORE INTO mh_restaurant_details_table(txn_id,account_id, agent_id, agent_sub_id, food_partner_name, food_partner_sub_name, food_partner_phone, name_of_kitchen, type_of_kitchen, fssai_no,upload_fssai,select_offer, special_offer,enter_amount,date_from,date_to, restaurant_description, restaurant_phone, restaurant_email, restaurant_latitude, restaurant_longitude, building_no, street, land_mark, country,state_id,state_name,city_id, city_name, pin_code, opening_time, closing_time, Name_Of_Contact_Person, partner_status,upload_image, upload_image1, upload_image2, ip_address)VALUES
    (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
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
    data.select_offer ?? "",
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
async function getTravelRestaurantDetails(accountId, agentId, transportSubId) {
  // console.log("Mahendraaa");
  const rows = await db.query(
    `SELECT txn_id,account_id, agent_id, agent_sub_id, food_partner_name, food_partner_sub_name, food_partner_phone, name_of_kitchen, type_of_kitchen, fssai_no,upload_fssai, select_offer, special_offer,enter_amount, date_from, date_to,restaurant_description, restaurant_phone, restaurant_email, restaurant_latitude, restaurant_longitude, building_no, street, land_mark, country, state_id, state_name, city_id, city_name, pin_code, opening_time, closing_time, Name_Of_Contact_Person, upload_image, upload_image1, upload_image2, ip_address FROM mh_restaurant_details_table WHERE account_id='${accountId}' AND agent_id='${agentId}' AND agent_sub_id='${transportSubId}'`
  );
  const data = helper.emptyOrRows(rows);
  // console.log("data",data);
  return {
    data,
  };
};
async function updateTravelRestaurantDetails(txnID, data) {
  const result = await db.query(
    `UPDATE mh_restaurant_details_table SET agent_id=?, agent_sub_id=?, food_partner_name=?, food_partner_sub_name=?, food_partner_phone=?, name_of_kitchen=?, type_of_kitchen=?, fssai_no=?, select_offer=?, special_offer=?,enter_amount=?, date_from=?, date_to=?, restaurant_description=?, restaurant_phone=?, restaurant_email=?, restaurant_latitude=?, restaurant_longitude=?, building_no=?, street=?, land_mark=?, country=?,state_id=?,state_name=?,city_id=?, city_name=?, pin_code=?, opening_time=?, closing_time=?, Name_Of_Contact_Person=? WHERE txn_id='${txnID}'`,
    [
      
    data.agent_id ?? "",
    data.agent_sub_id ?? "",
    data.food_partner_name ?? "",
    data.food_partner_sub_name ?? "",
    data.food_partner_phone ?? "",
    data.name_of_kitchen ?? "",
    data.type_of_kitchen ?? "",
    data.fssai_no ?? "",
    data.select_offer ?? "",
    data.special_offer ?? "",
    data.enter_amount ??"",
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
    data.state_id ?? "",
    data.state_name ?? "",
    data.city_id ?? "",
    data.city_name ?? "",
    data.pin_code ?? "",
    data.opening_time ?? "",
    data.closing_time ?? "",
    data.Name_Of_Contact_Person ?? "",
    
    ]
  );
  let message = "Error in updating Restaurant Data";

  if (result.affectedRows) {
    message = "Restaurant Data updated successfully";
  }

  return { message };
}

async function getTransportOperationDetails(accountId, partner_id, partner_sub_id) {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
      `SELECT  agent_id, transport_sub_id, account_id, transport_sub_name, agent_name, transport_company_name, select_offer, special_offer, enter_amount, from_date, to_date, transport_phone, transport_email_id, Name_Of_Contact_Person, transport_description, building_no, street, land_mark, country, city_id, city, state_id, state, pin_code, transport_latitude, transport_longitude, upload_image1, upload_image2, status, created_datetime, updated_datetime, ip_address FROM mh_transport_details WHERE account_id='${accountId}' && agent_id='${partner_id}' && transport_sub_id='${partner_sub_id}'`
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

async function getAccTransportOperationDetails(accountId, agentId, transportSubId) {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
      `SELECT  agent_id, transport_sub_id, account_id, transport_sub_name, agent_name, transport_company_name, select_offer, special_offer, enter_amount, from_date, to_date, transport_phone, transport_email_id, Name_Of_Contact_Person, transport_description, building_no, street, land_mark, country, city_id, city, state_id, state, pin_code, transport_latitude, transport_longitude, upload_image1, upload_image2, status, created_datetime, updated_datetime, ip_address FROM mh_transport_details WHERE account_id='${accountId}' && agent_id='${agentId}' && transport_sub_id='${transportSubId}'`
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
async function getFoodTransportOperationDetails(accountId, agent_id, agent_sub_id) {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
      `SELECT  agent_id, transport_sub_id, account_id, transport_sub_name, agent_name, transport_company_name, select_offer, special_offer,enter_amount, from_date, to_date, transport_phone, transport_email_id, Name_Of_Contact_Person, transport_description, building_no, street, land_mark, country, city_id, city, state_id, state, pin_code, transport_latitude, transport_longitude, upload_image1, upload_image2, status, created_datetime, updated_datetime, ip_address FROM mh_transport_details WHERE account_id='${accountId}' && agent_id='${agent_id}' && transport_sub_id='${agent_sub_id}'`
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

async function getMedicaltransportOperationDetails(accountId, equipment_id, equipment_sub_id) {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
      `SELECT  agent_id, transport_sub_id, account_id, transport_sub_name, agent_name, transport_company_name, select_offer, special_offer, enter_amount, from_date, to_date, transport_phone, transport_email_id, Name_Of_Contact_Person, transport_description, building_no, street, land_mark, country, city_id, city, state_id, state, pin_code, transport_latitude, transport_longitude, upload_image1, upload_image2, status, created_datetime, updated_datetime, ip_address FROM mh_transport_details WHERE account_id='${accountId}' && agent_id='${equipment_id}' && transport_sub_id='${equipment_sub_id}'`
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
module.exports = {
  getMultiple,
  getStatusCount,
  getSingleParentTypeDetail,
  create,
  update,
  remove,
  getTransportDataOnStatus,
  getTransportAdminBasedOnStatus,
  transportExistingUser,
  createTransportExistingUser,
  createTravelDetails,
  getTravelLocation,
  getPartnersDataForAdmin,
  getTransportPartnerApproveData,
  getTransportRegAdminMaster,
  getAllTravelDetailsForAdmin,
  getTravelDetails,
  getTravelDetailsForAdmin,
  approveTravelRegDetails,
  rejectTravelRegDetails,
  getTravelpartnerNames,
  getSubTravelpartnerNames,
  updateTravelDetails,
  ledgertravelDetails,
  loadTravelStatus,
  getTravelbookingDetails,
  getTravelData,
  getTravelCartData,
  TravelcityNames,
  createOtherPropertyDetails,
  createOtherMedical,
  createOtherFood,
  otherTravelProperty,
  updateTravelPropertyData,
  createTravelRoomDetails,
  loadTravelRoomsData,
  updateTravelRoomsData,
  loadTravelMedicalEqpData,
  putTravelEquipmentDetails,
  travelfoodDetails,
  updateTravelFoodDetails,
  loadAccTravelSubpartnerNames,
  loadEquipmentTravelSubpartnerNames,
  createTransportDetails,
  getTransportDetails,
  updateTransportDetails,
  createAccomodationTransportDetails,
  accomodationtransportDetails,
  updateAccoTransportDetails,
  saveFoodTransportDetails,
  foodtransportDetails,
  editFoodTransportDetails,
  saveMedicalTransportDetails,
  medicaltransportDetails,
  editMedicalTransportDetails,
  createTravelRestaurantDetails,
  getTravelRestaurantDetails,
  updateTravelRestaurantDetails,
  getTransportOperationDetails,
  getAccTransportOperationDetails,
  loadFoodTravelSubpartnerNames,
  getFoodTransportOperationDetails,
  getMedicaltransportOperationDetails,
  getTravelDisplayCountOfPartner,
  approveTravelDetails,
  rejectTravelDetails,
  approveTrasnportDetails,
  rejectTransportDetails,
  updatingTravellocationDetails,
};
