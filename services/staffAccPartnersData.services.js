const db = require("./db");
const helper = require("../helper");

async function getStaffPropertRegData() {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT partner_id,partner_sub_id,agent_name, agent_sub_name,company_name,individual_name, phone, fax, email_id, agent_commission, description, building_no, street, land_mark, city, city_id, country, state, state_id, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, accept,pan_loc,addhaar_loc,gst_tin_loc,mh_agreement_loc,partner_pic_loc,mb_certificate_loc,property_tax_loc,fire_safety_loc,status,property_type,cancelled_cheque_doc FROM mh_property_master GROUP BY partner_id`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  var index = 0;

  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      var property_count = "";
      if (element.partner_id) {
        property_count = await helper.getCountOfPartnerId(element.partner_id);
      }
      index = index + 1;
      data.push({
        property_count: property_count,
        index: index,
        ...element,
      });
    }
  }

  return {
    data,
  };
}
async function getAllPartners() {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT partner_id,partner_sub_id,agent_name, agent_sub_name,company_name,individual_name, phone, fax, email_id, agent_commission, description, building_no, street, land_mark, city, city_id, country, state, state_id, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, accept,pan_loc,addhaar_loc,gst_tin_loc,mh_agreement_loc,partner_pic_loc,mb_certificate_loc,property_tax_loc,fire_safety_loc,status,property_type,cancelled_cheque_doc FROM mh_property_master GROUP BY partner_id`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  var index = 0;

  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      var property_count = "";
      if (element.partner_id) {
        property_count = await helper.getCountOfPartnerId(element.partner_id);
      }
      index = index + 1;
      data.push({
        property_count: property_count,
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
    `SELECT partner_id,partner_sub_id,agent_name,agent_sub_name, company_name,individual_name, phone, fax, email_id, agent_commission, description, building_no, street, land_mark, city, city_id, country, state, state_id, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, accept,pan_loc,addhaar_loc,gst_tin_loc,mh_agreement_loc,partner_pic_loc,mb_certificate_loc,property_tax_loc,fire_safety_loc,status,property_type,cancelled_cheque_doc FROM mh_property_master WHERE partner_id='${params}'`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];

  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      var property_count = "";
      if (element.partner_id) {
        property_count = await helper.getCountOfPartnerId(element.partner_id);
      }
      data.push({
        property_count: property_count,
        ...element,
      });
    }
  }
  return {
    data,
  };
}
async function getPropertyDataOnStatus(params) {
  const rows = await db.query(
    `SELECT partner_id,partner_sub_id,agent_name, agent_sub_name,company_name,individual_name, phone, fax, email_id, agent_commission, description, building_no, street, land_mark, city, city_id, country, state, state_id, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, accept,pan_loc,addhaar_loc,gst_tin_loc,mh_agreement_loc,partner_pic_loc,mb_certificate_loc,property_tax_loc,fire_safety_loc,status,property_type,cancelled_cheque_doc FROM mh_property_master WHERE status='${params}'`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];

  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      var property_count = "";
      if (element.partner_id) {
        property_count = await helper.getCountOfPartnerId(element.partner_id);
      }
      data.push({
        property_count: property_count,
        ...element,
      });
    }
  }
  return {
    data,
  };
}
// async function checkPincode(params) {
//   const rows = await db.query(
//     `SELECT state, district, taluk, postal_division, pincode FROM pincode_master WHERE pincode='${params}'`
//   );
//   const result = helper.emptyOrRows(rows);
//   let data = [];

//   for (const key in result) {
//     if (Object.hasOwnProperty.call(result, key)) {
//       const element = result[key];

//       var property_count = "";
//       if(element.partner_id){
//         property_count = await helper.getCountOfPartnerId(
//           element.partner_id)
//       };
//       data.push({
//         property_count: property_count,
//         ...element
//       });
//     }
//   }
//   return {
//     data,
//   };
// }
// async function getPropertyPartner() {
//   const rows = await db.query(`SELECT * FROM mh_property_master WHERE status != 'pending'`);
//     const data = helper.emptyOrRows(rows);
//   return {
//     data,
//   };
// }
async function getPropertyPartner() {
  const rows = await db.query(
    `SELECT partner_id, partner_sub_id, account_id, property_id, property_name, property_type, agent_name, agent_sub_name, company_name, individual_name, phone, fax, alternate_no, email_id, agent_commission, description, building_no, street, land_mark, city, city_id, country, state, state_id, pin_code, pan, aadhar, gst_registration, gstin, bankAccountNo, bankName, branchName, ifsc, cancelled_cheque_doc, pan_loc, gst_tin_loc, addhaar_loc, mh_agreement_loc, partner_pic_loc, mb_certificate_loc, property_tax_loc, fire_safety_loc, accept, status, remarks FROM mh_property_master WHERE status = 'approved'`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];

  var index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      var property_count = "";
      if (element.partner_id) {
        property_count = await helper.getCountOfPartnerId(element.partner_id);
      }
      index = index + 1;
      data.push({
        property_count: property_count,
        index: index,
        ...element,
      });
    }
  }
  return {
    data,
  };
}
async function getPropertyDisplayCountOfAdmin(status) {
  if (status != "all") {
    const rows = await db.query(
      `SELECT partner_id, partner_sub_id, account_id, property_id, property_name, property_type, agent_name, agent_sub_name, company_name, individual_name, phone, fax, alternate_no, email_id, agent_commission, description, building_no, street, land_mark, city, city_id, country, state, state_id, pin_code, pan, aadhar, gst_registration, gstin, bankAccountNo, bankName, branchName, ifsc, cancelled_cheque_doc, pan_loc, gst_tin_loc, addhaar_loc, mh_agreement_loc, partner_pic_loc, mb_certificate_loc, property_tax_loc, fire_safety_loc, accept, status, remarks FROM mh_property_master WHERE status = '${status}'`
    );
    const result = helper.emptyOrRows(rows);
    var data = [];

    var index = 0;
    for (const key in result) {
      if (Object.hasOwnProperty.call(result, key)) {
        const element = result[key];

        var property_count = "";
        if (element.partner_id) {
          property_count = await helper.getCountOfPartnerId(element.partner_id);
        }
        index = index + 1;
        data.push({
          property_count: property_count,
          index: index,
          ...element,
        });
      }
    }
    return {
      data,
    };
  } else if (status == "all") {
    const rows = await db.query(
      `SELECT partner_id, partner_sub_id, account_id, property_id, property_name, property_type, agent_name, agent_sub_name, company_name, individual_name, phone, fax, alternate_no, email_id, agent_commission, description, building_no, street, land_mark, city, city_id, country, state, state_id, pin_code, pan, aadhar, gst_registration, gstin, bankAccountNo, bankName, branchName, ifsc, cancelled_cheque_doc, pan_loc, gst_tin_loc, addhaar_loc, mh_agreement_loc, partner_pic_loc, mb_certificate_loc, property_tax_loc, fire_safety_loc, accept, status, remarks FROM mh_property_master WHERE 1`
    );
    const result = helper.emptyOrRows(rows);
    var data = [];

    var index = 0;
    for (const key in result) {
      if (Object.hasOwnProperty.call(result, key)) {
        const element = result[key];

        var property_count = "";
        if (element.partner_id) {
          property_count = await helper.getCountOfPartnerId(element.partner_id);
        }
        index = index + 1;
        data.push({
          property_count: property_count,
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
    `SELECT (SELECT COUNT(*) FROM mh_property_master WHERE status='pending') AS pcount,(SELECT COUNT(*) FROM mh_property_master WHERE status='verified') AS vcount,(SELECT COUNT(*) FROM mh_property_master WHERE status='approved') AS acount, (SELECT COUNT(*) FROM mh_property_master WHERE status='rejected') AS rcount FROM mh_property_master GROUP BY partner_id`
  );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}
async function getStatusCountForAdmin() {
  const rows = await db.query(
    `SELECT (SELECT COUNT(*) FROM mh_property_master WHERE status='pending') AS pcount,(SELECT COUNT(*) FROM mh_property_master WHERE status='verified') AS vcount,(SELECT COUNT(*) FROM mh_property_master WHERE status='approved') AS acount, (SELECT COUNT(*) FROM mh_property_master WHERE status='rejected') AS rcount FROM mh_property_master GROUP BY partner_id`
  );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}
async function getPropertyData(partner_id, partner_sub_id) {
  const rows = await db.query(
    `SELECT txn_id, account_id, partner_id, partner_sub_id, partner_name, sub_partner_name, partner_phone, property_id, property_name, sub_property_name, property_phone, property_email,property_alternate_email, property_description, property_latitude, property_longitude, building_no, street, land_mark, country, state_id, state_name, city_id, city_name, pin_code, amenity_name, amenity_icon, checkIn_time, checkOut_time, Name_Of_Contact_Person, upload_image, upload_image1, upload_image2, upload_image3, upload_image4, remarks, property_status, bankAccountNo, bankName, branchName, ifsc, cancelled_cheque_doc,mh_agreement,mh_declaration,mh_bankmandate,mh_gstin,mh_service_fee FROM mh_property_details_table WHERE partner_id=${partner_id} && partner_sub_id=${partner_sub_id};`
  );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
};
async function getRoomsData(partner_id, partner_sub_id, txn_id) {
  const rows = await db.query(
    `SELECT txn_id, property_txn_id, partner_id, partner_sub_id, partner_name, sub_partner_name, property_name, sub_property_name, facilities, icon_image, no_of_avail_rooms,room_category,room_type, price, units, room_image_1, room_image_2, room_image_3,room_image_4,room_image_5 ,date_from, date_to,property_specialOffer FROM mh_property_rooms_table WHERE partner_id=${partner_id} && partner_sub_id=${partner_sub_id} && property_txn_id=${txn_id};`
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
async function getSingleParentTypeDetail(id) {
  const rows = await db.query(
    `SELECT  id,property_name,phone,email,registration_number FROM mht_hotels WHERE parent_type_id='${id}'`);
  const data = helper.emptyOrRows(rows);
  return data;
}
async function create(fields, files, docs, ipAddress) {
  let data = JSON.parse(fields.propertyPartnerDetails);
  let partnerSubId = await helper.generatePartnerSUBID();
  const result = await db.query(
    `INSERT IGNORE INTO mh_property_master(account_id,partner_sub_id,property_id,property_type,agent_name,agent_sub_name, company_name,individual_name, phone, fax, email_id, description, building_no, street, land_mark, city, country, state, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, accept,pan_loc,addhaar_loc,gst_tin_loc,mh_agreement_loc,mb_certificate_loc,property_tax_loc,fire_safety_loc,cancelled_cheque_doc,state_id,city_id, ip_address)VALUES
      (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.account_id ?? "",
      partnerSubId ?? "",
      data.propertyType.property_id ?? "",
      data.propertyType.property_name ?? "",
      data.name ?? "",
      data.name ?? "",
      data.company_name ?? "",
      data.individual_name ?? "",
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
      docs.propertyTaxName ?? "",
      docs.fireSafetyName ?? "",
      docs.cancelledChequeName ?? "",
      data.state.state_id ?? "",
      data.city.city_id ?? "",
      ipAddress,
    ]
    );

  let message = "Error in Property Registration Master";

  if (result.affectedRows) {
    message = "Property Registration Master created successfully";
  }
  return { message };
}

async function exsistingUserCreate(fields, files, docs,ipAddress) {
  let data = JSON.parse(fields.propertyPartnerDetails);
  let partnerSubId = await helper.generatePartnerSUBID();
  const result = await db.query(
    `INSERT IGNORE INTO mh_property_master(account_id,partner_id,partner_sub_id,property_name,property_type,agent_name,agent_sub_name,company_name,individual_name, phone, fax, email_id, description, building_no, street, land_mark, city, country, state, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, accept,pan_loc,addhaar_loc,gst_tin_loc,mh_agreement_loc,mb_certificate_loc,property_tax_loc,fire_safety_loc,cancelled_cheque_doc,state_id,city_id,ip_address)VALUES
      (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.account_id ?? "",
      data.partner_id ?? "",
      partnerSubId ?? "",
      data.propertyType ?? "",
      data.propertyType ?? "",
      data.partner_name ?? "",
      data.name ?? "",
      data.company_name ?? "",
      data.individual_name ?? "",
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
      docs.propertyTaxName ?? "",
      docs.fireSafetyName ?? "",
      docs.cancelledChequeName ?? "",
      data.state.state_id ?? "",
      data.city.city_id ?? "",
      ipAddress,
    ]
  );

  let message = "Error in Property Registration Master";

  if (result.affectedRows) {
    message = "Property Registration Master created successfully";
  }
  return { message };
}

async function createPropertyDetails(fields, files, docs, ipAddress) {
  let data = JSON.parse(fields.property_details);
  let amenity_nameArr = [];
  let amenity_iconArr = [];
  for (let i = 0; i < data.amenities.length; i++) {
    amenity_nameArr.push(data.amenities[i].amenity_name);
    amenity_iconArr.push(data.amenities[i].icon_image);
  }
  let amenityName = amenity_nameArr.toString();
  let amenityIcon = amenity_iconArr.toString();
 
  // let property_txn_id =`PRTY00${await helper.generatePropertyTxnId("mh_property_details_table")}`;
  const result = await db.query(
    `INSERT IGNORE INTO mh_property_details_table( account_id,partner_id, partner_sub_id, partner_name,sub_partner_name, partner_phone, property_name, sub_property_name, property_phone,property_email,property_description,property_latitude,property_longitude,building_no,street,land_mark,country,state_id,state_name,city_id,city_name,pin_code,amenity_name, amenity_icon,upload_image,upload_image1,upload_image2,ip_address)VALUES
      (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.account_id ?? "",
      data.partner_id ?? "",
      data.partner_sub_id ?? "",
      data.partner_name ?? "",
      data.partner_sub_name ?? "",
      data.partner_phone ?? "",
      data.property_name ?? "",
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
      docs.upload_image1_name ?? "",
      docs.upload_image2_name ?? "",
      docs.upload_image3_name ?? "",
      ipAddress,
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

async function createRoomDetails(fields, files, docs, ipAddress) {
  let data = JSON.parse(fields.room_details);
  let amenity_arr = [];
  let amenity_iconArr = [];
  for (let i = 0; i < data.facilities.length; i++) {
    amenity_arr.push(data.facilities[i].amenity_name);
    amenity_iconArr.push(data.facilities[i].icon_image);
  }
  let amenities = amenity_arr.toString();
  let amenityIcon = amenity_iconArr.toString();
  const result = await db.query(
    `INSERT IGNORE INTO mh_property_rooms_table(property_txn_id, partner_id, partner_sub_id, partner_name, sub_partner_name, property_name, sub_property_name, no_of_avail_rooms, room_type, facilities, icon_image, other_amenities,price, units, room_image_1,room_image_2,room_image_3,room_image_4,room_image_5,room_category,date_from,date_to,account_id,property_specialOffer,ip_address)VALUES
    (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
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
    data.property_specialOffer ?? "",
    ipAddress,
    ]
  );

  let message = "Error in Saving Room Details";

  if (result.affectedRows) {
    message = "Room Details created successfully";
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

  let message = "Error in updating Property Registration Master";

  if (result.affectedRows) {
    message = "Property Registration Master updated successfully";
  }

  return { message };
}
async function remove(id) {
  const result = await db.query(
    `DELETE FROM mht_hotels WHERE parent_type_id=?`,
    [id]
  );

  let message = "Error in deleting Property Registration Master";

  if (result.affectedRows) {
    message = "Property Registration Master deleted successfully";
  }

  return { message };
}

async function createPropretyReg(data) {
  // var status_accept = data.accept == true ? "yes" : "no";

  let partnerSubId = await helper.generatePartnerSUBID();
  const result = await db.query(
    `INSERT IGNORE INTO mh_property_master(partner_id,partner_sub_id,property_type,property_name,agent_name, company_name,individual_name, phone, fax, email_id, description, building_no, street, land_mark, city, country, state, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, accept)VALUES
      (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.partner_id ?? "",
      partnerSubId ?? "",
      data.property.property_type ?? "",
      data.property_name ?? "",
      data.name ?? "",
      data.company_name ?? "",
      data.individual_name ?? "",
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

  let message = "Error in Property Registration Master";

  if (result.affectedRows) {
    message = "Property Registration Master created successfully";
  }

  return { message };
}
// async function updateDetails(
//   accountId,
//   partnerId,
//   partnerSubId,
//   agentName,
//   agentSubName,
//   status,
//   data
// ) {
//   const result = await db.query(
//     `UPDATE mh_property_master SET  account_id=?, partner_id=?, partner_sub_id=?,agent_name=?,agent_sub_name=?, phone=?, fax=?, email_id=?, description=?, building_no=?, street=?, land_mark=?, city=?, city_id=?, country=?, state=?, state_id=?,pin_code=?, bankAccountNo=?, bankName=?, branchName=?, ifsc=?, accept=?, pan_loc=?, addhaar_loc=?, mh_agreement_loc=?, mb_certificate_loc=?, gst_tin_loc=?, property_tax_loc=?, fire_safety_loc=?, cancelled_cheque_doc=? WHERE account_id='${accountId}' AND partner_id='${partnerId}' AND partner_sub_id='${partnerSubId}'`,
//     [
//       data.account_id ?? "",
//       data.partner_id ?? "",
//       data.partner_sub_id ?? "",
//       // data.propertyType ?? "",
//       // data.propertyType ?? "",
//       agentName == agentSubName ? data.name : agentName,
//       data.name ?? "",
//       // data.company_name ?? "",
//       // data.individual_name?? "",
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
//       data.bankAccountNo ?? "",
//       data.bankName ?? "",
//       data.branchName ?? "",
//       data.ifsc ?? "",
//       data.accept ?? "",
//       data.pan_card_upt ?? "",
//       data.addhaar_no_upt ?? "",
//       data.mh_agreement_upt ?? "",
//       data.mb_certificate_upt ?? "",
//       data.gst_tin_upt ?? "",
//       data.property_tax_upt ?? "",
//       data.fire_safety_upt ?? "",
//       data.cancelled_cheque_upt ?? "",
//     ]
//   );
//   let message = "Error in updating Property Registration Master";
//   if (status == "pending") {
//     const result2 = await db.query(
//       `UPDATE mh_property_master SET status="verified" WHERE partner_id='${partnerId}'`
//     );
//     let message = "Error in updating Property Registration Master";
//     if (result2.affectedRows) {
//       message = "Property Registration Master updated successfully";
//     }
//     return { message };
//   }else{
//     message = "Property Registration Master updated successfully";
//   }
 

//   if (result.affectedRows) {
//     message = "Property Registration Master updated successfully";
//   }

//   return { message };
// }




async function updatePropertyPartnerForm(
  partnerId,
  partnerSubId,
  agentName,
  agentSubName,
  status,
  docNames,
  data
) {
  // console.log("data111111",data,docNames)
 // let data = JSON.parse(fields.updateProperty);

  const result = await db.query(
    `UPDATE mh_property_master SET   partner_id=?, partner_sub_id=?,agent_name=?,agent_sub_name=?, phone=?, fax=?, email_id=?, description=?, building_no=?, street=?, land_mark=?, city=?, city_id=?, country=?, state=?, state_id=?,pin_code=?, bankAccountNo=?, bankName=?, branchName=?, ifsc=?, accept=?, pan_loc=?, addhaar_loc=?, mh_agreement_loc=?, mb_certificate_loc=?, gst_tin_loc=?, property_tax_loc=?, fire_safety_loc=?, cancelled_cheque_doc=?,gstin=? WHERE partner_id='${partnerId}' AND partner_sub_id='${partnerSubId}'`,
    [
    //  data.account_id ?? "",
      data.partner_id ?? "",
      data.partner_sub_id ?? "",
      // data.propertyType ?? "",
      // data.propertyType ?? "",
      agentName == agentSubName ? data.name : agentName,
      data.name ?? "",
      // data.company_name ?? "",
      // data.individual_name?? "",
      data.phone ?? "",
      data.fax ?? "",
      data.email_id ?? "",
      data.description ?? "",
      data.building_no ?? "",
      data.street ?? "",
      data.land_mark ?? "",
      data.city ?? "",
      data.city_id ?? "",
      data.country ?? "",
      data.state ?? "",
      data.state_id ?? "",
      data.pin_code ?? "",
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
      data.gstin ?? "",
    ]
  );
  let message = "Error in updating Property Registration Master";
  if (status == "pending") {
    const result2 = await db.query(
      `UPDATE mh_property_master SET status="verified" WHERE partner_id='${partnerId}'`
    );
    let message = "Error in updating Property Registration Master";
    if (result2.affectedRows) {
      message = "Property Registration Master updated successfully";
    }
    return { message };
  }else{
    message = "Property Registration Master updated successfully";
  }
 
  if (result.affectedRows) {
    message = "Property Registration Master updated successfully";
  }

  return { message };
}
async function updatePropertyData(txnID,data,docNames) {
  // let data = JSON.parse(fields.updateproperty_details);
 //console.log("service",data)
  const result = await db.query(
    `UPDATE mh_property_details_table SET  partner_id=?, partner_sub_id=?, partner_name=?, sub_partner_name=?, partner_phone=?, property_name=?, sub_property_name=?, property_phone=?, property_email=?,property_alternate_email=?, property_description=?, property_latitude=?, property_longitude=?, building_no=?, street=?, land_mark=?, country=?, state_id=?, state_name=?, city_id=?, city_name=?, pin_code=?,upload_image=?,upload_image1=?,upload_image2=?,upload_image3=?,upload_image4=?,cancelled_cheque_doc=?,mh_agreement=?,mh_declaration=?,mh_bankmandate=?,mh_gstin=?,bankAccountNo=?,bankName=?,branchName=?,ifsc=? WHERE txn_id='${txnID}'`,
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
      data.property_alternate_email ?? "",
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
      docNames.upload_image1_name ?? "",
      docNames.upload_image2_name ?? "",
      docNames.upload_image3_name ?? "",
      docNames.upload_image4_name ?? "",
      docNames.upload_image5_name ?? "",

      docNames.property_cancelchequeName ?? "",
      docNames.propety_agreementName ?? "",
      docNames.property_declarationName ?? "",
      docNames.property_bankmandateName ?? "",
      docNames.property_gst_tinName ?? "",
      data.bankAccountNo ?? "",
      data.bankName ?? "",
      data.branchName ?? "",
      data.ifsc ?? "",
   ]
  );
  let message = "Error in updating Property Data";

  if (result.affectedRows) {
    message = "Property Data  updated successfully";
  }

  return { message };
}
async function updateRoomsData(
  txnID,
  partner_id,
   partner_sub_id,
   property_txn_id,
    data,
    docNames
    ) {
      console.log("ddd",  txnID,
      partner_id,
       partner_sub_id,
       property_txn_id,)
  let amenity_arr = [];
  let amenity_iconArr = [];
  for (let i = 0; i < data.facilities.length; i++) {
    amenity_arr.push(data.facilities[i].amenity_name ?? data.facilities[i]);
    amenity_iconArr.push(data.facilities[i].icon_image);
  }
  let amenities = amenity_arr.toString();
  let amenityIcon = amenity_iconArr.toString();
  const result = await db.query(
    `UPDATE mh_property_rooms_table SET  partner_id=?,partner_sub_id=?, property_name=?, sub_property_name=?, facilities=?, icon_image=?, no_of_avail_rooms=?, room_type=?, price=?, units=?, date_from=?, date_to=?,room_category=? ,property_specialOffer=?,room_image_1=?,room_image_2=?,room_image_3=?,room_image_4=?,room_image_5=? WHERE txn_id='${txnID}' AND partner_id='${partner_id}' AND partner_sub_id='${partner_sub_id}'  AND property_txn_id='${property_txn_id}'`,
    [
      // data.property_txn_id ??"",
      data.partner_id ?? "",
      data.partner_sub_id ?? "",
      data.property_name ?? "",
      data.sub_property_name ?? "",
      amenities ?? "",
      amenityIcon ?? "",
      data.no_of_avail_rooms ?? "",
      data.room_type ?? "",
      data.price ?? "",
      data.units ?? "",
     
      data.date_from ?? data.data_from_up,
      data.date_to ?? data.data_to_up,
      data.room_category ?? "",
      data.property_specialOffer ?? "",
      docNames.upload_room_image1_name ?? "",
      docNames.upload_room_image2_name ?? "",
      docNames.upload_room_image3_name ?? "",
      docNames.upload_room_image4_name ?? "",
      docNames.upload_room_image5_name ?? "",
    ]
  );

  let message = "Error in Updating Room Details";

  if (result.affectedRows) {
    message = "Room Details Updated successfully";
  }
  return { message };
}
async function getMultiplePropertyDetails() {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT agent_name, company_name,individual_name, phone, fax, email_id, agent_commission, description, building_no, street, land_mark, city, country, state, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, accept FROM mh_property_master WHERE 1`
  );
  const data = helper.emptyOrRows(rows);
  //   const meta = { page };

  return {
    data,
  };
}
async function getAllPartnersForAdmin() {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT account_id,partner_id,partner_sub_id,agent_name, agent_sub_name,company_name,individual_name, phone, fax, email_id, agent_commission, description, building_no, street, land_mark, city, city_id, country, state, state_id, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, accept,pan_loc,addhaar_loc,gst_tin_loc,mh_agreement_loc,partner_pic_loc,mb_certificate_loc,property_tax_loc,fire_safety_loc,status,property_type,cancelled_cheque_doc FROM mh_property_master WHERE status='verified'`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  var index = 0;

  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      var property_count = "";
      if (element.partner_id) {
        property_count = await helper.getCountOfPartnerId(element.partner_id);
      }
      index = index + 1;
      data.push({
        property_count: property_count,
        index: index,
        ...element,
      });
    }
  }
  console.log("data", data);
  return {
    data,
  };
}
async function loadPartnerNames() {
  const rows = await db.query(
    `SELECT partner_id, agent_name FROM mh_property_master GROUP BY partner_id`
  );
  const data = helper.emptyOrRows(rows);
  return { data };
}
async function loadSubPartnerNames(partnerID) {
  const rows = await db.query(
    `SELECT partner_sub_id, agent_sub_name, building_no, street, land_mark, city, state, country, pin_code FROM mh_property_master WHERE partner_id='${partnerID}'`
  );
  const data = helper.emptyOrRows(rows);
  return { data };
}
async function loadPropertyNames(partnerID, partnerSubID) {
  const rows = await db.query(
    `SELECT txn_id, sub_property_name FROM mh_property_details_table WHERE partner_id='${partnerID}' AND partner_sub_id='${partnerSubID}'`
  );
  const data = helper.emptyOrRows(rows);
  return { data };
}
async function getHotelInfo(
  property_txn_id,
  partner_id,
  partner_sub_id
) {
  const rows = await db.query(
    `SELECT account_id,txn_id,property_txn_id,partner_id,partner_sub_id,sub_property_name,room_type, date_format(date_from,"%d-%m-%Y") as date_from, date_format(date_to,"%d-%m-%Y") as date_to,facilities, units,property_specialOffer FROM mh_property_rooms_table WHERE property_txn_id='${property_txn_id}' && partner_id='${partner_id}' && partner_sub_id='${partner_sub_id}';`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  var index = 0;
  let property_amenity_name = [];
  let test_1 = [];
  let test_2 = [];
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      index = index + 1;

      const rows2 = await db.query(
        `SELECT amenity_name, amenity_icon FROM mh_property_details_table WHERE txn_id='${property_txn_id}' AND partner_id='${partner_id}' AND partner_sub_id='${partner_sub_id}';`
      );
      const result2 = helper.emptyOrRows(rows2);
      for (let i = 0; i < result2.length; i++) {
        var test_name = result2[i].amenity_name;
        var test_icon = result2[i].amenity_icon;
        var arr1 = new Array();
        var arr2 = new Array();
        arr1 = test_name.split(",");
        arr2 = test_icon.split(",");

        test_1 = arr1;
        test_2 = arr2;

        for (let j = 0; j < arr1.length; j++) {
          let amenityName = arr1[j];
          let amenityIcon = arr2[j];
          property_amenity_name.push({
            name: amenityName,
            icon: amenityIcon,
          });
        }
      }
      data.push({
        index: index,
        property_amenity_name: [...property_amenity_name],
        test_1: test_1,
        test_2: test_2,
        ...element,
      });
    }
  }
  return { data };
}
async function getpartnerStatusCount() {
  const rows = await db.query(
    `SELECT (SELECT COUNT(*) FROM partner_registration WHERE status='Pending' AND partner_type !="Booking Agent") AS pcount,(SELECT COUNT(*) FROM partner_registration WHERE status='Approved' AND partner_type !="Booking Agent") AS acount, (SELECT COUNT(*) FROM partner_registration WHERE status='Rejected' AND partner_type !="Booking Agent") AS rcount FROM partner_registration WHERE partner_type !="Booking Agent"  GROUP BY partner_id;`
  );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}
module.exports = {
  getStaffPropertRegData,
  getSingleParentTypeDetail,
  create,
  update,
  remove,
  createPropretyReg,
  getMultiplePropertyDetails,
  getStatusCount,
  getStatusCountForAdmin,
  getPropertyDataOnStatus,
  getPropertyData,
  exsistingUserCreate,
  existingUserProperty,
  getAllPartners,
  createRoomDetails,
  createPropertyDetails,
  getRoomsData,
  // updateDetails,
  updatePropertyPartnerForm,
  updatePropertyData,
  getPropertyPartner,
  getPropertyDisplayCountOfAdmin,
  updateRoomsData,
  getAllPartnersForAdmin,
  loadPartnerNames,
  loadSubPartnerNames,
  loadPropertyNames,
  getHotelInfo,
  getpartnerStatusCount,
  // checkPincode
};
