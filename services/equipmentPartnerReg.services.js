const db = require("./db");
const helper = require("../helper");
const moment = require("moment")
moment.suppressDeprecationWarnings = true;
async function getAllEquipmentDetailsForAdmin(status) {
  console.log("status:-",status);
  if(status != 'all'){
  const rows = await db.query(
    `SELECT equipment_id, equipment_sub_id, agent_name, equipment_sub_name,alternate_no, phone, fax, email_id, agent_commission, description, building_no, street, land_mark, city, country, state, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, accept,pan_card_file_loc,gst_tin_loc,addhaar_no_loc,mh_agreement_loc,mb_certificate_loc,property_tax_loc,fire_safety_loc,cancelled_cheque_doc,status,concat(building_no,",",street,"," ,state,"," ,city,"," ,country) as address,concat(state,"," ,city) as location FROM mh_equipment_master WHERE status ='${status}'`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  var index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      var equipment_count = "";
      if (element.equipment_id) {
        equipment_count = await helper.getCountOfEquipmentId(
          element.equipment_id
        );
        index = index + 1;
      }
      data.push({
        equipment_count: equipment_count,
        index: index,
        ...element,
      });
    }
  }
  return {
    data,
  };
} else if(status == 'all'){
  const rows = await db.query(
    `SELECT equipment_id, equipment_sub_id, agent_name, equipment_sub_name,alternate_no, phone, fax, email_id, agent_commission, description, building_no, street, land_mark, city, country, state, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, accept,pan_card_file_loc,gst_tin_loc,addhaar_no_loc,mh_agreement_loc,mb_certificate_loc,property_tax_loc,fire_safety_loc,cancelled_cheque_doc,status,concat(building_no,",",street,"," ,state,"," ,city,"," ,country) as address,concat(state,"," ,city) as location FROM mh_equipment_master WHERE 1`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  var index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      var equipment_count = "";
      if (element.equipment_id) {
        equipment_count = await helper.getCountOfEquipmentId(
          element.equipment_id
        );
        index = index + 1;
      }
      data.push({
        equipment_count: equipment_count,
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
async function getMedicalDisplayCountOfPartner(status) {
  console.log("status:-",status);
  if(status != 'all'){
  const rows = await db.query(
    `SELECT equipment_id, equipment_sub_id, agent_name, equipment_sub_name,alternate_no, phone, fax, email_id, agent_commission, description, building_no, street, land_mark, city, country, state, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, accept,pan_card_file_loc,gst_tin_loc,addhaar_no_loc,mh_agreement_loc,mb_certificate_loc,property_tax_loc,fire_safety_loc,cancelled_cheque_doc,status,concat(building_no,",",street,"," ,state,"," ,city,"," ,country) as address,concat(state,"," ,city) as location FROM mh_equipment_master WHERE status ='${status}'`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  var index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      var equipment_count = "";
      if (element.equipment_id) {
        equipment_count = await helper.getCountOfEquipmentId(
          element.equipment_id
        );
        index = index + 1;
      }
      data.push({
        equipment_count: equipment_count,
        index: index,
        ...element,
      });
    }
  }
  return {
    data,
  };
} else if(status == 'all'){
  const rows = await db.query(
    `SELECT equipment_id, equipment_sub_id, agent_name, equipment_sub_name,alternate_no, phone, fax, email_id, agent_commission, description, building_no, street, land_mark, city, country, state, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, accept,pan_card_file_loc,gst_tin_loc,addhaar_no_loc,mh_agreement_loc,mb_certificate_loc,property_tax_loc,fire_safety_loc,cancelled_cheque_doc,status,concat(building_no,",",street,"," ,state,"," ,city,"," ,country) as address,concat(state,"," ,city) as location FROM mh_equipment_master WHERE 1`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  var index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      var equipment_count = "";
      if (element.equipment_id) {
        equipment_count = await helper.getCountOfEquipmentId(
          element.equipment_id
        );
        index = index + 1;
      }
      data.push({
        equipment_count: equipment_count,
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

async function getMultiple(params) {
  const rows = await db.query(
    `SELECT equipment_id, equipment_sub_id, agent_name, equipment_sub_name,alternate_no, phone, fax, email_id, agent_commission, description, building_no, street, land_mark, city, country, state, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, accept,pan_card_file_loc,gst_tin_loc,addhaar_no_loc,mh_agreement_loc,mb_certificate_loc,property_tax_loc,fire_safety_loc,cancelled_cheque_doc,status,concat(building_no,",",street,"," ,state,"," ,city,"," ,country) as address,concat(state,"," ,city) as location FROM mh_equipment_master WHERE account_id = '${params}'`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  var index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      var equipment_count = "";
      if (element.equipment_id) {
        equipment_count = await helper.getCountOfEquipmentId(
          element.equipment_id
        );
        index = index + 1;
      }
      data.push({
        equipment_count: equipment_count,
        index: index,
        ...element,
      });
    }
  }
  return {
    data,
  };
}
async function getequipmentpartnerNames(account_id) {
  const rows = await db.query(
    `SELECT equipment_id, equipment_sub_id, agent_name, equipment_sub_name, phone, fax, email_id, agent_commission, description, building_no, street, land_mark, city, country, state, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, accept,pan_card_file_loc,gst_tin_loc,addhaar_no_loc,mh_agreement_loc,mb_certificate_loc,property_tax_loc,fire_safety_loc,cancelled_cheque_doc,status,concat(building_no,",",street,"," ,state,"," ,city,"," ,country) as address,concat(state,"," ,city) as location  FROM mh_equipment_master WHERE status='approved' AND account_id='${account_id}' GROUP BY equipment_id;`
  );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}
async function getSubequipmentpartnerNames(account_id, equipmentId) {
  const rows = await db.query(
    `SELECT txn_id,equipment_id,account_id, equipment_sub_id, agent_name, equipment_sub_name, item_name, price, units, equipment_image,status,medical_store,address,location,city,city_id,special_offer,item_id,units_id,partner_status FROM mh_equipment_location_table WHERE partner_status='approved' && account_id='${account_id}' && equipment_id='${equipmentId}' GROUP BY equipment_sub_id;`
  );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}
async function loadAccEquipmentSubpartnerNames(account_id, partnerID) {
  const rows = await db.query(
    `SELECT partner_id,partner_sub_id, agent_sub_name, building_no, street, land_mark, city, state, country, pin_code FROM mh_property_master WHERE account_id='${account_id}' AND partner_id='${partnerID}'`
  );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}

async function loadfoodEquipmentSubpartnerNames(account_id, agent_id) {
  const rows = await db.query(
    `SELECT account_id,agent_id,agent_name,agent_sub_id,agent_sub_name FROM mh_food_master WHERE account_id = '${account_id}' AND agent_id='${agent_id}' ; `
  );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}

async function loadTravelEquipmentSubpartnerNames(account_id, agent_id) {
  const rows = await db.query(
    `SELECT agent_id, transport_sub_id, transport_sub_name, account_id, status, agent_name, company_name, individual_name, phone, fax, alternate_no, email_id, agent_commission, description, building_no, street, land_mark, city, city_id, country, state, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, cancelled_cheque, pan_loc, gst_tin_loc, addhaar_loc, mh_agreement_loc, partner_pic_loc, mb_certificate_loc, undertaking_certificate, property_tax, fire_safety, accept, remarks, created_datetime, updated_datetime FROM mh_transport_master WHERE status='approved' && account_id='${account_id}' && agent_id='${agent_id}' GROUP BY transport_sub_id;`
  );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}

async function loadmedicalstoreDetails(account_id, partnerID,partnersubid) {
  const rows = await db.query(
    `SELECT txn_id, account_id, equipment_id, equipment_sub_id, agent_name, equipment_sub_name, medical_store_name,select_offer, special_offer,enter_amount, from_date, to_date, description, phone, email, name_of_contact_person, building_no, street, land_mark, country, state_id, state_name, city_id, city_name,concat(building_no,",",street,"," ,state_name,"," ,city_name,"," ,country) as address,concat(state_name,"," ,city_name) as location, pin_code, latitude, longitude, opening_time, closing_time, upload_image1, upload_image2, upload_image3, status, created_datetime, updated_datetime, medical_store_id FROM mh_medical_stores_table WHERE account_id='${account_id}' AND equipment_id='${partnerID}' AND equipment_sub_id='${partnersubid}'`
  );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}
async function loadmedicalDetails(account_id, partnerID,partnersubid) {
  const rows = await db.query(
    `SELECT txn_id, account_id, equipment_id, equipment_sub_id, agent_name, equipment_sub_name, medical_store_name,select_offer, special_offer,enter_amount, from_date, to_date, description, phone, email, name_of_contact_person, building_no, street, land_mark, country, state_id, state_name, city_id, city_name, pin_code, concat(building_no,",",street,"," ,state_name,"," ,city_name,"," ,country) as address,concat(state_name,"," ,city_name) as location,latitude, longitude, opening_time, closing_time, upload_image1, upload_image2, upload_image3, status, created_datetime, updated_datetime, medical_store_id FROM mh_medical_stores_table WHERE account_id='${account_id}' AND equipment_id='${partnerID}' AND equipment_sub_id='${partnersubid}'`
  );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}

async function loadEquipmentmedicalDetails(account_id, partnerID,partnersubid) {
  const rows = await db.query(
    `SELECT txn_id, account_id, equipment_id, equipment_sub_id, agent_name, equipment_sub_name, medical_store_name,select_offer, special_offer,enter_amount, from_date, to_date, description, phone, email, name_of_contact_person, building_no, street, land_mark, country, state_id, state_name, city_id, city_name, pin_code,concat(building_no,",",street,"," ,state_name,"," ,city_name,"," ,country) as address,concat(state_name,"," ,city_name) as location,latitude, longitude, opening_time, closing_time, upload_image1, upload_image2, upload_image3, status, created_datetime, updated_datetime, medical_store_id FROM mh_medical_stores_table WHERE account_id='${account_id}' AND equipment_id='${partnerID}' AND equipment_sub_id='${partnersubid}'`
  );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}
async function loadfoodmedicalDetails(account_id, partnerID,partnersubid) {
  const rows = await db.query(
    `SELECT txn_id, account_id, equipment_id, equipment_sub_id, agent_name, equipment_sub_name, medical_store_name,select_offer, special_offer,enter_amount, from_date, to_date, description, phone, email, name_of_contact_person, building_no, street, land_mark, country, state_id, state_name, city_id, city_name, pin_code, concat(building_no,",",street,"," ,state_name,"," ,city_name,"," ,country) as address,concat(state_name,"," ,city_name) as location,latitude, longitude, opening_time, closing_time, upload_image1, upload_image2, upload_image3, status, created_datetime, updated_datetime, medical_store_id FROM mh_medical_stores_table WHERE account_id='${account_id}' AND equipment_id='${partnerID}' AND equipment_sub_id='${partnersubid}'`
  );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}
async function loadEquipmentItems(equipment_item_id) {
  const rows = await db.query(
    `SELECT units FROM mh_equipment_items_details WHERE equipment_item_id='${equipment_item_id}' ;`
  );
  // const sql =
  //   `SELECT units FROM mh_equipment_items_details WHERE item_name=${item_name} GROUP BY equipment_id;`
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}
async function loadEquipmentStatus(
  equipment_id,
  equipment_sub_id,
  txn_id,
  data
) {
  var equipmentstatus = data.status == true ? "yes" : "no";
  const result = await db.query(
    `UPDATE mh_equipment_location_table SET  status=?,txn_id=? WHERE equipment_id='${equipment_id}' && equipment_sub_id='${equipment_sub_id}' && txn_id='${txn_id}' `,
    [equipmentstatus, data.txn_id ?? ""]
  );
  let message = "Error while changing the Equipment details status Data";

  if (result.affectedRows) {
    message = "Equipment Status Changed Successfully";
  }

  return { message };
}
async function saveMedicalStoresData(data, docs,ipAddress) {
  console.log("backend",data,docs)
  const result = await db.query(
    `INSERT IGNORE INTO mh_medical_stores_table(account_id, equipment_id, equipment_sub_id, agent_name,equipment_sub_name,medical_store_name,medical_store_id, select_offer, special_offer,enter_amount,	from_date,to_date, description, phone, email, name_of_contact_person, building_no, street, land_mark, country, state_id, state_name, city_id, city_name, pin_code, latitude, longitude, opening_time, closing_time, upload_image1,upload_image2,upload_image3, ip_address)VALUES
    (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.account_id ?? "",
      data.equipment_id ?? "",
      data.equipment_sub_id ?? "",
      data.agent_name ?? "",
      data.equipment_sub_name ?? "",
      data.medical_store_name.medical_store_name ?? "",
      data.medical_store_name.medical_store_id ?? "",
      data.select_offer ?? "",
      data.special_offer ?? "",
      data.enter_amount ?? "",
      data.date_from ?? "",
      data.date_to ?? "",
      data.description ?? "",
      data.phone ?? "",
      data.email_id ?? "",
      data.name_Of_Contact_Person ?? "",
      data.building_no ?? "",
      data.street ?? "",
      data.land_mark ?? "",
      data.country ?? "",
      data.state.state_id ?? "",

      data.state.state_name ?? "",
      data.city.city_id?? "",

      data.city.city ?? "",
      data.pin_code ?? "",
      data.latitude ?? "",
      data.longitude ?? "",
      data.opening_time ?? "",
      data.closing_time ?? "",
      docs.equipmentImageName_1 ?? "",
      docs.equipmentImageName_2 ?? "",
      docs.equipmentImageName_3 ?? "",
      ipAddress
    //  data.ip_address
    ]
  );

  let message = "Error in Saving Equipment Details";

  if (result.affectedRows) {
    message = "Equipment Details created successfully";
  }
  return { message };
}
async function ledgerEquipmentDetails(data) {
  var equipmentstatus = data.status == true ? "yes" : "no";
  const result = await db.query(
    `INSERT IGNORE INTO mh_equipment_location_ledger_table(txn_id,equipment_id, equipment_sub_id,account_id, agent_name, equipment_sub_name, item_name, price,units,medical_store,address,city,city_id,location,special_offer,equipment_image,partner_status,status)VALUES
    (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.txn_id ?? "",
      data.equipment_id ?? "",
      data.equipment_sub_id ?? "",
      data.account_id ?? "",
      data.agent_name ?? "",
      data.equipment_sub_name ?? "",
      data.item_name ?? "",
      data.price ?? "",
      data.units ?? "",
      data.medical_store ?? "",
      data.address ?? "",
      data.city ?? "",
      data.city_id ?? "",
      data.location ?? "",
      data.special_offer ?? "",
      data.equipment_image ?? "",
      data.partner_status ?? "",
      equipmentstatus ?? "",
    ]
  );

  let message = "Error in Saving Equipment Details";

  if (result.affectedRows) {
    message = "Equipment Details created successfully";
  }
  return { message };
}
async function getMultipleAccomodation() {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT equipment_id, equipment_sub_id, agent_name, equipment_sub_name,company_name,individual_name, phone, fax, email_id, agent_commission, description, building_no, street, land_mark, city, country, state, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, accept,pan_card_file_loc,gst_tin_loc,addhaar_no_loc,mh_agreement_loc,mb_certificate_loc,property_tax_loc,fire_safety_loc,cancelled_cheque_doc,status,concat(building_no,",",street,"," ,state,"," ,city,"," ,country) as address,concat(state,"," ,city) as location FROM mh_equipment_master GROUP BY equipment_id`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      var equipment_count = "";
      if (element.equipment_id) {
        equipment_count = await helper.getCountOfEquipmentId(
          element.equipment_id
        );
      }
      data.push({
        equipment_count: equipment_count,
        ...element,
      });
    }
  }
  return {
    data,
  };
}
async function getMedicalEqpData(account_id, equipment_id, equipment_sub_id) {
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
async function getEquipmentLocation(
  account_id,
  equipment_id,
  equipment_sub_id
) {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT txn_id,equipment_id,account_id, equipment_sub_id, agent_name, equipment_sub_name, item_name, price, units, equipment_image,status,medical_store,address,location,city,city_id,special_offer,item_id,units_id,partner_status,purchased_type FROM mh_equipment_location_table WHERE account_id='${account_id}' && equipment_id='${equipment_id}' && equipment_sub_id='${equipment_sub_id}'`
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

async function getEquipmentApproval(equipment_id, equipment_sub_id) {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT txn_id,equipment_id, equipment_sub_id, agent_name, equipment_sub_name, item_name, price, units, equipment_image,special_offer,item_id,units_id,partner_status FROM mh_equipment_location_table WHERE equipment_id=${equipment_id} && equipment_sub_id=${equipment_sub_id}`
  );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}
async function getequipmentRegistrationMaster() {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(`SELECT * FROM mh_equipment_master WHERE 1`);
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}
async function getMedicalPartnersForAdmin() {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT account_id, equipment_id, equipment_sub_id, agent_name, equipment_sub_name,company_name,individual_name, phone, fax, email_id, agent_commission, description, building_no, street, land_mark, city, country, state, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, accept,pan_card_file_loc,gst_tin_loc,addhaar_no_loc,mh_agreement_loc,mb_certificate_loc,property_tax_loc,fire_safety_loc,cancelled_cheque_doc,status,concat(building_no,",",street,"," ,state,"," ,city,"," ,country) as address,concat(state,"," ,city) as location FROM mh_equipment_master WHERE status="verified"`
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
async function approvedMedPartnersForAdmin() {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT account_id, equipment_id, equipment_sub_id, agent_name, equipment_sub_name, company_name,individual_name, phone, fax, email_id, agent_commission, description, building_no, street, land_mark, city, country, state, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, accept,pan_card_file_loc,gst_tin_loc,addhaar_no_loc,mh_agreement_loc,mb_certificate_loc,property_tax_loc,fire_safety_loc,cancelled_cheque_doc,status,concat(building_no,",",street,"," ,state,"," ,city,"," ,country) as address,concat(state,"," ,city) as location FROM mh_equipment_master WHERE status="approved"`
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
async function getEquipmentItemsForAdmin(
  accountId,
  equipmentId,
  equipmentSubId
) {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT txn_id,equipment_id,account_id, equipment_sub_id, agent_name, equipment_sub_name, item_name, price, units, equipment_image,status,address,location,special_offer,item_id,units_id,partner_status,medical_store_status FROM mh_equipment_location_table WHERE account_id='${accountId}' && equipment_id='${equipmentId}' && equipment_sub_id='${equipmentSubId}'`
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

async function getEquipmentPartnerRegApproval() {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM mh_equipment_master  WHERE status= 'approved'`
  );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}

async function existingUserProperty(params) {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT equipment_id, equipment_sub_id, agent_name, equipment_sub_name,company_name,individual_name, phone, fax, email_id, agent_commission, description, building_no, street, land_mark, city, city_id, country, state, state_id, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, accept,pan_card_file_loc,gst_tin_loc,addhaar_no_loc,mh_agreement_loc,mb_certificate_loc,property_tax_loc,fire_safety_loc,cancelled_cheque_doc,status,concat(building_no,",",street,"," ,state,"," ,city,"," ,country) as address,concat(state,"," ,city) as location FROM mh_equipment_master WHERE equipment_id='${params}'`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];

  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      var equipment_count = "";
      if (element.equipment_id) {
        equipment_count = await helper.getCountOfEquipmentId(
          element.equipment_id
        );
      }
      data.push({
        equipment_count: equipment_count,
        ...element,
      });
    }
  }
  return {
    data,
  };
}
async function getEquipmentDataOnStatus(params, params1) {
  const rows = await db.query(
    `SELECT equipment_id, equipment_sub_id, agent_name, equipment_sub_name, phone, fax, email_id, agent_commission, description, building_no, street, land_mark, city, country, state, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, accept,pan_card_file_loc,gst_tin_loc,addhaar_no_loc,mh_agreement_loc, mb_certificate_loc,property_tax_loc,fire_safety_loc,cancelled_cheque_doc,status,concat(building_no,",",street,"," ,state,"," ,city,"," ,country) as address,concat(state,"," ,city) as location FROM mh_equipment_master WHERE status='${params}' AND account_id = '${params1}'  GROUP BY equipment_id`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      var equipment_count = "";
      if (element.equipment_id) {
        equipment_count = await helper.getCountOfEquipmentId(
          element.equipment_id
        );
      }
      data.push({
        equipment_count: equipment_count,
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
    `SELECT (SELECT COUNT(*) FROM mh_equipment_master WHERE status='pending') AS pcount,(SELECT COUNT(*) FROM mh_equipment_master WHERE status='approved') AS acount,(SELECT COUNT(*) FROM mh_equipment_master WHERE status='verified') AS vcount, (SELECT COUNT(*) FROM mh_equipment_master WHERE status='rejected') AS rcount FROM mh_equipment_master GROUP BY equipment_sub_id;`
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
async function create(fields, files, docs, ipAddress) {
  let data = JSON.parse(fields.equipmentDetails);
  console.log(data,"data");
  let equipmentSubId = await helper.generateEquipmentSUBID();
  // let equipmentSubId = `EQP00${await helper.generateEquipmentSUBID()}`;
  const result = await db.query(
    `INSERT IGNORE INTO mh_equipment_master( equipment_sub_id, agent_name, equipment_sub_name, phone, fax,alternate_no, email_id, description, building_no, street, land_mark, city, city_id, country, state, state_id, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, accept,pan_card_file_loc,gst_tin_loc,addhaar_no_loc,mh_agreement_loc,mb_certificate_loc,property_tax_loc,fire_safety_loc,cancelled_cheque_doc,account_id,ip_address)VALUES
    (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      equipmentSubId ?? "",
      data.name ?? "",
      data.partner_sub_name == "" ?data.name : data.partner_sub_name,
      data.phone ?? "",
      data.fax == "" ? data.phone : data.fax ?? "",
      data.alternate_no ?? "",
      data.email_id ?? "",
      data.description ?? "",
      data.building_no ?? "",
      data.street ?? "",
      data.land_mark ?? "",
      data.city1 == ""?data.city.city : data.city1 ?? "",
      data.city.city_id ?? "",
      data.country.name ?? "",
      data.state1 == "" ?data.state.state_name : data.state1 ?? "",
      data.state.state_id ?? "",
      data.pin_code ?? "",
      data.pan ?? "",
      data.aadhar ?? "",
      data.gstin == ""? data.gst_registration :data.gstin ?? "",
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
      docs.propertyTaxName ?? "",
      docs.fireSafetyName ?? "",
      docs.cancelledChequeName ?? "",
      data.user_id ?? "",
      ipAddress
    ]
  );

  let message = "Error in Equipment Registration Master";

  if (result.affectedRows) {
    message = "Equipment Registration Master created successfully";
  }

  return { message };
}
async function exsistingUserCreate(fields, files, docs, ipAddress) {
  let data = JSON.parse(fields.equipmentDetails);
  let equipmentSubId = await helper.generateEquipmentSUBID();
  // let equipmentSubId = `EQP00${await helper.generateEquipmentSUBID()}`;
  const result = await db.query(
    `INSERT IGNORE INTO mh_equipment_master( equipment_id, equipment_sub_id,account_id,status, agent_name, equipment_sub_name, phone,fax,alternate_no, email_id,agent_commission,description, building_no,street,land_mark,city, city_id, country, state, state_id, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc,pan_card_file_loc,gst_tin_loc,addhaar_no_loc,mh_agreement_loc,mb_certificate_loc,property_tax_loc,fire_safety_loc,cancelled_cheque_doc,accept,remarks, ip_address)VALUES
    (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.equipment_id ?? "",
      equipmentSubId ?? "",
      data.user_id ?? "",
      data.status ?? "",
      data.name??"",
      data.partner_sub_name??"",
      data.phone ?? "",
      data.fax ?? "",
      data.alternate_no ?? "",
      data.email_id ?? "",
      data.agent_commission ?? "",
      data.description ?? "",
      data.building_no ?? "",
      data.street ?? "",
      data.land_mark ?? "",
      data.city.city ?? "",
      data.city.city_id ?? "",
      data.country.name ?? "",
      data.state.state_name ?? "",
      data.state.state_id ?? "",
      data.pin_code ?? "",
      data.pan ?? "",
      data.aadhar ?? "",
      data.gstin ?? "",
      data.bankAccountNo ?? "",
      data.bankName ?? "",
      data.branchName ?? "",
      data.ifsc ?? "",
      docs.panCardName ?? "",
      docs.gstInName ?? "",
      docs.addhaarName ?? "",
      docs.mhAgreementName ?? "",
      docs.mbCertificateName ?? "",
      docs.propertyTaxName ?? "",
      docs.fireSafetyName ?? "",
      docs.cancelledChequeName ?? "",
      data.accept ?? "",
      data.remarks ?? "",
      ipAddress
    ]
  );
  let message = "Error in Equipment Registration Master";

  if (result.affectedRows) {
    message = "Equipment Registration Master created successfully";
  }
  return { message };
}

async function createEquipmentLocation(fields, files, docs, ipAddress) {
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
      data.city.city ?? "",
      data.city.city_id ?? "",
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

async function update(id, update) {
  const result = await db.query(
    `UPDATE mht_hotels 
      SET  parent_type_name=?
      WHERE parent_type_id=?`,
    [update.parent_type_name, update.parent_type_id]
  );

  let message = "Error in updating Equipment Registration Master";

  if (result.affectedRows) {
    message = "Equipment Registration Master updated successfully";
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(
    `DELETE FROM mht_hotels WHERE parent_type_id=?`,
    [id]
  );

  let message = "Error in deleting Equipment Registration Master";

  if (result.affectedRows) {
    message = "Equipment Registration Master deleted successfully";
  }

  return { message };
}

async function updateDetails(
  userId,
  equipmentId,
  equipmentSubid,
  agentName,
  equipmentSubName,
  data
) {
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
    `UPDATE mh_equipment_master SET account_id=?, equipment_id=?, equipment_sub_id=?,agent_name=?,equipment_sub_name=?,phone=?, fax=?,alternate_no=?,email_id=?,description=?, building_no=?, street=?, land_mark=?, city=?, city_id=?, country=?, state=?, state_id=?, pin_code=?,pan=?, aadhar=?, gstin=?, bankAccountNo=?, bankName=?, branchName=?, ifsc=?, accept=?, account_id=?, pan_card_file_loc=?, addhaar_no_loc=?, mh_agreement_loc=?, mb_certificate_loc=?, gst_tin_loc=?, property_tax_loc=?, fire_safety_loc=?, cancelled_cheque_doc=?  WHERE account_id='${userId}' AND equipment_id='${equipmentId}' AND equipment_sub_id='${equipmentSubid}'`,
    [
      data.user_id ?? "",
      data.equipment_id ?? "",
      data.equipment_sub_id ?? "",
      equipmentSubName ==equipmentSubName ? equipmentSubName : agentName,
      data.name ?? "",
      // data.company_name ?? "",
      // data.individual_name?? "",
      data.phone ?? "",
      data.fax ?? "",
      data.alternate_no ??"",
      data.email_id ?? "",
      // data.agent_commission ?? "",
      data.description ?? "",
      data.building_no ?? "",
      data.street ?? "",
      data.land_mark ?? "",
      data.prevcity == data.city ? data.city : city,
      data.city.city_id ?? 0,
      data.country.name ?? data.country,
      data.prevstate == data.state ?data.state :state,
      data.state.state_id ?? 0,
      data.pin_code ?? "",
      data.pan ?? "",
      data.aadhar ?? "",
      data.gstin ?? "",
      data.bankAccountNo ?? "",
      data.bankName ?? "",
      data.branchName ?? "",
      data.ifsc ?? "",
      data.accept ?? "",
      data.user_id ?? "",
      data.pan_card_upt ?? "",
      data.addhaar_no_upt ?? "",
      data.mh_agreement_upt ?? "",
      data.mb_certificate_upt ?? "",
      data.gst_tin_upt ?? "",
      data.property_tax_upt ?? "",
      data.fire_safety_upt ?? "",
      data.cancelled_cheque_upt ?? "",
    ]
  );
  if (agentName == equipmentSubName) {
    const result2 = await db.query(
      `UPDATE mh_equipment_master SET agent_name=? WHERE equipment_id='${equipmentId}'`,
      [equipmentSubName == equipmentSubName ? data.partner_sub_name : agentName]
    );
    let message = "Error in updating Equipment Registration Master";
    if (result2.affectedRows) {
      message = "Equipment Registration Master updated successfully";
    }
    return { message };
  }

  let message = "Error in updating Equipment Registration Master";

  if (result1.affectedRows) {
    message = "Equipment Registration Master updated successfully";
  }
  return { message };
}
async function createEquipmentReg(data) {
  // let equipmentSubId = await helper.generateEquipmentSUBID();
  let equipmentSubId = `EQP00${await helper.generateEquipmentSUBID()}`;
  // var status_accept = data.accept == true ? "yes" : "no";
  const result = await db.query(
    `INSERT IGNORE INTO mh_equipment_master( equipment_id, equipment_sub_id, agent_name, company_name,individual_name, phone, fax, email_id, description, building_no, street, land_mark, city, country, state, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, accept)VALUES
      (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.equipment_id ?? "",
      equipmentSubId ?? "",
      data.company_name ?? "",
      data.individual_name?? "",
      data.phone ?? "",
      data.fax ?? "",
      data.email_id ?? "",
      data.description ?? "",
      data.building_no ?? "",
      data.street ?? "",
      data.land_mark ?? "",
      data.city ?? "",
      data.country ?? "",
      data.state ?? "",
      data.pin_code ?? "",
      data.pan ?? "",
      data.aadhar ?? "",
      data.gstin ?? "",
      data.bankAccountNo ?? "",
      data.bankName ?? "",
      data.branchName ?? "",
      data.ifsc ?? "",
      data.accept ?? "",
    ]
  );

  let message = "Error in Equipment Registration Master";

  if (result.affectedRows) {
    message = "Equipment Registration Master created successfully";
  }

  return { message };
}
async function getMultipleEquipmentDetails() {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT agent_name,company_name,individual_name, phone, fax, email_id, agent_commission, description, building_no, street, land_mark, city, country, state, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, accept FROM mh_equipment_master WHERE 1`
  );
  const data = helper.emptyOrRows(rows);
  //   const meta = { page };

  return {
    data,
  };
}
async function putEquipmentDetails(
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

async function approveEquipmentRegDetails(
  equipment_id,
  equipment_sub_id,
  update
) {
  let result = await db.query(
    `UPDATE mh_equipment_master SET status=?, remarks=? WHERE equipment_id='${equipment_id}' AND equipment_sub_id='${equipment_sub_id}'`,
    ["approved", update.remarks]
  );
  var result2 = await db.query(
    `UPDATE mh_equipment_location_table SET partner_status=? WHERE equipment_id='${equipment_id}' AND equipment_sub_id='${equipment_sub_id}'`,
    ["approved"]
  );
  let message = "Error in Approving Equipment Data";

  if (result.affectedRows && result2.affectedRows) {
    message = "Equipment data Approving successfully";
  }

  return { message };
}
async function approveMedicalstoreDetails(
  equipment_id,
  equipment_sub_id,
  txn_id,
  update
) {

  // let result = await db.query(
  //   `UPDATE mh_equipment_master SET status=?, remarks=? WHERE equipment_id='${equipment_id}' AND equipment_sub_id='${equipment_sub_id}'`,
  //   ["approved", update.remarks]
  // );
  var result2 = await db.query(
    `UPDATE mh_medical_stores_table SET 	medical_store_status=?,remarks=? WHERE equipment_id='${equipment_id}' AND equipment_sub_id='${equipment_sub_id}'AND txn_id='${txn_id}'`,
    ["approved", update.medical_store_remarks]
  );
  let message = "Error in Approving Equipment Data";

  if (result2.affectedRows) {
    message = "Equipment data Approving successfully";
  }

  return { message };
}
async function rejectMedicalstoreDetails(
  equipment_id,
  equipment_sub_id,
  txn_id,
  update
) {
  const result = await db.query(
    `UPDATE mh_medical_stores_table SET medical_store_status=?, remarks=? WHERE equipment_id='${equipment_id}' AND equipment_sub_id='${equipment_sub_id}'AND txn_id='${txn_id}'`,
    ["rejected", update.medical_store_remarks]
  );
  let message = "Error in rejecting Equipment Data";

  if (result.affectedRows) {
    message = "Equipment data Rejected successfully";
  }

  return { message };
}

async function approveEquipmentDetails(
  equipment_id,
  equipment_sub_id,
  txn_id,
  update
) {
  // console.log("updateequipmentapp",update);
  // console.log("txn_id",txn_id);
  // let result = await db.query(
  //   `UPDATE mh_equipment_master SET status=?, remarks=? WHERE equipment_id='${equipment_id}' AND equipment_sub_id='${equipment_sub_id}'`,
  //   ["approved", update.remarks]
  // );
  var result2 = await db.query(
    `UPDATE mh_equipment_location_table SET 	medical_store_status=?,remarks=? WHERE equipment_id='${equipment_id}' AND equipment_sub_id='${equipment_sub_id}'AND txn_id='${txn_id}'`,
    ["approved", update.equipment_remarks]
  );
  let message = "Error in Approving Equipment Data";

  if (result2.affectedRows) {
    message = "Equipment data Approving successfully";
  }

  return { message };
}
async function rejectEquipmentDetails(
  equipment_id,
  equipment_sub_id,
  txn_id,
  update
) {
  const result = await db.query(
    `UPDATE mh_equipment_location_table SET medical_store_status=?, remarks=? WHERE equipment_id='${equipment_id}' AND equipment_sub_id='${equipment_sub_id}'AND txn_id='${txn_id}'`,
    ["rejected", update.equipment_remarks]
  );
  let message = "Error in rejecting Equipment Data";

  if (result.affectedRows) {
    message = "Equipment data Rejected successfully";
  }

  return { message };
}

// async function getEquipmentBookingDetails(params, array) {
//   const rows = await db.query(
//     `SELECT txn_id,equipment_id,account_id, equipment_sub_id, agent_name, equipment_sub_name, item_name, price, units, equipment_image,status,medical_store,address,location,city,city_id,special_offer,item_id,units_id,partner_status FROM mh_equipment_location_table WHERE status='yes' AND partner_status='Approved' AND city_id ='${params}' AND item_id IN (${array}) GROUP BY equipment_sub_id`
//   );
//   const data = helper.emptyOrRows(rows);
//   return {
//     data,
//   };
// }
async function getEquipmentBookingDetails(params) {
  const rows = await db.query(
    `SELECT  txn_id, account_id, equipment_id, equipment_sub_id, agent_name, equipment_sub_name, medical_store_name,select_offer, special_offer,enter_amount, from_date, to_date, description, phone, email, name_of_contact_person, building_no, street, land_mark, country, state_id, state_name, city_id, city_name, pin_code, latitude, longitude, opening_time, closing_time, upload_image1, upload_image2, upload_image3, status, created_datetime, medical_store_id,updated_datetime,concat(building_no,",",street,"," ,state_name,"," ,city_name,"," ,country) as address,concat(state_name,"," ,city_name) as location FROM mh_medical_stores_table WHERE status='approved' AND city_id ='${params}' `
  );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}
async function getMedicalStoresData(accountId, equipment_id, equipment_sub_id) {
  const rows = await db.query(
    `SELECT account_id,txn_id, equipment_id, equipment_sub_id, agent_name, equipment_sub_name, medical_store_name,select_offer, special_offer,enter_amount,from_date,	to_date, description, phone, email, name_of_contact_person, building_no, street, land_mark, country, state_id, state_name, city_id, city_name,concat(building_no,",",street,"," ,state_name,"," ,city_name,"," ,country) as address,concat(state_name,"," ,city_name) as location, pin_code, latitude, longitude, opening_time, closing_time, upload_image1, upload_image2, upload_image3,medical_store_id ,status,remarks,medical_store_status FROM mh_medical_stores_table WHERE account_id='${accountId}' AND equipment_id='${equipment_id}' AND equipment_sub_id=${equipment_sub_id}`
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
async function getBookingEquipmentTypes(
  equipment_id,
  equipment_sub_id,
  account_id,
) {
  const rows = await db.query(
    `SELECT txn_id,equipment_id,account_id, equipment_sub_id, agent_name, equipment_sub_name, item_name, price, units, equipment_image,status,medical_store,address,location,city,city_id,special_offer,item_id,units_id,partner_status  FROM mh_equipment_location_table WHERE equipment_id = '${equipment_id}' AND equipment_sub_id = '${equipment_sub_id}' AND status = 'yes' AND account_id='${account_id}'`
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

async function getMedicalItems(equipment_id, equipment_sub_id, txn_id) {
  const rows = await db.query(
    `SELECT txn_id,equipment_id,account_id, equipment_sub_id, agent_name, equipment_sub_name, item_name, price, units, equipment_image,status,medical_store,address,location,city,city_id,special_offer,item_id,units_id,partner_status  FROM mh_equipment_location_table WHERE  equipment_id = ${equipment_id} AND equipment_sub_id = ${equipment_sub_id} AND txn_id=${txn_id};`
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

async function rejectEquipmentRegDetails(
  equipment_id,
  equipment_sub_id,
  update
) {
  const result = await db.query(
    `UPDATE mh_equipment_master SET status=?, remarks=? WHERE equipment_id='${equipment_id}' AND equipment_sub_id='${equipment_sub_id}'`,
    ["rejected", update.remarks]
  );
  let message = "Error in rejecting Equipment Data";

  if (result.affectedRows) {
    message = "Equipment data Rejected successfully";
  }

  return { message };
}
async function createPropertyPartnerDetails(fields, files, docs, ipAddress) {
  let data = JSON.parse(fields.property_details);
  console.log("3",data)
  let amenity_nameArr = [];
  let amenity_iconArr = [];
  for (let i = 0; i < data.facilities.length; i++) {
    amenity_nameArr.push(data.facilities[i].amenity_name);
    amenity_iconArr.push(data.facilities[i].icon_image);
  }
  let amenityName = amenity_nameArr.toString();
  let amenityIcon = amenity_iconArr.toString();
  const result = await db.query(

    // `txn_id`, `account_id`, `partner_id`, `partner_sub_id`, `partner_name`, `sub_partner_name`, `partner_phone`, `property_id`, `property_name`, `sub_property_name`, `property_phone`, `property_email`, `property_description`, `property_latitude`, `property_longitude`, `building_no`, `street`, `land_mark`, `country`, `state_id`, `state_name`, `city_id`, `city_name`, `pin_code`, `amenity_name`, `amenity_icon`, `checkIn_time`, `checkOut_time`, `Name_Of_Contact_Person`, `upload_image`, `upload_image1`, `upload_image2`, `upload_image3`, `upload_image4`, `remarks`, `property_status`, `ip_address`



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
    data.city.city?? "",
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
async function rejectEquipmentRegDetails(
  equipment_id,
  equipment_sub_id,
  update
) {
  const result = await db.query(
    `UPDATE mh_equipment_master SET status=?, remarks=? WHERE equipment_id='${equipment_id}' AND equipment_sub_id='${equipment_sub_id}'`,
    ["rejected", update.remarks]
  );
  let message = "Error in rejecting Equipment Data";

  if (result.affectedRows) {
    message = "Equipment data Rejected successfully";
  }

  return { message };
}
async function createFoodPartnerDetails(fields, files, docs, ipAddress) {
  let data = JSON.parse(fields.food_details);
  // console.log("eqpdata",data);
  const result = await db.query(
    `INSERT IGNORE INTO mh_foodpartner_details(item_txn_id, txn_id, agent_id, agent_sub_id, foodPartner_name, foodPartner_sub_name, account_id, kitchen_name, kitchen_type, item_name, items_available_from, items_available_to, food_type_id, food_items_name, price, units, food_image, fssai_no, status, partner_status, select_offer, special_offer, enter_amount,city_id, city, location, ip_address)VALUES
    (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
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
      data.foodtype?? "",
      data.items_available_from ?? "",
      data.items_available_to?? "",
      data.food_type_id ?? "",
      data.foodName ?? "",
      data.price ?? "",
      data.units ?? "",
      docs.foodImg_name ?? "",
      data.fssai_no ?? "",
      data.status ?? "",
      data.partner_status ?? "",
      data.select_offer ?? "",
      data.special_offer ?? "",
      data.enter_amount ?? "",
      data.city_id ?? "",
      data.city ?? "",
  
      data.location ?? "",
      ipAddress
    ]
  );

  let message = "Error in Saving Food Details";
  if (result.affectedRows) {
    message = "Food Details Master created successfully";
  }
  return { message };
}
async function createPartnerTravelDetails(fields, files, docs, ipAddress) {
  //let transportSubId = await helper.generateTransportSUBID();
  let data = JSON.parse(fields.addTravelLocation);
  const result = await db.query(
    `INSERT IGNORE INTO mh_travel_location_table(agent_id,account_id,transport_sub_id,travel_name,no_of_seaters,transport_sub_name,city_id,city,vehicle_name,day_price,night_price,units,description,vehicle_image,travel_status,ip_address,address,location)
    VALUES
    (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.agent_id ?? "",
      data.account_id ?? "",
      data.transport_sub_id ?? "",
      data.agent_name ?? "",
      data.no_of_seaters ?? "",
      data.transport_sub_name ?? "",
      data.city_id ?? "",
      data.city ?? "",
      data.vehicle_name ?? "",
      data.day_price ?? "",
      data.night_price ?? "",
      data.units ?? "",
      data.description ?? "",
      docs.vehicleImageName ?? "",
      data.travel_status ??"",
      ipAddress,
      data.address ??"",
      data.location??"",
    ]
  );
  let message = "Error in Travel Location  Registration";

  if (result.affectedRows) {
    message = "Travel Location  Registration created successfully";
  }
  return { message };
}
async function getPropertyPartnerData(accountId, equipmentId, equipmentSubId) {
  const rows = await db.query(
    `SELECT txn_id, account_id, partner_id, partner_sub_id, partner_name, sub_partner_name, partner_phone, property_name, sub_property_name, property_phone, property_email, property_description, property_latitude, property_longitude,building_no, street, land_mark, country, state_id, state_name, city_id, city_name, pin_code, amenity_name, checkIn_time,checkOut_time,Name_Of_Contact_Person, upload_image, upload_image1, upload_image2, upload_image3, upload_image4 FROM mh_property_details_table WHERE account_id='${accountId}' AND partner_id='${equipmentId}' AND partner_sub_id='${equipmentSubId}'`
  );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
};
async function getRoomsPropertyDetails(accountId, equipmentId, equipmentSubId, txnId) {
  const rows = await db.query(
    `SELECT txn_id, property_txn_id, partner_id, partner_sub_id, partner_name, sub_partner_name, property_name, sub_property_name, facilities, icon_image, no_of_avail_rooms,room_category,room_type,room_numbers, price, units, room_image_1, room_image_2, room_image_3, room_image_4, room_image_5, date_from,date_to,select_offer,property_specialOffer,enter_amount,other_amenities FROM mh_property_rooms_table WHERE account_id='${accountId}' && partner_id='${equipmentId}' && partner_sub_id='${equipmentSubId}' && property_txn_id='${txnId}'`
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
async function createPropertyRoomDetails(fields, files, docs, ipAddress) {
  let data = JSON.parse(fields.room_details);
  // console.log("1",data)
  let amenity_arr = [];
  let amenity_iconArr = [];
  for (let i = 0; i < data.facilities.length; i++) {
    amenity_arr.push(data.facilities[i].amenity_name);
    amenity_iconArr.push(data.facilities[i].icon_image);
  }
  let amenities = amenity_arr.toString();
  let amenityIcon = amenity_iconArr.toString();
  let roomNumbers = data.room_numbers.toString();
  // console.log("2",roomNumbers )
  const result = await db.query(
    `INSERT IGNORE INTO mh_property_rooms_table(property_txn_id, partner_id, partner_sub_id, partner_name, sub_partner_name, property_name, sub_property_name, no_of_avail_rooms,room_numbers,room_type, facilities, icon_image, other_amenities,price, units, room_image_1,room_image_2,room_image_3,room_image_4,room_image_5,room_category,date_from,date_to,account_id,select_offer,	property_specialOffer,enter_amount,ip_address)VALUES
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
    roomNumbers??"",
    data.room_type ?? "",
    amenities ?? "",
    amenityIcon ?? "",
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
    data.special_offer ?? "",
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
async function updatePartnerDetails(txnID, data) {
  // console.log("data",data)
  const result = await db.query(
  
    `UPDATE mh_property_details_table SET partner_id=?, partner_sub_id=?, partner_name=?, sub_partner_name=?, partner_phone=?, property_name=?, sub_property_name=?, property_phone=?, property_email=?, property_description=?, property_latitude=?, property_longitude=?, building_no=?, street=?, land_mark=?, country=?, state_id=?, state_name=?, city_id=?, city_name=?, pin_code=?,checkIn_time=?, checkOut_time=?, Name_Of_Contact_Person=? WHERE txn_id='${txnID}'`,
    [
      data.partner_id ?? "",
      data.partner_sub_id ?? "",
      data.partner_name ?? "",
      data.sub_partner_name ?? "",
      data.partner_phone ?? "",
      // data.property_id ?? "",
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
      data. state.state_id ?? "",
      data. state.state_name ?? "",
      data.city.city_id ?? "",
      data.city.city ?? "",

      data.pin_code ?? "",
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
async function updatePropertyRoomsData(txnID, partner_id, partner_sub_id, data) {
  let amenity_arr = [];
  let amenity_iconArr = [];
  let room_numbers =[];
  for (let i = 0; i < data.facilities.length; i++) {
    amenity_arr.push(data.facilities[i].amenity_name ?? data.facilities[i]);
    amenity_iconArr.push(data.facilities[i].icon_image);
  }
  let amenities = amenity_arr.toString();
  let amenityIcon = amenity_iconArr.toString();
  let roomNumbers = data.room_numbers.toString();
  let fromDate = moment(data.from_date).format("DD-MM-YYYY")
  let toDate = moment(data.to_date).format("DD-MM-YYYY");
  const result = await db.query(
    `UPDATE mh_property_rooms_table SET  partner_id=?,partner_sub_id=?, property_name=?, sub_property_name=?, facilities=?, icon_image=?, room_numbers=?,no_of_avail_rooms=?,room_type=?, price=?,other_amenities=?, units=?, date_from=?, date_to=?,room_category=? ,select_offer=?,property_specialOffer=?,enter_amount=? WHERE txn_id='${txnID}' AND partner_id='${partner_id}' AND partner_sub_id='${partner_sub_id}'`,
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
      data.date_from ?? "",
      data.date_to ?? "",
      data.room_category ?? "",
      data.select_offer ?? "",

      data.special_offer ?? "",
      data.enter_amount ?? "",
    ]
  );

  let message = "Error in Updating Room Details";

  if (result.affectedRows) {
    message = "Room Details Updated successfully";
  }
  return { message };
}
async function loadFoodDetails(account_id, agent_id, agent_sub_id) {
  const rows = await db.query(
    `SELECT item_txn_id, agent_id, agent_sub_id, account_id, kitchen_name, kitchen_type, item_name, items_available_from, items_available_to, food_type_id, food_items_name, price, units,special_offer,food_image, status, partner_status, updated_datetime, ip_address FROM mh_foodpartner_details WHERE account_id = '${account_id}' AND agent_id=${agent_id} AND agent_sub_id=${agent_sub_id}` 
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
async function travelPartnerUpdating(txnID, agentId, transportSubId, data) {
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
      data.travel_status ??"",
    ]
  );
  let message = "Error in Travel Location  Registration";

  if (result.affectedRows) {
    message = "Travel Location  Registration updated successfully";
  }
  return { message };
}
async function loadTravelDetails(account_id, agent_id, transport_sub_id) {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT txn_id,agent_id,account_id, transport_sub_id,account_id, travel_name, transport_sub_name,city_id,city, 
    vehicle_name,day_price,night_price,no_of_seaters, units, description,special_offer,vehicle_image,travel_status FROM mh_travel_location_table WHERE   
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
async function addFoodDetailsUpdating(txnID, agentId, agentSubId, data) {
  const result = await db.query(
    `UPDATE mh_foodpartner_details SET  account_id=?,agent_id=?, agent_sub_id=?,kitchen_name=?, kitchen_type=?,item_name=?,food_items_name=?,price=?,units=?,food_image=? WHERE item_txn_id='${txnID}' AND agent_id='${agentId}' AND agent_sub_id='${agentSubId}'`,
    [
      data.account_id ?? "",
      data.agent_id ?? "",
      data.agent_sub_id ?? "",
      data.kitchen_name ?? "",
      data.kitchen_type ?? "",
      data.foodtype ??"",
      data.foodName ??"",
      data.price ?? "",
      data.units ?? "",
      data.food_image ?? "",
    ]
  );
  let message = "Error in updating Food Details Registration";

  if (result.affectedRows) {
    message = "Food Details Master updated successfully";
  }

  return { message };
}
async function createEqpRestaurantSaving(fields, docs, ipAddress) {
  
  let data = JSON.parse(fields.restaurant_details);


  const result = await db.query(
    `INSERT IGNORE INTO mh_restaurant_details_table(account_id, agent_id, agent_sub_id, food_partner_name, food_partner_sub_name, food_partner_phone, name_of_kitchen, type_of_kitchen, fssai_no,upload_fssai,select_offer, special_offer,enter_amount,date_from,date_to, restaurant_description, restaurant_phone, restaurant_email, restaurant_latitude, restaurant_longitude, building_no, street, land_mark, country,state_id,state_name,city_id, city_name, pin_code, opening_time, closing_time, Name_Of_Contact_Person, upload_image, upload_image1, upload_image2, ip_address,partner_status)VALUES
    (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
  [
    data.account_id ?? "",
    data.agent_id ?? "",
    data.agent_sub_id ?? "",
    data.food_partner_name ?? "",
    data.food_partner_sub_name ?? "",
    data.food_partner_phone ?? "",
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
    // data.state.state_id ?? "",
    // data.state.state_name ?? "",
    // data.city.city_id ?? "",
    // data.city.city ?? "",
    data.state.state_id ?? data.state_id ,
    data.state.state_name ?? data.state_name,
    data.city.city_id ?? data.city_id,
    data.city.city ?? data.city_name,
    data.pin_code ?? "",
    data.opening_time ?? "",
    data.closing_time ?? "",
    data.Name_Of_Contact_Person ?? "",
    docs.upload_image1_name ?? "",
    docs.upload_image2_name ?? "",
    docs.upload_image3_name ?? "",
    ipAddress,
    data.partner_status ??"",
 ]
  );

  let message = "Error in Saving Medical Restaurant Details";

  if (result.affectedRows) {
    message = "Medical Restaurant Details Master created successfully";
  }
  
  return { message };
}
async function getEqpRestaurantDetails(accountId, eqpId, eqpSubId) {
  const rows = await db.query(
    `SELECT txn_id,account_id, agent_id, agent_sub_id, food_partner_name, food_partner_sub_name, food_partner_phone, name_of_kitchen, type_of_kitchen, fssai_no,upload_fssai, select_offer,special_offer,	enter_amount , date_from, date_to,restaurant_description, restaurant_phone, restaurant_email, restaurant_latitude, restaurant_longitude, building_no, street, land_mark, country, state_id, state_name, city_id, city_name, pin_code, opening_time, closing_time, Name_Of_Contact_Person, upload_image, upload_image1, upload_image2 FROM mh_restaurant_details_table WHERE account_id='${accountId}' AND agent_id='${eqpId}' AND agent_sub_id='${eqpSubId}'`
  );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
};
async function updateEqpRestaurantDetails(txnID, data) {
  const result = await db.query(
    `UPDATE mh_restaurant_details_table SET agent_id=?, agent_sub_id=?, food_partner_name=?, food_partner_sub_name=?, food_partner_phone=?, name_of_kitchen=?, type_of_kitchen=?, fssai_no=?,select_offer=?,special_offer=?,	enter_amount=?, date_from=?, date_to=?, restaurant_description=?, restaurant_phone=?, restaurant_email=?, restaurant_latitude=?, restaurant_longitude=?, building_no=?, street=?, land_mark=?, country=?,state_id=?,state_name=?,city_id=?, city_name=?, pin_code=?, opening_time=?, closing_time=?, Name_Of_Contact_Person=? WHERE txn_id='${txnID}'`,
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
    // data.state_id ?? data.state.state_id ,
    // data.state_name ?? data.state.state_name,
    // data.city_id ?? data.city.city_id,
    // data.city_name ?? data.city.city,
    data.state.state_id ?? data.state_id ,
    data.state.state_name ?? data.state_name,
    data.city.city_id ?? data.city_id,
    data.city.city ?? data.city_name,
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

async function createMedicalStoreDetails(data, docs,ipAddress) {
  // console.log("DDD", data)
  // console.log("docs", docs)
  const result = await db.query(
    `INSERT IGNORE INTO mh_medical_stores_table(txn_id, account_id, equipment_id, equipment_sub_id, agent_name, equipment_sub_name, medical_store_name, medical_store_id, select_offer, special_offer, enter_amount, from_date, to_date, description, phone, email, name_of_contact_person, building_no, street, land_mark, country, state_id, state_name, city_id, city_name, pin_code, latitude, longitude, opening_time, closing_time, upload_image1, upload_image2, upload_image3, status,ip_address)VALUES
    (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.txn_id ??"",
      data.account_id ??"",
      data.equipment_id ??"",
      data.equipment_sub_id ??"",
      data.agent_name ??"",
      data.equipment_sub_name ??"",
      data.medical_store_name.medical_store_name ??"",
      data.medical_store_name.medical_store_id ??"",
      data.select_offer ?? "",
      data.special_offer ??"",
      data.enter_amount ?? "",
      data.date_from??"",
      data.date_to??"",
      data.description ??"",
      data.phone ??"",
      data.email_id??"",
      data.name_Of_Contact_Person ??"",
      data.building_no ??"",
      data.street ??"",
      data.land_mark ??"",
      data.country ??"",
      data.state.state_id ??"",
      data.state.state_name ??"",
      data.city.city_id ??"",
      data.city.city ??"",
      data.pin_code ??"",
      data.latitude ??"",
      data.longitude ??"",
      data.opening_time ??"",
      data.closing_time ??"",
      docs.equipmentImageName_1 ??"",
      docs.equipmentImageName_2 ??"",
      docs.equipmentImageName_3 ??"",
      data.partner_status ??"",
      ipAddress
    ]
  );

  let message = "Error in Saving Equipment Details";

  if (result.affectedRows) {
    message = "Equipment Details created successfully";
  }
  return { message };
}
async function getAccMedicalStoresData(account_id, partner_id, partner_sub_id) {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT  txn_id, account_id, equipment_id, equipment_sub_id, agent_name, equipment_sub_name, medical_store_name,select_offer, special_offer,enter_amount, from_date, to_date, description, phone, email, name_of_contact_person, building_no, street, land_mark, country, state_id, state_name, city_id, city_name,concat(building_no,",",street,"," ,state_name,"," ,city_name,"," ,country) as address,concat(state_name,"," ,city_name) as location, pin_code, latitude, longitude, opening_time, closing_time, upload_image1, upload_image2, upload_image3, ip_address,status FROM mh_medical_stores_table WHERE   
    account_id='${account_id}' && equipment_id='${partner_id}' && equipment_sub_id='${partner_sub_id}'`
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
  
  return {
    data,
  };
}

async function updateAccMedicalStoreDetails(
  equipment_id,
  equipment_sub_id,
  txn_id,
  data
   
)


 {
  const result = await db.query(
    `UPDATE mh_medical_stores_table SET  txn_id=?, account_id=?, equipment_id=?, equipment_sub_id=?, agent_name=?, equipment_sub_name=?, medical_store_name=?,select_offer=?, special_offer=?, enter_amount=?, from_date=?, to_date=?, description=?, phone=?, email=?, name_of_contact_person=?, building_no=?, street=?, land_mark=?, country=?,state_id=?, state_name=?,city_id=? ,city_name=?, pin_code=?, latitude=?, longitude=?, opening_time=?, closing_time=? ,upload_image1=?,upload_image2=?,upload_image3=?,ip_address=? WHERE equipment_id='${equipment_id}' && equipment_sub_id='${equipment_sub_id}' && txn_id='${txn_id}'`,
    
    [
      
      data.txn_id  ?? "",
      data.account_id ?? "",
      data.equipment_id ?? "",
      data.equipment_sub_id ?? "",
      data.agent_name ?? "",
      data.equipment_sub_name ?? "",
      data.medical_store_name ?? "",
      data.select_offer ?? "",
      data.special_offer ?? "",
      data.enter_amount ?? "",
      data.from_date ?? "",
      data.to_date?? "" ,
      data.description?? "" ,
      data.phone ?? "",
      data.email ?? "",
      data.name_of_contact_person?? "" ,
      data.building_no ?? "",
      data.street ?? "",
      data.land_mark ?? "",
      data.country ?? "",
      data.state.state_id ?? "",
      data.state.state_name?? "" ,
      data.city.city_id?? "" ,
      data.city.city?? "",
      data.pin_code?? "" ,
      data.latitude ?? "",
      data.longitude ?? "",
      data.opening_time ?? "",
      data.closing_time ?? "",
      data.upload_image1 ?? "",
      data.upload_image2?? "" ,
      data.upload_image3 ?? "",
      
      data.ip_address
    ]
  );

  let message = "Error in updating Medical Store Details";

  if (result.affectedRows) {
    message = "Medical Store Details updated successfully";
  }
  return { message };
}

async function createFoodMedicalStoreDetails(data, docs,ipAddress) {

  const result = await db.query(
    `INSERT IGNORE INTO mh_medical_stores_table(account_id, equipment_id, equipment_sub_id,agent_name,equipment_sub_name, medical_store_name,select_offer, special_offer, enter_amount,	from_date,to_date, description, phone, email, name_of_contact_person, building_no, street, land_mark, country, state_id, state_name, city_id, city_name, pin_code, latitude, longitude, opening_time, closing_time, upload_image1, upload_image2, upload_image3, ip_address)VALUES
    (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.account_id,
      data.equipment_id,
      data.equipment_sub_id,
      data.agent_name,
      data.equipment_sub_name,
      data.medical_store_name,
      data.select_offer,
      data.special_offer,
      data.enter_amount,
      data.date_from,
      data.date_to,
      data.description,
      data.phone,
      data.email_id,
      data.name_Of_Contact_Person,
      data.building_no,
      data.street,
      data.land_mark,
      data.country,
      data.state_id,
      data.state_name,
      data.city_id,
      data.city,
      data.pin_code,
      data.latitude,
      data.longitude,
      data.opening_time,
      data.closing_time,
      docs.equipmentImageName_1,
      docs.equipmentImageName_2,
      docs.equipmentImageName_3,
      ipAddress
    ]
  );

  let message = "Error in Saving Equipment Details";

  if (result.affectedRows) {
    message = "Equipment Details created successfully";
  }
  return { message };
}
async function getFoodMedicalStoresData(account_id, agent_id, agent_sub_id) {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT  txn_id, account_id, equipment_id, equipment_sub_id, agent_name, equipment_sub_name, medical_store_name,select_offer, special_offer,enter_amount, from_date, to_date, description, phone, email, name_of_contact_person, building_no, street, land_mark, country, state_id, state_name, city_id, city_name,concat(building_no,",",street,"," ,state_name,"," ,city_name,"," ,country) as address,concat(state_name,"," ,city_name) as location, pin_code, latitude, longitude, opening_time, closing_time, upload_image1, upload_image2, upload_image3, medical_store_id,status FROM mh_medical_stores_table WHERE   
    account_id='${account_id}' && equipment_id='${agent_id}' && equipment_sub_id='${agent_sub_id}'`
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
//  console.log(data);
  
  return {
    data,
  };
}


async function updateFoodMedicalStoreDetails(
  equipment_id,
  equipment_sub_id,
  txn_id,
  data
) {
  const result = await db.query(
    `UPDATE mh_medical_stores_table SET  txn_id=?, account_id=?, equipment_id=?, equipment_sub_id=?, agent_name=?, equipment_sub_name=?, medical_store_name=?,select_offer=?, special_offer=?, enter_amount=?, from_date=?, to_date=?, description=?, phone=?, email=?, name_of_contact_person=?, building_no=?, street=?, land_mark=?, country=?, state_name=?, city_name=?, pin_code=?, latitude=?, longitude=?, opening_time=?, closing_time=? ,ip_address=? WHERE   
    equipment_id='${equipment_id}' && equipment_sub_id='${equipment_sub_id}' && txn_id='${txn_id}'`,
    [
      data.txn_id,
      data.account_id,
      data.equipment_id,
      data.equipment_sub_id,
      data.agent_name,
      data.equipment_sub_name,
      data.medical_store_name,
      data.select_offer,
      data.special_offer,
      data.enter_amount,
      data.from_date,
      data.to_date,
      data.description,
      data.phone,
      data.email,
      data.name_of_contact_person,
      data.building_no,
      data.street,
      data.land_mark,
      data.country,
      data.state_name,
      data.city_name,
      data.pin_code,
      data.latitude,
      data.longitude,
      data.opening_time,
      data.closing_time,
      data.ip_address
    ]
  );

  let message = "Error in updating Medical Store Details";

  if (result.affectedRows) {
    message = "Medical Store Details updated successfully";
  }
  return { message };
}

async function createTravelMedicalStoreDetails(data, docs,ipAddress) {
  // console.log("DDD", data)
  // console.log("docs", docs)
  const result = await db.query(
    `INSERT IGNORE INTO mh_medical_stores_table(account_id, equipment_id, equipment_sub_id, agent_name,equipment_sub_name,medical_store_name,medical_store_id, select_offer, special_offer,enter_amount,	from_date,to_date, description, phone, email, name_of_contact_person, building_no, street, land_mark, country, state_id, state_name, city_id, city_name, pin_code, latitude, longitude, opening_time, closing_time, upload_image1,upload_image2,upload_image3, ip_address)VALUES
    (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.account_id ?? "",
      data.equipment_id ?? "",
      data.equipment_sub_id ?? "",
      data.agent_name ?? "",
      data.equipment_sub_name ?? "",
      data.medical_store_name.medical_store_name ?? "",
      data.medical_store_name.medical_store_id ?? "",
      data.select_offer ?? "",
      data.special_offer ?? "",
      data.enter_amount ?? "",
      data.date_from ?? "",
      data.date_to ?? "",
      data.description ?? "",
      data.phone ?? "",
      data.email_id ?? "",
      data.name_Of_Contact_Person ?? "",
      data.building_no ?? "",
      data.street ?? "",
      data.land_mark ?? "",
      data.country ?? "",
      data.state.state_id ?? "",

      data.state.state_name ?? "",
      data.city.city_id?? "",

      data.city.city ?? "",
      data.pin_code ?? "",
      data.latitude ?? "",
      data.longitude ?? "",
      data.opening_time ?? "",
      data.closing_time ?? "",
      docs.equipmentImageName_1 ?? "",
      docs.equipmentImageName_2 ?? "",
      docs.equipmentImageName_3 ?? "",
      ipAddress

    //  data.ip_address
    ]
  );

  let message = "Error in Saving Equipment Details";

  if (result.affectedRows) {
    message = "Equipment Details created successfully";
  }
  return { message };
}

async function getTravelMedicalStoresData(account_id, agent_id, transport_sub_id) {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT  txn_id, account_id, equipment_id, equipment_sub_id, agent_name, equipment_sub_name, medical_store_name,select_offer, special_offer,enter_amount, from_date, to_date, description, phone, email, name_of_contact_person, building_no, street, land_mark, country, state_id, state_name, city_id, city_name,concat(building_no,",",street,"," ,state_name,"," ,city_name,"," ,country) as address,concat(state_name,"," ,city_name) as location, pin_code, latitude, longitude, opening_time, closing_time, upload_image1, upload_image2, upload_image3, medical_store_id ,status FROM mh_medical_stores_table WHERE   
    account_id='${account_id}' && equipment_id='${agent_id}' && equipment_sub_id='${transport_sub_id}'`
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
//  console.log(data);
  
  return {
    data,
  };
}

async function updateTravelMedicalStoreDetails(
  equipment_id,
  equipment_sub_id,
  txn_id,
  data
) {
  const result = await db.query(
    `UPDATE mh_medical_stores_table SET  txn_id=?, account_id=?, equipment_id=?, equipment_sub_id=?, agent_name=?, equipment_sub_name=?, medical_store_name=?, select_offer=?, special_offer=?, enter_amount=?, from_date=?, to_date=?, description=?, phone=?, email=?, name_of_contact_person=?, building_no=?, street=?, land_mark=?, country=?, state_name=?, city_name=?, pin_code=?, latitude=?, longitude=?, opening_time=?, closing_time=? ,ip_address=? WHERE   
    equipment_id='${equipment_id}' && equipment_sub_id='${equipment_sub_id}' && txn_id='${txn_id}'`,
    [
      data.txn_id,
      data.account_id,
      data.equipment_id,
      data.equipment_sub_id,
      data.agent_name,
      data.equipment_sub_name,
      data.medical_store_name,
      data.select_offer,
      data.special_offer,
      data.enter_amount,
      data.from_date,
      data.to_date,
      data.description,
      data.phone,
      data.email,
      data.name_of_contact_person,
      data.building_no,
      data.street,
      data.land_mark,
      data.country,
      data.state_name,
      data.city_name,
      data.pin_code,
      data.latitude,
      data.longitude,
      data.opening_time,
      data.closing_time,
      data.ip_address
    ]
  );

  let message = "Error in updating Medical Store Details";

  if (result.affectedRows) {
    message = "Medical Store Details updated successfully";
  }
  return { message };
}

async function updateMedicalStoreDetails(
  equipment_id,
  equipment_sub_id,
  txn_id,
  data
) {
  // console.log("asdf",data)
  const result = await db.query(
    `UPDATE mh_medical_stores_table SET  txn_id=?, account_id=?, equipment_id=?, equipment_sub_id=?, agent_name=?, equipment_sub_name=?, medical_store_name=?,medical_store_id=?,select_offer=?, special_offer=?, enter_amount=?, from_date=?, to_date=?, description=?,	phone = ?, email=?, name_of_contact_person=?, building_no=?, street=?, land_mark=?, country=?, state_name=?,state_id=?,city_name=?, city_id=?, pin_code=?, latitude=?, longitude=?, opening_time=?, closing_time=? WHERE equipment_id='${equipment_id}' AND equipment_sub_id='${equipment_sub_id}' AND txn_id='${txn_id}'`,
    [
      data.txn_id ?? "",
      data.account_id ?? "",
      data.equipment_id ?? "",
      data.equipment_sub_id ?? "",
      data.agent_name ?? "",
      data.equipment_sub_name ?? "",
      data.medical_store_name.medical_store_name ?? data.medical_store_name,
      data.medical_store_name.medical_store_id ?? data.medical_store_id,
      data.select_offer ?? "",
      data.special_offer ?? "",
      data.enter_amount ?? "",
      data.from_date ?? "",
      data.to_date ?? "",
      data.description ?? "",
      data.phone ?? "",
      data.email ?? "",
      data.name_of_contact_person ?? "",
      data.building_no ?? "",
      data.street ?? "",
      data.land_mark ?? "",
      data.country ?? "",
      data.state.state_name ?? "",
      data.state_name.state_id ?? data.state_id,
      data.city.city ?? "",
      data.city_name.city_id ?? data.city_id,
      data.pin_code ?? "",
      data.latitude ?? "",
      data.longitude ?? "",
      data.opening_time ?? "",
      data.closing_time ?? "",
    //  data.ip_address
    ]
  );

  let message = "Error in updating Medical Store Details";

  if (result.affectedRows) {
    message = "Medical Store Details updated successfully";
  }
  return { message };
}

module.exports = {
  getMultiple,
  getMultipleAccomodation,
  getSingleParentTypeDetail,
  create,
  update,
  remove,
  createEquipmentReg,
  getMultipleEquipmentDetails,
  getStatusCount,
  getEquipmentDataOnStatus,
  existingUserProperty,
  exsistingUserCreate,
  createEquipmentLocation,
  getEquipmentLocation,
  getMedicalEqpData,
  updateDetails,
  getequipmentRegistrationMaster,
  getMedicalPartnersForAdmin,
  getEquipmentPartnerRegApproval,
  getEquipmentApproval,
  approveEquipmentRegDetails,
  rejectEquipmentRegDetails,
  putEquipmentDetails,
  getequipmentpartnerNames,
  getSubequipmentpartnerNames,
  loadEquipmentStatus,
  ledgerEquipmentDetails,
  getEquipmentBookingDetails,
  getBookingEquipmentTypes,
  getMedicalItems,
  existingUserProperty,
  approvedMedPartnersForAdmin,
  getEquipmentItemsForAdmin,
  createPropertyPartnerDetails,
  createFoodPartnerDetails,
  createPartnerTravelDetails,
  getPropertyPartnerData,
  getRoomsPropertyDetails,
  createPropertyRoomDetails,
  updatePartnerDetails,
  updatePropertyRoomsData,
  loadFoodDetails,
  loadTravelDetails,
  travelPartnerUpdating,
  addFoodDetailsUpdating,
  loadAccEquipmentSubpartnerNames,
  loadfoodEquipmentSubpartnerNames,
  loadTravelEquipmentSubpartnerNames,
  loadmedicalstoreDetails,
  loadmedicalDetails,
  loadfoodmedicalDetails,
  loadEquipmentmedicalDetails,
  loadEquipmentItems,
  saveMedicalStoresData,
  getMedicalStoresData,
  createEqpRestaurantSaving,
  getEqpRestaurantDetails,
  updateEqpRestaurantDetails,
  createMedicalStoreDetails,
  getAccMedicalStoresData,
  updateAccMedicalStoreDetails,
  createFoodMedicalStoreDetails,
  getFoodMedicalStoresData,
  updateFoodMedicalStoreDetails,
  createTravelMedicalStoreDetails,
  getTravelMedicalStoresData,
  updateTravelMedicalStoreDetails,
  updateMedicalStoreDetails,
  approveEquipmentDetails,
  rejectEquipmentDetails,
  approveMedicalstoreDetails,
  rejectMedicalstoreDetails,
  getAllEquipmentDetailsForAdmin,
  getMedicalDisplayCountOfPartner,
  // test_create,
};
