const db = require("./db");
const helper = require("../helper");

async function getFoodMultiple() {
  //   const offset = helper.getOffset(page, config.listPerPage);

  const rows = await db.query(
    `SELECT agent_id,agent_sub_id,account_id,agent_name,agent_sub_name,phone, fax, email_id,description, building_no, street, land_mark, city, city_id, concat(building_no,",",street,"," ,state,"," ,city,"," ,country) as address,concat(state,"," ,city) as location,country, state, state_id, pin_code, pan, aadhar,gst_registration, gstin,bankAccountNo, bankName, branchName, ifsc, accept,pan_card_file,addhaar_no,gst_tin_loc,mh_agreement_loc,mb_certificate_loc,food_safety_certificate,file_upload5,food_tax,state_id,city_id,status,fassai_no FROM mh_food_master GROUP BY agent_id`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  var index=0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      var food_count = "";
      if (element.agent_id) {
        food_count = await helper.getCountOfFoodId(
          element.agent_id)
          index = index+1;
      };
      data.push({
        food_count: food_count,
        index:index,
        ...element
      });
    }
  }

  //   const meta = { page };

  return {
    data,
  };
}

async function getExistingUserFoodPartner(params) {
  //   const offset = helper.getOffset(page, config.listPerPage);
  //  let agentSubId = await helper.generateFoodSUBID();
  const rows = await db.query(
    `SELECT agent_id,agent_sub_id, agent_name,agent_sub_name, company_name,individual_name, phone, fax, email_id,description, building_no, street, land_mark, city, city_id, country, concat(building_no,",",street,"," ,state,"," ,city,"," ,country) as address,concat(state,"," ,city) as location,state, state_id, pin_code,pan, aadhar, gstin, fssai_no,bankAccountNo, bankName, branchName, ifsc, accept,pan_card_file,addhaar_no,gst_tin_loc,mh_agreement_loc,mb_certificate_loc,food_safety_certificate,file_upload5,food_tax,state_id,city_id, status FROM mh_food_master WHERE agent_id='${params}'`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      var food_count = "";
      if (element.agent_id) {
        food_count = await helper.getCountOfFoodId(
          element.agent_id)
      };
      data.push({
        food_count: food_count,
        ...element
      });
    }
  }
  return {
    data,
  };
}


async function getFoodDataOnStatus(params) {
  const rows = await db.query(
    `SELECT agent_id,agent_sub_id,agent_name, phone, fax, email_id,description, building_no, street, land_mark, city, city_id, country, state, state_id, pin_code,concat(building_no,",",street,"," ,state,"," ,city,"," ,country) as address,concat(state,"," ,city) as location, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, accept,pan_card_file,addhaar_no,gst_tin_loc,mh_agreement_loc,mb_certificate_loc,status,file_upload5,food_tax,status FROM mh_food_master WHERE status='${params}'`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      var food_count = "";
      if (element.agent_id) {
        food_count = await helper.getCountOfFoodId(
          element.agent_id)
      };
      data.push({
        food_count: food_count,
        ...element
      });
    }
  }

  return {
    data,
  };
}
async function getStatusCount() {
  const rows = await db.query(
    `SELECT (SELECT COUNT(*) FROM mh_food_master WHERE status='Pending') AS pcount,(SELECT COUNT(*) FROM mh_food_master WHERE status='Verified') AS vcount,(SELECT COUNT(*) FROM mh_food_master WHERE status='Approved') AS acount, (SELECT COUNT(*) FROM mh_food_master WHERE status='Rejected') AS rcount FROM mh_food_master GROUP BY status;`
  );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}
async function getMultipleFoodDetails() {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT agent_name,agent_sub_name, company_name,individual_name, phone, fax, email_id,description, building_no, street, land_mark, city, country, state, pin_code,concat(building_no,",",street,"," ,state,"," ,city,"," ,country) as address,concat(state,"," ,city) as location, pan, aadhar, gstin, fssai_no,bankAccountNo, bankName, branchName, ifsc, accept,status FROM mh_food_master WHERE 1`
  );
  const data = helper.emptyOrRows(rows);
  //   const meta = { page };

  return {
    data,
  };
}
async function getSingleParentTypeDetail(id) {
  const rows = await db.query(
    `SELECT  agent_id,property_name,phone,email,registration_number FROM mh_food_master WHERE parent_type_id=?`,
    [id]
  );
  const data = helper.emptyOrRows(rows);
  //   const meta = { page };
  return data;
}

async function loadPartnerNames() {
  const rows = await db.query(
    `SELECT account_id,agent_id,agent_name,status FROM mh_food_master WHERE status='Approved' GROUP BY agent_id; `
  );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}
async function loadSubPartnerNames(agent_id) {
  const rows = await db.query(
    `SELECT account_id,agent_id,item_txn_id,agent_sub_id,kitchen_name, kitchen_type,status,special_offer,date_format(updated_datetime,"%d-%m-%Y") as updated_datetime,partner_status  FROM mh_foodpartner_details WHERE agent_id='${agent_id}' GROUP BY agent_sub_id; `
  );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}
async function getMainFoodPartnerDetails(agent_id, agent_sub_id) {

  const rows = await db.query(
    `SELECT account_id,txn_id,agent_id,agent_sub_id,kitchen_name, kitchen_type,item_name,food_type_id,food_items_name,price,units,food_image,status,date_format(updated_datetime,"%d-%m-%Y") as updated_datetime,special_offer,partner_status  FROM mh_foodpartner_details WHERE agent_id='${agent_id}'  && agent_sub_id='${agent_sub_id}'`
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
// get food details

async function getFoodDetails(agent_id, agent_sub_id) {
  const rows = await db.query(
    `SELECT account_id,item_txn_id,agent_id,agent_sub_id,kitchen_name, kitchen_type,item_name,food_type_id,food_items_name,price,units,food_image,status,date_format(updated_datetime,"%d-%m-%Y") as updated_datetime,partner_status  FROM mh_foodpartner_details WHERE agent_id=${agent_id} AND agent_sub_id=${agent_sub_id} ;`
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

async function create(fields, files, docs,ipAddress) {
  let data = JSON.parse(fields.foodPartnerDetails);
  let agentSubId = await helper.generateFoodPartnerSUBID();

  const result = await db.query(
    `INSERT IGNORE INTO mh_food_master( agent_sub_id,agent_name,agent_sub_name,company_name, individual_name,phone, fax,email_id, description, building_no, street, land_mark, city, country, state,pin_code, pan, aadhar, gstin, fssai_no,bankAccountNo, bankName, branchName, ifsc, accept,pan_card_file,addhaar_no,gst_tin_loc,mh_agreement_loc,mb_certificate_loc,food_safety_certificate,file_upload5,food_tax,state_id,city_id,account_id,ip_address)VALUES
      (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      agentSubId ?? "",
      data.name ?? "",
      data.name ?? "",
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
      data.country ?? "",
      data.state.state_name ?? "",
      data.pin_code ?? "",
      data.pan ?? "",
      data.aadhar ?? "",
      data.gstin ?? "",
      data.fssai ?? "",
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
    message = "Food Registration Master created successfully";
  }

  return { message };
}


// existing user food partner create

async function FoodExistingUserCreate(fields, files, docs, ipAddress) {
  let data = JSON.parse(fields.foodPartnerDetails);
  let agentSubId = await helper.generateFoodPartnerSUBID();
  const result = await db.query(
    `INSERT IGNORE INTO mh_food_master(agent_id,agent_sub_id,agent_name,agent_sub_name, company_name,individual_name, phone, fax,email_id, description, building_no, street, land_mark, city, country, state,pin_code, pan, aadhar, gstin,fssai_no, bankAccountNo, bankName, branchName, ifsc, accept,pan_card_file,addhaar_no,gst_tin_loc,mh_agreement_loc,mb_certificate_loc,food_safety_certificate,file_upload5,food_tax,state_id,city_id,account_id,ip_address)VALUES
     (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.agent_id ?? "",
      agentSubId ?? "",
      data.agent_name ?? "",
      data.name ?? "",
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
      data.country ?? "",
      data.state.state_name ?? "",
      data.pin_code ?? "",
      data.pan ?? "",
      data.aadhar ?? "",
      data.gstin ?? "",
      data.fssai ?? "",
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
    message = "Food Registration Master created successfully";
  }
  return { message };
}

async function updateDetails(userId, agentId, agentSubid, agentName, agentSubName,status, data) {
  const result1 = await db.query(
    `UPDATE mh_food_master SET account_id=?, agent_id=?, agent_sub_id=?,agent_name=?,agent_sub_name=?, phone=?, fax=?,email_id=?, description=?, building_no=?, street=?, land_mark=?, city=?, city_id=?,country=?, state=?, state_id=?, pin_code=?, pan=?, aadhar=?, gstin=?,bankAccountNo=?, bankName=?, branchName=?, ifsc=?, accept=?, account_id=?, pan_card_file=?, gst_tin_loc=?, addhaar_no=?, mh_agreement_loc=?, mb_certificate_loc=?, food_safety_certificate=?, file_upload5=?, food_tax=?  WHERE account_id='${userId}' AND agent_id='${agentId}' AND agent_sub_id='${agentSubid}'`,
    [
      data.user_id ?? "",
      data.agent_id ?? "",
      data.agent_sub_id ?? "",
      agentName == agentSubName ? data.name : agentName,
      data.name ?? "",
      data.phone ?? "",
      data.fax ?? "",
      data.email_id ?? "",
      data.description ?? "",
      data.building_no ?? "",
      data.street ?? "",
      data.land_mark ?? "",
      data.city.city ?? data.city,
      data.city.city_id ?? data.city_id,
      data.country ?? "",
      data.state.state_name ?? data.state,
      data.state.state_id ?? data.state_id,
      data.pin_code ?? "",
      data.pan ?? "",
      data.aadhar ?? "",
      data.gstin ?? "",
     // data.fssai ?? "",
      data.bankAccountNo ?? "",
      data.bankName ?? "",
      data.branchName ?? "",
      data.ifsc ?? "",
      data.accept ?? "",
      data.user_id ?? "",
      data.pan_card_upt ?? "",
      data.gst_tin_upt ?? "",
      data.addhaar_no_upt ?? "",
      data.mh_agreement_upt ?? "",
      data.mb_certificate_upt ?? "",
      data.food_safety_upt ?? "",
      data.cancelled_cheque_upt ?? "",
      data.food_tax_upt ?? "",
    ]
  );
  if(status == "Pending") {
    const result2 = await db.query(
      `UPDATE mh_food_master SET status="Verified" WHERE agent_id='${agentId}'`
    );
    let message = "Error in updating Food Registration Master";
    if (result2.affectedRows) {
      message = "Food Registration Master updated successfully";
    }
    return { message };
  }else{
    message = "Food Registration Master updated successfully";
  };

  let message = "Error in updating Food Registration Master";

  if (result1.affectedRows) {
    message = "Food Registration Master updated successfully";
  }
  return { message };

}

// async function updateFoodMasterForm( agentId, agentSubid, agentName, agentSubName,status,docNames,data) {
//   const result1 = await db.query(
//     `UPDATE mh_food_master SET account_id=?, agent_id=?, agent_sub_id=?,agent_name=?,agent_sub_name=?, phone=?, fax=?,email_id=?, description=?, building_no=?, street=?, land_mark=?, city=?, city_id=?,country=?, state=?, state_id=?, pin_code=?, pan=?, aadhar=?, gstin=?,bankAccountNo=?, bankName=?, branchName=?, ifsc=?, accept=?, account_id=?, pan_card_file=?, gst_tin_loc=?, addhaar_no=?, mh_agreement_loc=?, mb_certificate_loc=?, food_safety_certificate=?, file_upload5=?, food_tax=?  WHERE agent_id='${agentId}' AND agent_sub_id='${agentSubid}'`,
//     [
//       data.user_id ?? "",
//       data.agent_id ?? "",
//       data.agent_sub_id ?? "",
//       agentName == agentSubName ? data.name : agentName,
//       data.name ?? "",
//       data.phone ?? "",
//       data.fax ?? "",
//       data.email_id ?? "",
//       data.description ?? "",
//       data.building_no ?? "",
//       data.street ?? "",
//       data.land_mark ?? "",
//       data.city.city ?? data.city,
//       data.city.city_id ?? data.city_id,
//       data.country ?? "",
//       data.state.state_name ?? data.state,
//       data.state.state_id ?? data.state_id,
//       data.pin_code ?? "",
//       data.pan ?? "",
//       data.aadhar ?? "",
//       data.gstin ?? "",
//      // data.fssai ?? "",
//       data.bankAccountNo ?? "",
//       data.bankName ?? "",
//       data.branchName ?? "",
//       data.ifsc ?? "",
//       data.accept ?? "",
//       data.user_id ?? "",
//       docNames.panCardName ?? "",
//       docNames.addhaarName ?? "",
//       docNames.mhAgreementName ?? "",
//       docNames.mbCertificateName ?? "",
//       docNames.gstInName ?? "",
//       docNames.propertyTaxName ?? "",
//       docNames.fireSafetyName ?? "",
//       docNames.cancelledChequeName ?? "",,
//     ]
//   );
//   if(status == "pending") {
//     const result2 = await db.query(
//       `UPDATE mh_food_master SET status="verified" WHERE agent_id='${agentId}'`
//     );
//     let message = "Error in updating Food Registration Master";
//     if (result2.affectedRows) {
//       message = "Food Registration Master updated successfully";
//     }
//     return { message };
//   }else{
//     message = "Food Registration Master updated successfully";
//   };

//  // let message = "Error in updating Food Registration Master";

//   if (result1.affectedRows) {
//     message = "Food Registration Master updated successfully";
//   }
//   return { message };

// }

async function updateFoodMasterForm(agent_id, agent_sub_id, agent_name, agent_sub_name, status, docNames, data) {
  try {
    // console.log("safsdgdgfh", agent_id, agent_sub_id, agent_name, agent_sub_name, status, docNames, data);
    const result1 = await db.query(
      `UPDATE mh_food_master SET account_id=?, agent_id=?, agent_sub_id=?,status=?,agent_name=?,agent_sub_name=?, phone=?, fax=?,email_id=?, description=?, building_no=?, street=?, land_mark=?, city=?, city_id=?,country=?, state=?, state_id=?, pin_code=?, pan=?, aadhar=?, gstin=?,bankAccountNo=?, bankName=?, branchName=?, ifsc=?, accept=?, account_id=?, pan_card_file=?, gst_tin_loc=?, addhaar_no=?, mh_agreement_loc=?, mb_certificate_loc=?, food_safety_certificate=?, file_upload5=?, food_tax=?,fassai_no=?  WHERE agent_id='${agent_id}' AND agent_sub_id='${agent_sub_id}'AND agent_name='${agent_name}'AND agent_sub_name='${agent_sub_name}'AND status='${status}'`,
      [
        data.user_id ?? "",
        data.agent_id ?? "",
        data.agent_sub_id ?? "",
        data.status ?? "",
        agent_name == agent_sub_name ? data.name : agent_name,
        data.name ?? "",
        data.phone ?? "",
        data.fax ?? "",
        data.email_id ?? "",
        data.description ?? "",
        data.building_no ?? "",
        data.street ?? "",
        data.land_mark ?? "",
        data.city.city ?? data.city,
        data.city.city_id ?? data.city_id,
        data.country ?? "",
        data.state.state_name ?? data.state,
        data.state.state_id ?? data.state_id,
        data.pin_code ?? "",
        data.pan ?? "",
        data.aadhar ?? "",
        data.gstin ?? "",
        // data.fssai ?? "",
        data.bankAccountNo ?? "",
        data.bankName ?? "",
        data.branchName ?? "",
        data.ifsc ?? "",
        data.accept ?? "",
        data.user_id ?? "",
        docNames.panCardName ?? "",
        docNames.addhaarName ?? "",
        docNames.mhAgreementName ?? "",
        docNames.mbCertificateName ?? "",
        docNames.gstInName ?? "",
        docNames.propertyTaxName ?? "",
        docNames.fireSafetyName ?? "",
        docNames.cancelledChequeName ?? "",
        data.fssai_no ?? ""
      ]
    );

    let message = "Error in updating Food Registration Master";

    if (result1.affectedRows) {
      message = "Food Registration Master updated successfully";
    }

    if (status === "Pending") {
      const result2 = await db.query(
        `UPDATE mh_food_master SET status="Verified" WHERE agent_id='${agent_id}'`
      );

      if (result2.affectedRows) {
        message = "Food Registration Master updated successfully";
      }
    }

    return { message };
  } catch (error) {
    console.error("Error while updating Food Data", error.message);
    throw error;
  }
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
async function createFoodDetails(fields, files, docs, ipAddress) {
  let data = JSON.parse(fields.food_details);
  let food_items_list_arr = [];
  for (let i = 0; i < data.foodItemsList.length; i++) {
    food_items_list_arr.push(data.foodItemsList[i].food_items_name);
  }
  let foodItemsList = food_items_list_arr.toString();

  const result = await db.query(
    `INSERT IGNORE INTO mh_foodpartner_details(account_id,agent_id, agent_sub_id,kitchen_name, kitchen_type,item_name,food_type_id,food_items_name,items_available_from,items_available_to,price,units,partner_status,food_image,ip_address)VALUES
      (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.user_id ?? "",
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
      data.foodName.item_name ?? "",
      data.foodName.food_type_id ?? "",
      foodItemsList ?? "",
      data.items_available_from ?? "",
      data.items_available_to?? "",
      data.price ?? "",
      data.units ?? "",
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
async function loadFoodStatus(agent_id, agent_sub_id, txn_id, data) {
  var foodstatus = data.status == true ? "yes" : "no";

  const result = await db.query(
    `UPDATE mh_foodpartner_details SET status=?,txn_id=? WHERE agent_id='${agent_id}' && agent_sub_id='${agent_sub_id}' && txn_id='${txn_id}' `,
    [foodstatus, data.txn_id ?? ""]
  );
  let message = "Error while changing the food details status Data";

  if (result.affectedRows) {
    message = "Food Status Changed Successfully";
  }

  return { message };
}
async function updateFoodDetails(txnID, agentId, agentSubId, data) {
  // console.log("thiru",txnID, agentId, agentSubId, data)
  let food_items_list_arr = [];
  for (let i = 0; i < data.foodItemsList.length; i++) {
    food_items_list_arr.push(
      data.foodItemsList[i].food_items_name ?? data.foodItemsList[i]
    );
  }
  let foodItemsList = food_items_list_arr.toString();
  const result = await db.query(
    `UPDATE mh_foodpartner_details SET  account_id=?,agent_id=?, agent_sub_id=?,kitchen_name=?, kitchen_type=?,food_type_id=?, item_name=?,food_items_name=?,price=?,units=?,partner_status=?,food_image=? WHERE txn_id='${txnID}' AND agent_id='${agentId}' AND agent_sub_id='${agentSubId}'`,
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
      data.foodName.food_type_id ?? data.food_type_id,
      data.foodName.item_name ?? data.foodName,
      foodItemsList ?? "",
      data.price ?? "",
      data.units ?? "",
      data.partner_status ?? "",
      data.food_image ?? "",
    ]
  );
  let message = "Error in updating Food Details Registration";

  if (result.affectedRows) {
    message = "Food Details Master updated successfully";
  }

  return { message };
}

async function update(id, update) {
  const result = await db.query(
    `UPDATE mh_food_master 
      SET  parent_type_name=?
      WHERE parent_type_id=?`,
    [update.parent_type_name, update.parent_type_id]
  );

  let message = "Error in updating Food Registration Master";

  if (result.affectedRows) {
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
async function getFoodAllDisplayForStaff(status) {
  console.log("status",status);
  let eq = "";
  if (status != "ALL") {
    eq = " AND status = " + "'" + status + "' ";
  }
  let qry =
    "SELECT  agent_id,agent_sub_id,account_id,status,agent_name,agent_sub_name,  phone, fax,email_id, description, building_no, street, land_mark, city, country, state,pin_code, pan, aadhar, gstin,fassai_no, bankAccountNo, bankName, branchName, ifsc, accept,pan_card_file,addhaar_no,gst_tin_loc,mh_agreement_loc,mb_certificate_loc,food_safety_certificate,file_upload5,food_tax,state_id,city_id,account_id,ip_address FROM mh_food_master WHERE status=?" +
    eq +
    "  ORDER BY agent_id  ASC";
  //console.log('qry',qry);
  const rows = await db.query(qry,[status]);
  const result = helper.emptyOrRows(rows);
  let data = [];
  var index =0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      var food_count = "";
      if(element.agent_id){
        food_count = await helper.getCountOfFoodId(element.agent_id)
        index = index+1;
      };
      data.push({
        food_count: food_count,
        index:index,
        ...element
      });
    }
  }
  console.log(data)
  return data;
}
module.exports = {
  getFoodMultiple,
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
  updateFoodDetails,
  updateDetails,
  loadPartnerNames,
  loadSubPartnerNames,
  getMainFoodPartnerDetails,
  loadFoodStatus,
  ledgerFoodDetails,
  updateFoodMasterForm,
  getFoodAllDisplayForStaff,
};
