const db = require("./db");
const helper = require("../helper");

async function getMultipleAccomodation() {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT equipment_id, equipment_sub_id, agent_name, equipment_sub_name, company_name,individual_name, phone, fax, email_id, agent_commission, description, building_no, street, land_mark, city, city_id, country, state, state_id, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, accept,pan_card_file_loc,gst_tin_loc,addhaar_no_loc,mh_agreement_loc,mb_certificate_loc,property_tax_loc,fire_safety_loc,cancelled_cheque_doc,status,concat(building_no,",",street,"," ,state,"," ,city,"," ,country) as address,concat(state,"," ,city) as location FROM mh_equipment_master GROUP BY equipment_id`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  var index=0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      var equipment_count = "";
      if (element.equipment_id) {
        equipment_count = await helper.getCountOfEquipmentId(
          element.equipment_id
          )
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
async function getMedicalEqpdata(equipment_id, equipment_sub_id) {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT txn_id,equipment_id,account_id, equipment_sub_id, agent_name, equipment_sub_name, item_name, price, units, equipment_image,status,medical_store,address,location,item_id,units_id,partner_status FROM mh_equipment_location_table WHERE equipment_id='${equipment_id}' && equipment_sub_id='${equipment_sub_id}'`
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
  let message = "Error while changing the Staff Equipment details status Data";

  if (result.affectedRows) {
    message = "Equipment Status Changed Successfully";
  }

  return { message };
}
async function getequipmentpartnerNames() {
  const rows = await db.query(
    `SELECT account_id,equipment_id,agent_name,partner_status FROM mh_equipment_location_table WHERE partner_status='approved' GROUP BY equipment_id;`
    );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}
async function ledgerEquipmentDetails(data) {
  var equipmentstatus = data.status == true ? "yes" : "no";
  const result = await db.query(
    `INSERT IGNORE INTO mh_equipment_location_ledger_table(txn_id,equipment_id, equipment_sub_id,account_id, agent_name, equipment_sub_name, item_name, price,units,equipment_image,partner_status,status)VALUES
    (?,?,?,?,?,?,?,?,?,?,?,?)`,
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
      data.equipment_image ?? "",
      data.partner_status ?? "",
      equipmentstatus ?? "",
    ]
  );

  let message = "Error in Saving Equipment Details";

  if (result.affectedRows) {
    message = "Staff Equipment Details created successfully";
  }
  return { message };
}
async function getSubequipmentpartnerNames(account_id, equipmentId) {
  const rows = await db.query(
    `SELECT account_id,equipment_id,agent_name ,equipment_sub_id,equipment_sub_name,partner_status FROM mh_equipment_location_table WHERE account_id='${account_id}' && equipment_id='${equipmentId}' GROUP BY equipment_sub_id;`
  );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}

async function getEquipmentLocation(equipment_id, equipment_sub_id) {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT txn_id,equipment_id,account_id, equipment_sub_id, agent_name, equipment_sub_name, item_name, price, units, equipment_image,status,medical_store,address,location,city,city_id,special_offer,item_id,units_id,partner_status  FROM mh_equipment_location_table WHERE  equipment_id=${equipment_id} && equipment_sub_id=${equipment_sub_id}`
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
          )
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

async function putEquipmentDetails(
  equipment_id, 
  equipment_sub_id, 
  txn_id, 
  data
  ) {
  const result = await db.query(
    `UPDATE mh_equipment_location_table SET account_id=?, txn_id=?, equipment_id=?, equipment_sub_id=?,agent_name=?,equipment_sub_name=?, item_name=?, item_id=?,medical_store=?, price=?, units=?,units_id=?,partner_status=? WHERE equipment_id='${equipment_id}' AND equipment_sub_id='${equipment_sub_id}' AND txn_id='${txn_id}'`,
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
      data.partner_status ?? ""     
      // docs.equipmentImageName ?? "",
    ]
  );

  let message = "Error in updating Equipment Registration Master";

  if (result.affectedRows) {
    message = "Equipment Details updated successfully";
  }
  return { message };
}

async function getEquipmentDataOnStatus(params) {
  const rows = await db.query(
    `SELECT equipment_id, equipment_sub_id, agent_name, equipment_sub_name,company_name,individual_name, phone, fax, email_id, agent_commission, description, building_no, street, land_mark, city, city_id, country, state, state_id, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, accept,pan_card_file_loc,gst_tin_loc,addhaar_no_loc,mh_agreement_loc, mb_certificate_loc,property_tax_loc,fire_safety_loc,cancelled_cheque_doc,status,concat(building_no,",",street,"," ,state,"," ,city,"," ,country) as address,concat(state,"," ,city) as location FROM mh_equipment_master WHERE status='${params}'`
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
    `SELECT (SELECT COUNT(*) FROM mh_equipment_master WHERE status='pending') AS pcount,(SELECT COUNT(*) FROM mh_equipment_master WHERE status='approved') AS acount, (SELECT COUNT(*) FROM mh_equipment_master WHERE status='rejected') AS rcount,(SELECT COUNT(*) FROM mh_equipment_master WHERE status='verified') AS vcount FROM mh_equipment_master GROUP BY status;`
  );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}
async function getSingleParentTypeDetail(id) {
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
  let equipmentSubId = await helper.generateEquipmentSUBID();
  // let equipmentSubId = `EQP00${await helper.generateEquipmentSUBID()}`;
  const result = await db.query(
    `INSERT IGNORE INTO mh_equipment_master( equipment_sub_id, agent_name, equipment_sub_name,company_name,individual_name, phone, fax, email_id, agent_commission, description, building_no, street, land_mark, city, city_id, country, state, state_id, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, accept,pan_card_file_loc,gst_tin_loc,addhaar_no_loc,mh_agreement_loc,mb_certificate_loc,property_tax_loc,fire_safety_loc,cancelled_cheque_doc,account_id,ip_address)VALUES
    (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      equipmentSubId ?? "",
      data.name ?? "",
      data.name ?? "",
      data.company_name ?? "",
      data.individual_name??"",
      data.phone ?? "",
      data.fax ?? "",
      data.email_id ?? "",
      data.agent_commission ?? "",
      data.description ?? "",
      data.building_no ?? "",
      data.street ?? "",
      data.land_mark ?? "",
      data.city.city ?? "",
      data.city.city_id ?? "",
      data.country ?? "",
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
      data.accept ?? "",
      docs.panCardName ?? "",
      docs.addhaarName ?? "",
      docs.gstInName ?? "",
      docs.mhAgreementName ?? "",
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
  const result = await db.query(
    `INSERT IGNORE INTO mh_equipment_master(equipment_id, equipment_sub_id, agent_name, equipment_sub_name,company_name,individual_name,phone, fax, email_id, agent_commission, description, building_no, street, land_mark, city, city_id, country, state, state_id, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, accept,pan_card_file_loc,gst_tin_loc,addhaar_no_loc,mh_agreement_loc,mb_certificate_loc,property_tax_loc,fire_safety_loc,cancelled_cheque_doc,account_id,ip_address)VALUES
    (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.equipment_id ?? "",
      equipmentSubId ?? "",
      data.agent_name ?? "",
      data.name ?? "",
      data.company_name ?? "",
      data.individual_name??"",
      data.phone ?? "",
      data.fax ?? "",
      data.email_id ?? "",
      data.agent_commission ?? "",
      data.description ?? "",
      data.building_no ?? "",
      data.street ?? "",
      data.land_mark ?? "",
      data.city.city ?? "",
      data.city.city_id ?? "",
      data.country ?? "",
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
      data.accept ?? "",
      docs.panCardName ?? "",
      docs.addhaarName ?? "",
      docs.gstInName ?? "",
      docs.mhAgreementName ?? "",
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

async function createEquipmentLocation(fields, files, docs, ipAddress) {
  let data = JSON.parse(fields.equipmentItemDetails);
  const result = await db.query(
    `INSERT IGNORE INTO mh_equipment_location_table( equipment_id, equipment_sub_id, agent_name, equipment_sub_name, item_name,item_id, price, units,units_id, equipment_image,account_id,medical_store,address,city,city_id,location,partner_status,ip_address)VALUES
    (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.equipment_id ?? "",
      data.equipment_sub_id ?? "",
      data.agent_name ?? "",
      data.equipment_sub_name ?? "",
      data.item_name.item_name ?? "",
      data.item_name.item_id ?? "",
      data.price ?? "",
      data.units.units ?? "",
      data.units.unit_id ?? "",
      docs.equipmentImageName ?? "",
      data.account_id ?? "",
      data.medical_store ?? "",
      data.address ?? "",
      data.city ?? "",
      data.city_id ?? "",
      data.location ?? "",
      data.partner_status ?? "",
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
async function updateEquipmentPartnerForm(

  equipment_id, 
  equipment_sub_id,
  data,
  docNames
   
) {
  console.log("data111111",data,docNames)
 // let data = JSON.parse(fields.updateProperty);

  const result = await db.query(
    `UPDATE mh_equipment_master SET equipment_id=?, equipment_sub_id=?,agent_name=?,equipment_sub_name=?, phone=?, fax=?,alternate_no=?,email_id=?, agent_commission=?, description=?, building_no=?, street=?, land_mark=?, city=?, country=?, state=?, pin_code=?, pan=?, aadhar=?, gstin=?, bankAccountNo=?, bankName=?, branchName=?, ifsc=?, accept=?, pan_card_file_loc=?, addhaar_no_loc=?, mh_agreement_loc=?, mb_certificate_loc=?, gst_tin_loc=?, property_tax_loc=?, fire_safety_loc=?, cancelled_cheque_doc=? WHERE equipment_id='${equipment_id}' AND equipment_sub_id='${equipment_sub_id}'`,
    [
      // data.user_id ?? "",
      data.equipment_id ?? "",
      data.equipment_sub_id ?? "",
      // agentName == equipmentSubName ? data.name : agentName,
      data.agent_name?? "",
      data.name ?? "",
      data.phone ?? "",
      data.fax ?? "",
      data.alternate_no ?? "",
      data.email_id ?? "",
      data.agent_commission ?? "",
      data.description ?? "",
      data.building_no ?? "",
      data.street ?? "",
      data.land_mark ?? "",
      data.city ?? "",
      // data.city.city_id ?? data.city_id,
      data.country ?? "",
      data.state_name ?? "",
      // data.state.state_id ?? data.state_id,
      data.pin_code ?? "",
      data.pan ?? "",
      data.aadhar ?? "",
      data.gstin ?? "",
      data.bankAccountNo ?? "",
      data.bankName ?? "",
      data.branchName ?? "",
      data.ifsc ?? "",
      data.accept ?? "",
      docNames.panCardName ?? "",
      docNames.addhaarName ?? "",
      docNames.mhAgreementName ?? "",
      docNames.mbCertificateName ?? "",
      docNames.gstInName ?? "",
      docNames.propertyTaxName ?? "",
      docNames.fireSafetyName ?? "",
      docNames.cancelledChequeName ?? "",
      
    ]
  );
  // if (status == "pending") {
  //   const result2 = await db.query(
  //     `UPDATE mh_equipment_master SET status="verified" WHERE equipment_id='${equipmentId}'`,
  //   );
  //   let message = "Error in updating Equipment Registration Master";
  //   if (result2.affectedRows) {
  //     message = "Equipment Registration Master updated successfully";
  //   }
  //   return { message };
  // }else{
  //   message = "Equipment Registration Master updated successfully";
  // };

  let message = "Error in updating Equipment Registration Master";

  if (result.affectedRows) {
    message = "Equipment Registration Master updated successfully";
  }
  return { message };
}
async function updateDetails(
  userId, 
  equipmentId, 
  equipmentSubid, 
  agentName, 
  equipmentSubName,
  status, 
  data
  ) {
  const result1 = await db.query(
    `UPDATE mh_equipment_master SET account_id=?, equipment_id=?, equipment_sub_id=?,agent_name=?,equipment_sub_name=?, phone=?, fax=?,email_id=?, agent_commission=?, description=?, building_no=?, street=?, land_mark=?, city=?, country=?, state=?, pin_code=?, pan=?, aadhar=?, gstin=?, bankAccountNo=?, bankName=?, branchName=?, ifsc=?, accept=?, pan_card_file_loc=?, addhaar_no_loc=?, mh_agreement_loc=?, mb_certificate_loc=?, gst_tin_loc=?, property_tax_loc=?, fire_safety_loc=?, cancelled_cheque_doc=?  WHERE account_id='${userId}' AND equipment_id='${equipmentId}' AND equipment_sub_id='${equipmentSubid}'`,
    [
      data.user_id ?? "",
      data.equipment_id ?? "",
      data.equipment_sub_id ?? "",
      agentName == equipmentSubName ? data.name : agentName,
      data.name ?? "",
      data.phone ?? "",
      data.fax ?? "",
      data.email_id ?? "",
      data.agent_commission ?? "",
      data.description ?? "",
      data.building_no ?? "",
      data.street ?? "",
      data.land_mark ?? "",
      data.city.city ?? data.city,
      // data.city.city_id ?? data.city_id,
      data.country ?? "",
      data.state.state_name ?? data.state,
      // data.state.state_id ?? data.state_id,
      data.pin_code ?? "",
      data.pan ?? "",
      data.aadhar ?? "",
      data.gstin ?? "",
      data.bankAccountNo ?? "",
      data.bankName ?? "",
      data.branchName ?? "",
      data.ifsc ?? "",
      data.accept ?? "",
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
  if (status == "pending") {
    const result2 = await db.query(
      `UPDATE mh_equipment_master SET status="verified" WHERE equipment_id='${equipmentId}'`,
    );
    let message = "Error in updating Equipment Registration Master";
    if (result2.affectedRows) {
      message = "Equipment Registration Master updated successfully";
    }
    return { message };
  }else{
    message = "Equipment Registration Master updated successfully";
  };

  let message = "Error in updating Equipment Registration Master";

  if (result1.affectedRows) {
    message = "Equipment Registration Master updated successfully";
  }
  return { message };
}

async function createEquipmentReg(data) {
  let equipmentSubId = `EQP00${await helper.generateEquipmentSUBID()}`;
  const result = await db.query(
    `INSERT IGNORE INTO mh_equipment_master( equipment_id, equipment_sub_id, agent_name, company_name,individual_name, phone, fax, email_id, description, building_no, street, land_mark, city, country, state, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, accept)VALUES
      (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.equipment_id ?? "",
      equipmentSubId ?? "",
      data.agent_name ?? "",
      data.company_name ?? "",
      data.individual_name??"",
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
    `SELECT agent_name, company_name,individual_name, phone, fax, email_id, agent_commission, description, building_no, street, land_mark, city, country, state, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, accept FROM mh_equipment_master WHERE 1`
  );
  const data = helper.emptyOrRows(rows);
  //   const meta = { page };

  return {
    data,
  };
}

module.exports = {
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
  getMedicalEqpdata,
  getEquipmentLocation,
  updateDetails,
  putEquipmentDetails,
  getequipmentpartnerNames,
  getSubequipmentpartnerNames,
  loadEquipmentStatus,
  ledgerEquipmentDetails,
  updateEquipmentPartnerForm,

    // test_create,
};
