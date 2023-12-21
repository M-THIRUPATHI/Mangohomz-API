const db = require("./db");
const helper = require("../helper");
const http = require('http');
const moment = require("moment");
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

async function getMultiple(params) {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT account_id, partner_id,partner_sub_id,agent_name, agent_sub_name,company_name,individual_name, phone, fax, email_id, agent_commission, description, building_no, street, land_mark, city, country, state, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, accept,pan_loc,addhaar_loc,gst_tin_loc,mh_agreement_loc,partner_pic_loc,mb_certificate_loc,property_tax_loc,fire_safety_loc,status,property_type,cancelled_cheque_doc, concat(building_no,",",street,"," ,state,"," ,city,"," ,country) as address,concat(state,"," ,city) as location,alternate_no FROM mh_property_master WHERE account_id = '${params}'`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      index = index + 1;
      var property_count = "";
      if (element.partner_id) {
        property_count = await helper.getCountOfPartnerId(element.partner_id);
      }
      data.push({
        sno: index,
        property_count: property_count,
        ...element,
      });
    }
  }
  return {
    data,
  };
}
async function getHotelInfo(
  account_id,
  property_txn_id,
  partner_id,
  partner_sub_id
) {
  const rows = await db.query(
    `SELECT account_id,txn_id,property_txn_id,partner_id,partner_sub_id,sub_property_name,room_type,room_category, date_format(date_from,"%d-%m-%Y") as date_from, date_format(date_to,"%d-%m-%Y") as date_to,facilities, max_allow_adult,max_allow_kids,gst_per,	withac_withbreakfast_price,withac_withoutbreakfast_price,	withoutac_withbreakfast_price,withoutac_withoutbreakfast_price	,units,property_specialOffer,status,room_image_1,(SELECT COUNT(*) FROM mh_property_rooms_table WHERE partner_sub_id='${partner_sub_id}') AS chandu FROM mh_property_rooms_table WHERE account_id='${account_id}' && property_txn_id='${property_txn_id}' && partner_id='${partner_id}' && partner_sub_id='${partner_sub_id}';`
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
        `SELECT amenity_name, amenity_icon FROM mh_property_details_table WHERE account_id='${account_id}' AND txn_id='${property_txn_id}' AND partner_id='${partner_id}' AND partner_sub_id='${partner_sub_id}';`
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
async function getfoodHotelInfo(
  account_id,
  property_txn_id,
  partner_id,
  partner_sub_id
) {
  const rows = await db.query(
    `SELECT account_id,txn_id,property_txn_id,partner_id,partner_sub_id,sub_property_name,room_type,room_category, date_format(date_from,"%d-%m-%Y") as date_from, date_format(date_to,"%d-%m-%Y") as date_to,facilities, units,property_specialOffer,status,room_image_1,(SELECT COUNT(*) FROM mh_property_rooms_table WHERE partner_sub_id='${partner_sub_id}') AS chandu FROM mh_property_rooms_table WHERE account_id='${account_id}' && property_txn_id='${property_txn_id}' && partner_id='${partner_id}' && partner_sub_id='${partner_sub_id}';`
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
        `SELECT amenity_name, amenity_icon FROM mh_property_details_table WHERE account_id='${account_id}' AND txn_id='${property_txn_id}' AND partner_id='${partner_id}' AND partner_sub_id='${partner_sub_id}';`
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
async function gettravelHotelInfo(
  account_id,
  property_txn_id,
  partner_id,
  partner_sub_id
) {
  const rows = await db.query(
    `SELECT account_id,txn_id,property_txn_id,partner_id,partner_sub_id,sub_property_name,room_type,room_category, date_format(date_from,"%d-%m-%Y") as date_from, date_format(date_to,"%d-%m-%Y") as date_to,facilities, units,property_specialOffer,status,room_image_1,(SELECT COUNT(*) FROM mh_property_rooms_table WHERE partner_sub_id='${partner_sub_id}') AS chandu FROM mh_property_rooms_table WHERE account_id='${account_id}' && property_txn_id='${property_txn_id}' && partner_id='${partner_id}' && partner_sub_id='${partner_sub_id}';`
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
        `SELECT amenity_name, amenity_icon FROM mh_property_details_table WHERE account_id='${account_id}' AND txn_id='${property_txn_id}' AND partner_id='${partner_id}' AND partner_sub_id='${partner_sub_id}';`
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
async function getmedicalHotelInfo(
  account_id,
  property_txn_id,
  partner_id,
  partner_sub_id
) {
  const rows = await db.query(
    `SELECT account_id,txn_id,property_txn_id,partner_id,partner_sub_id,sub_property_name,room_type,room_category, date_format(date_from,"%d-%m-%Y") as date_from, date_format(date_to,"%d-%m-%Y") as date_to,facilities, units,property_specialOffer,status,room_image_1,(SELECT COUNT(*) FROM mh_property_rooms_table WHERE partner_sub_id='${partner_sub_id}') AS chandu FROM mh_property_rooms_table WHERE account_id='${account_id}' && property_txn_id='${property_txn_id}' && partner_id='${partner_id}' && partner_sub_id='${partner_sub_id}';`
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
        `SELECT amenity_name, amenity_icon FROM mh_property_details_table WHERE account_id='${account_id}' AND txn_id='${property_txn_id}' AND partner_id='${partner_id}' AND partner_sub_id='${partner_sub_id}';`
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

async function getDateAvailability(
  account_id,
  property_txn_id,
  partner_id,
  partner_sub_id
) {
  const rows = await db.query(
    `SELECT  date_from,date_to  FROM mh_property_rooms_table WHERE account_id='${account_id}' && property_txn_id='${property_txn_id}' && partner_id='${partner_id}' && partner_sub_id='${partner_sub_id}';`
  );
  const data = helper.emptyOrRows(rows);
  // let data = [];
  // var index = 0;
  // for (const key in result) {
  //   if (Object.hasOwnProperty.call(result, key)) {
  //     const element = result[key];

  //     index = index + 1;
  //     data.push({
  //       index: index,
  //       ...element,
  //     });
  //   }
  // }

  return { data };
}
async function getHotelsNames(account_id) {
  const rows = await db.query(
    `SELECT account_id,property_txn_id,partner_id,partner_sub_id,sub_property_name,room_type,room_category,date_from, date_to,facilities, units,property_specialOffer FROM mh_property_rooms_table WHERE account_id='${account_id}' GROUP BY sub_property_name;`
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
async function getpropertyReg() {
  const rows = await db.query(
    `SELECT  partner_id,partner_sub_id,account_id,property_id,property_name,property_type,agent_name,agent_sub_name,individual_name,phone,fax,alternate_no,email_id,agent_commission,description,building_no,street,land_mark,city,city_id,country,state,state_id,pin_code,pan,aadhar,gstin,bankAccountNo,bankName,branchName,ifsc,cancelled_cheque_doc,pan_loc,gst_tin_loc,addhaar_loc,mh_agreement_loc,partner_pic_loc,mb_certificate_loc,property_tax_loc,fire_safety_loc, accept, status, remarks,concat(building_no,",",street,"," ,state,"," ,city,"," ,country) as address,concat(state,"," ,city) as location,alternate_no FROM mh_property_master WHERE 1 GROUP BY partner_id`
  );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}

// async function getpropertyReg() {
//   //const offset = helper.getOffset(page, config.listPerPage);
//   const rows = await db.query(`SELECT * FROM mh_property_master WHERE 1`);

//   const sql = `SELECT * FROM mh_property_master WHERE 1`;

//   const data = helper.emptyOrRows(rows);
//   return {
//     data,
//   };
// }

async function existingUserProperty(params) {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT account_id, partner_id,partner_sub_id,agent_name,agent_sub_name,company_name,individual_name, phone, fax, email_id, agent_commission, description, building_no, street, land_mark, city,city_id, country, state, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, accept,pan_loc,addhaar_loc,gst_tin_loc,mh_agreement_loc,partner_pic_loc,mb_certificate_loc,property_tax_loc,fire_safety_loc,status,property_type,cancelled_cheque_doc, concat(building_no,",",street,"," ,state,"," ,city,"," ,country) as address,concat(state,"," ,city) as location FROM mh_property_master WHERE partner_id='${params}'`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;

  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      index = index + 1;

      var property_count = "";
      if (element.partner_id) {
        property_count = await helper.getCountOfPartnerId(element.partner_id);
      }
      data.push({
        sno: index,
        property_count: property_count,
        ...element,
      });
    }
  }
  return {
    data,
  };
}
async function getPropertyDataOnStatus(params, params1) {
  const rows = await db.query(
    `SELECT partner_id,partner_sub_id,agent_name, agent_sub_name,company_name,individual_name, phone, fax, email_id, agent_commission, description, building_no, street, land_mark, city, country, state, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, accept,pan_loc,addhaar_loc,gst_tin_loc,mh_agreement_loc,partner_pic_loc,mb_certificate_loc,property_tax_loc,fire_safety_loc,status,property_type,cancelled_cheque_doc FROM mh_property_master WHERE status='${params}' AND account_id = '${params1}' GROUP BY partner_id`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;

  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      index = index + 1;

      var property_count = "";
      if (element.partner_id) {
        property_count = await helper.getCountOfPartnerId(element.partner_id);
      }
      data.push({
        sno: index,
        property_count: property_count,
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
    `SELECT (SELECT COUNT(*) FROM mh_property_master WHERE status='pending') AS pcount,(SELECT COUNT(*) FROM mh_property_master WHERE status='approved') AS acount, (SELECT COUNT(*) FROM mh_property_master WHERE status='rejected') AS rcount FROM mh_property_master GROUP BY status,partner_id ;`
  );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}
async function getPropertyData(accountId, partnerId, partnerSubId) {
  const rows = await db.query(
    `SELECT txn_id, account_id, partner_id, partner_sub_id, partner_name, sub_partner_name, partner_phone, property_name, sub_property_name, property_phone, property_email,property_alternate_email, property_description, property_latitude, property_longitude,building_no, street, land_mark, country, state_id, state_name, city_id, city_name, pin_code,concat(building_no,",",street,"," "," ,city_name,"," ,state_name,",",country,",",pin_code) as address, checkIn_time,checkOut_time,Name_Of_Contact_Person,upload_image, upload_image1, upload_image2, upload_image3, upload_image4,property_status,remarks,bankAccountNo,bankName,branchName,ifsc,cancelled_cheque_doc,mh_agreement,mh_declaration,mh_bankmandate,mh_service_fee FROM mh_property_details_table WHERE account_id='${accountId}' AND partner_id='${partnerId}' AND partner_sub_id='${partnerSubId}'`
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

async function getPropertyDataForAdmin(accountId, partnerId, partnerSubId) {
  const rows = await db.query(
    `SELECT txn_id, account_id, partner_id, partner_sub_id, partner_name, sub_partner_name, partner_phone, property_id, property_name, sub_property_name, property_phone, property_email, property_alternate_email, property_description, property_latitude, property_longitude, building_no, street, land_mark, country, state_id, state_name, city_id, city_name, pin_code,concat(building_no,",",street,"," "," ,city_name,"," ,state_name,",",country,",",pin_code) as address, amenity_name, amenity_icon, checkIn_time, checkOut_time, Name_Of_Contact_Person, upload_image, upload_image1, upload_image2, upload_image3, upload_image4, remarks, property_status, ip_address, bankAccountNo, bankName, branchName, ifsc, cancelled_cheque_doc, mh_agreement, mh_declaration, mh_bankmandate, mh_gstin, mh_offer_status, mh_service_fee, property_gstin, agent_fee_on_property, created_date_time, updated_date_time FROM mh_property_details_table WHERE account_id='${accountId}' AND partner_id='${partnerId}' AND partner_sub_id='${partnerSubId}'`
  );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}

async function getRoomsData(accountId, partnerId, partnerSubId, txnId) {
  const rows = await db.query(
    `SELECT txn_id, property_txn_id, partner_id, partner_sub_id, partner_name, sub_partner_name, property_name, sub_property_name, facilities, icon_image, no_of_avail_rooms,room_category,room_type, price, units, room_image_1, room_image_2, room_image_3, room_image_4, room_image_5, date_from, date_to,select_offer, partner_specialOffer, property_specialOffer, enter_amount, mh_offer,other_amenities,room_status FROM mh_property_rooms_table WHERE account_id='${accountId}' && partner_id='${partnerId}' && partner_sub_id='${partnerSubId}' && property_txn_id='${txnId}'`
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
      // console.log("kkkk",data);
    }
  }

  return { data };
}

async function getRoomsDataForAdmin(accountId, partnerId, partnerSubId, txnId) {
  const rows = await db.query(
    `SELECT txn_id, property_txn_id, partner_id, partner_sub_id, partner_name, sub_partner_name, property_name, sub_property_name, facilities, no_of_avail_rooms,room_category, room_type, price, units, room_image_1, room_image_2, room_image_3, room_image_4, room_image_5, date_format(date_from,"%d-%m-%Y") as date_from,date_format(date_to,"%d-%m-%Y") as date_to,property_specialOffer,room_status FROM mh_property_rooms_table WHERE account_id='${accountId}' && partner_id=${partnerId} && partner_sub_id=${partnerSubId} && property_txn_id=${txnId};`
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
  return data;
}
async function create(fields, files, docs, ipAddress) {
  let data = JSON.parse(fields.propertyPartnerDetails);
  let partnerSubId = await helper.generatePartnerSUBID();
  const result = await db.query(
    `INSERT IGNORE INTO mh_property_master(account_id,partner_sub_id,agent_name,agent_sub_name,phone,fax,alternate_no, email_id, description, building_no, street, land_mark, city, country, state, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, accept,pan_loc,addhaar_loc,gst_tin_loc,mh_agreement_loc,mb_certificate_loc,property_tax_loc,fire_safety_loc,cancelled_cheque_doc,state_id,city_id, ip_address)VALUES
      (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.account_id ?? "",
      partnerSubId ?? "",
      // data.propertyType.property_id ?? "",
      // data.propertyType.property_name ?? "",
      data.name ?? "",
      data.partner_sub_name == "" ? data.name : data.partner_sub_name,
      // data.company_name ?? "",
      // data.individual_name ??"",
      data.phone ?? "",
      data.fax == "" ? data.phone : data.fax,
      data.alternate_no ?? "",
      data.email_id ?? "",
      data.description ?? "",
      data.building_no ?? "",
      data.street ?? "",
      data.land_mark ?? "",
      data.city1 == "" ? data.city.city : data.city1,
      data.country.name ?? "",
      data.state1 == "" ? data.state.state_name : data.state1,
      data.pin_code ?? "",
      data.pan ?? "",
      data.aadhar ?? "",
      data.gstin == "" ? data.gst_registration : data.gstin,
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

async function exsistingUserCreate(fields, files, docs, ipAddress) {
  let data = JSON.parse(fields.propertyPartnerDetails);
  // let fileObj = JSON.parse(JSON.stringify(files));
  let partnerSubId = await helper.generatePartnerSUBID();
  const result = await db.query(
    `INSERT IGNORE INTO mh_property_master(account_id,partner_id,partner_sub_id,property_name,property_type,agent_name,agent_sub_name,individual_name, phone, fax, email_id, description, building_no, street, land_mark, city, country, state, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, accept,pan_loc,addhaar_loc,gst_tin_loc,mh_agreement_loc,mb_certificate_loc,property_tax_loc,fire_safety_loc,cancelled_cheque_doc,state_id,city_id,ip_address)VALUES
      (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.account_id ?? "",
      data.partner_id ?? "",
      partnerSubId ?? "",
      data.propertyType.property_id ?? "",
      data.propertyType.property_name ?? "",
      data.partner_name ?? "",
      data.name ?? "",
      // data.company_name ?? "",
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
async function updatePropertyData(txnID, data, docNames) {
  const result = await db.query(
    `UPDATE mh_property_details_table SET partner_id=?,partner_sub_id=?, partner_name=?, sub_partner_name=?,partner_phone=?, property_name=?, sub_property_name=?,property_phone=?, property_email=?,property_alternate_email=?, property_description=?,property_latitude=?, property_longitude=?, building_no=?,street=?, land_mark=?, country=?, state_id=?, state_name=?,city_id=?, city_name=?, pin_code=?, checkIn_time=?, checkOut_time=?,Name_Of_Contact_Person=?,upload_image=?, upload_image1=?, upload_image2=?, upload_image3=?, upload_image4=?,bankAccountNo=?,bankName=?,branchName=?,ifsc=?,mh_service_fee=? WHERE txn_id='${txnID}'`,
    [
      data.partner_id ?? "",
      data.partner_sub_id ?? "",
      data.partner_name ?? "",
      data.sub_partner_name ?? "",
      data.partner_phone ?? "",
      data.property_name.property_name ?? data.property_name ?? "",
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
      data.checkIn_time ?? "",
      data.checkOut_time ?? "",
      data.Name_Of_Contact_Person ?? "",
      docNames.upload_image1_name ?? "",
      docNames.upload_image2_name ?? "",
      docNames.upload_image3_name ?? "",
      docNames.upload_image4_name ?? "",
      docNames.upload_image5_name ?? "",

      data.bankAccountNo ?? "",
      data.bankName ?? "",
      data.branchName ?? "",
      data.ifsc ?? "",
      data.mh_service_fee ?? "",
    ]
  );
  let message = "Error in updating Property Data";

  if (result.affectedRows) {
    message = "Property Data  updated successfully";
  }

  return { message };
}
async function approveAccPartnersData(partner_id, partner_sub_id, update) {
  const result = await db.query(
    `UPDATE mh_property_master SET status=?, remarks=? WHERE partner_id='${partner_id}' AND partner_sub_id='${partner_sub_id}'`,
    ["approved", update.remarks]
  );
  // var result2 = await db.query(
  //   `UPDATE mh_property_details_table SET property_status=? WHERE  partner_id='${partner_id}' AND partner_sub_id='${partner_sub_id}'`,
  //   ["approved"]
  // );
  let message = "Error in Approving partner Data";

  if (result.affectedRows) {
    message = "Partner Data Updated Successfully";
  }

  return { message };
}

async function approveAccPropertyData(
  partner_id,
  partner_sub_id,
  txn_id,
  update
) {
  // console.log(update);
  const result = await db.query(
    `UPDATE mh_property_details_table SET property_status=?, remarks=?,mh_service_fee=? WHERE partner_id='${partner_id}' AND partner_sub_id='${partner_sub_id}' AND txn_id='${txn_id}'`,
    ["approved", update.remarks, update.mh_service_fee]
  );

  let message = "Error in Approving partner Data";

  if (result.affectedRows) {
    message = "partner data updated successfully";
  }
  const mailOptions = {
    from: "noreply@mangohomz.com",
    to: "sachin.kumar@mangohomz.com",
    subject: ` ${update.sub_property_name} Listed With Mongohomz  `,

    html: `
        <div style="border:1px solid grey;>
          <div style="box-shadow:2px 2px 10px 2px grey;">
            <div >
            <div style="display:flex;justify-content:center">
           <span
            style="font-family:Calibri"> <a href="https://mangohomz.com" target="_blank"><img src="https://mangohomz.com/img/logo-main.6f335097.png" width="200px" height="50px" alt="mangohomz logo"></a></span>
               
              
                </div>
                <table cellspacing="0" cellpadding="0"
                style="border:0.75pt solid #000000; -aw-border:0.5pt single; -aw-border-insideh:0.5pt single #000000; -aw-border-insidev:0.5pt single #000000; border-collapse:collapse">
                <tr style="height:15.75pt; -aw-height-rule:exactly">
                    <td
                        style="width:156.35pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; -aw-border-bottom:0.5pt single; -aw-border-right:0.5pt single">
                        <p style="font-size:10pt"><span style="font-family:Calibri">City Name</span></p>
                    </td>
                    <td
                        style="width:150.45pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; -aw-border-bottom:0.5pt single; -aw-border-left:0.5pt single">
                        <p style="font-size:10pt"><span style="font-family:Calibri">${update.city_name}</span></p>
                    </td>
                </tr>


                <tr style="height:15.75pt; -aw-height-rule:exactly">
                <td
                    style="width:156.35pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; -aw-border-bottom:0.5pt single; -aw-border-right:0.5pt single">
                    <p style="font-size:10pt"><span style="font-family:Calibri">Property Name</span></p>
                </td>
                <td
                    style="width:150.45pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; -aw-border-bottom:0.5pt single; -aw-border-left:0.5pt single">
                    <p style="font-size:10pt"><span style="font-family:Calibri">${update.sub_property_name}</span></p>
                </td>
            </tr>


            <tr style="height:15.75pt; -aw-height-rule:exactly">
            <td
                style="width:156.35pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; -aw-border-bottom:0.5pt single; -aw-border-right:0.5pt single">
                <p style="font-size:10pt"><span style="font-family:Calibri">Property Address</span></p>
            </td>
            <td
                style="width:150.45pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; -aw-border-bottom:0.5pt single; -aw-border-left:0.5pt single">
                <p style="font-size:10pt"><span style="font-family:Calibri">${update.address}</span></p>
            </td>
        </tr>



        <tr style="height:15.75pt; -aw-height-rule:exactly">
        <td
            style="width:156.35pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; -aw-border-bottom:0.5pt single; -aw-border-right:0.5pt single">
            <p style="font-size:10pt"><span style="font-family:Calibri">Mangohomz Property ID</span></p>
        </td>
        <td
            style="width:150.45pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; -aw-border-bottom:0.5pt single; -aw-border-left:0.5pt single">
            <p style="font-size:10pt"><span style="font-family:Calibri">${update.account_id}</span></p>
        </td>
    </tr>

    <tr style="height:15.75pt; -aw-height-rule:exactly">
    <td
        style="width:156.35pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; -aw-border-bottom:0.5pt single; -aw-border-right:0.5pt single">
        <p style="font-size:10pt"><span style="font-family:Calibri">Property Mail ID</span></p>
    </td>
    <td
        style="width:150.45pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; -aw-border-bottom:0.5pt single; -aw-border-left:0.5pt single">
        <p style="font-size:10pt"><span style="font-family:Calibri">${update.property_email}</span></p>
    </td>
</tr>


<tr style="height:15.75pt; -aw-height-rule:exactly">
<td
    style="width:156.35pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; -aw-border-bottom:0.5pt single; -aw-border-right:0.5pt single">
    <p style="font-size:10pt"><span style="font-family:Calibri">Prperty Mobile/Whatsapp Number</span></p>
</td>
<td
    style="width:150.45pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; -aw-border-bottom:0.5pt single; -aw-border-left:0.5pt single">
    <p style="font-size:10pt"><span style="font-family:Calibri">${update.property_phone}</span></p>
</td>
</tr>


<tr style="height:15.75pt; -aw-height-rule:exactly">
<td
    style="width:156.35pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; -aw-border-bottom:0.5pt single; -aw-border-right:0.5pt single">
    <p style="font-size:10pt"><span style="font-family:Calibri">Owner Whatsapp/ Mobile Number</span></p>
</td>
<td
    style="width:150.45pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; -aw-border-bottom:0.5pt single; -aw-border-left:0.5pt single">
    <p style="font-size:10pt"><span style="font-family:Calibri">${update.partner_phone}</span></p>
</td>
</tr>
               
            </table>
            <div class="row">
            <div class="col-3">
                <h6 style="margin:5px 0px -76px 4px;margin-top:50px">Welcome Message</h6>
               
               
              </div>
              <div class="col-9">
            <p style="margin-top:19.75pt; margin-left:184.2pt; text-align:justify; line-height:13.4pt;border:1px solid grey;padding:5px "><span
            style="font-family:Calibri; font-size:11pt">We extend our heartfelt gratitude for your valued partnership with Mangohomz. Our unwavering dedication to aiding medical travellers is further strengthened by your collaboration. Together, we are wholeheartedly committed to making the lives of medical travellers easier and expediting their recovery process.
            For your convenience, we have provided all the necessary registration and documentation details right here. We want to express our sincere appreciation for your acceptance to be listed and featured on the Mangohomz platform. Your contribution is instrumental in our collective mission to support medical travellers.</span></p>
            </div>
            </div>
            </div>






            <div class="row">
            <div class="col-3">
                <h6 style="margin:5px 0px -76px 4px;margin-top:50px">As a partner what you will get</h6>
               
               
              </div>
              <div class="col-9">
            <p style="margin-top:19.75pt; margin-left:184.2pt; text-align:justify; line-height:13.4pt;border:1px solid grey;padding:5px "><span
            style="font-family:Calibri; font-size:11pt">1. Part of a PAN India Network
            <br>
            2. Your Property will be digitally promoted all over India and abroad also
            <br>
            3. Tech Based on the platform and Patient-friendly technology
            <br>
            4. Digital technology to reach out to the user irrespective of the location
            <br>
            5. Easy-to-use dashboard for partners (Here you can set Room Availability - price - and accounts ) etc
            </span></p>
            </div>
            </div>





            <div class="flex justify-center">
              <div class="">
          Bank Details Of Partner
              </div>
              <div class="">
             Account Name ${update.bankAccountNo}
              </div>
              <div class="">
            IFSC Code  ${update.ifsc}
                </div>
              <div class="">
           Bank Name ${update.bankName}
            </div>
          
            </div>

            <div class="row">
            <div class="col-3">
                <h6 style="margin:5px 0px -76px 4px;margin-top:50px">Payments Points</h6>
               
               
              </div>
              <div class="col-9">


            


            <p style="margin-top:19.75pt; margin-left:184.2pt; text-align:justify; line-height:13.4pt;border:1px solid grey;padding:5px "><span
            style="font-family:Calibri; font-size:11pt">A. If the Booking will be more than 2 days the booking confirmation money that is check in-Day amount(1 day) will go to the partner 24 hrs before the Check-in date, rest pay out on the check-out date) These payouts happen excluding MangoHomz share and relevant Taxes / 
            <br>
            B. If the Booking will be less than two days then the complete payment would be paid on the check-out day
            </span></p>
            </div>
            </div>



            <div class="row">
            <div class="col-3">
                <h6 style="margin:5px 0px -76px 4px;margin-top:50px">Cancellation:</h6>
               
               
              </div>
              <div class="col-9">
            <p style="margin-top:19.75pt; margin-left:184.2pt; text-align:justify; line-height:13.4pt;border:1px solid grey;padding:5px "><span
            style="font-family:Calibri; font-size:11pt">A.In Case of Cancellation within 24 hrs from Check-in time If the booking is more than 2 days the Accommodation partner will retain the Advance amount along with proportionate GST  
            <br >
            If the Booking is less than 2 days then the Accommodation partner will get 50% of the Check-in Day amount along with proportionate GST
            B.Users can cancel 3 days prior to check-in he gets 100% back. In this case, neither you nor us get any money).
          
           
            <br><span style="border:1px solid grey;">
            We will put branding on the property premise ( Door Handle and reception area etc)</span>
            </span></p>
            </div>
            </div>




            <div class="row">
            <div class="col-3">
                <h6 style="margin:5px 0px -76px 4px;margin-top:50px">Revenue Sharing (%)</h6>
               
               
              </div>
              <div class="">
               ${update.partner_name}  ${(parseInt(100-update.mh_service_fee))}
              </div>
              <div class="">
            Mangohomz  ${update.mh_service_fee}
                </div>
            </div>
            </div>
            </div>






            
            <p style="font-size:22px;text-align:center;">MOU</p>        
            <textarea style="              width: 100%;
            height: 300px;
            font-family: Arial, sans-serif;
            padding: 10px;
            resize: none;" id="terms" readonly >
            ACCOMMODATION PARTNER AGREEMENT
            This Agreement is made on the ${moment(new Date()).format(
              "DD-MM-YYYY"
            )} BETWEEN MANGOHOMZ Technologies Private Limited  ( hereon referred as COMPANY or MANGOHOMZ or First Party) with CIN Number :U74994KA2020PTC131569 , a Company incorporated under the Companies Act, 2013. And registered at: Cauvery Serenity, No 601A, No 2-172/10/1/1-18, Raghavendra Extension, Tumkur Road, Yeshwanthpur, Bangalore, INDIA – 560022. The First party is represented by Mr. Bairy Prashanth, whose expression shall unless repugnant to the context or meaning thereof include its successors and permitted assigns and shall mean and include their respective legal heirs, successors, executors, attorneys, administrators and assigns. 
                                                        AND
            ACCOMODATION PARTNER ${update.sub_property_name}, with Address: ${update.address}. Hereinafter referred as Second Party which expression shall unless repugnant to the context or meaning thereof include its successors and permitted assigns hereinafter shall mean and include their respective legal heirs, successors, executors, attorneys, administrators and assigns. 
            Whereas, The First party MANGOHOMZ coordinates medical trips around the world and is bridging the gap between patient and the hospital, it provides patient friendly accommodation near medical hubs to medical travelers.
                                                        AND
            Whereas the Second Party is owner/lessor of premises and agrees to join MANGOHOMZ platform will provide Trade License/Hotel Registration/NOC/ Fire Department. clearance/GST other statutory papers to the First Party in providing accommodation/assistance of stay to the medical travelers. 
            Whereas the parties wish to record in this Agreement the terms and conditions of the usage of the accommodation/premises of the Second Party by First Party.
            Now therefore, in light of the mutual promises contained herein and other good and valuable consideration, the receipt and sufficiency of which is hereby acknowledged, the Parties agree as follows:
            Definitions
            ACCOMODATION PARTNER (NAME), means (details of owner and premises).
            “Approvals” means the internal corporate approvals required to be obtained by the Second Party and First Party respectively, for arranging stay of the medical travelers.
            “Consideration” means payment made in lieu of the services.
            “Completion" means completion of the Documentation of making (no. of rooms) available to first party by second
            "Proceedings" means any proceeding, suit or action arising out of or in connection with this agreement.
            2. Interpretation 
            2.1. Unless otherwise or unless the context otherwise requires, in this Agreement .
            2.2. Headings are for convenience only and shall not affect interpretation of the Agreement.
            2.3. Where a word or phrase is defined,other part of speech or grammatical forms of  the word or phrase shall have corresponding   meanings 
            2.4. Reference to recitals, Clauses and Exhibits shall be referenced to be Recitals, Clause and Exhibits of this Agreement. 
            2.5 No change, alterations or modifications here to shall be effective unless in writing and signed by authorized representative of the parties here to and if required, upon approval by the competent authorities of each party.  
            3. Representations of the First Party:
            3.1 The Second party hereby warrant and represent to the First Party as follows: The representations and Warranties in this Article 3 shall remain in full force and effect notwithstanding the actual handing over the premises for usage as and when booked by the First party.
            3.2 The Second party has full right, power and authority to enter into execute and deliver this Agreement and to perform the obligations, undertaking and transactions set forth herein, and this agreement has been duly and validly executed and delivered by the Second party and constitutes its legal, valid and binding obligation, enforceable against it in accordance with its terms.
            3.3. The First party has full legal right and authority to enter into, execute and deliver this Agreement and to perform the obligations, undertaking and transactions set forth herein, and this agreement has been duly and validly executed and delivered by the First party and constitutes its legal, valid and binding obligation, enforceable against it in accordance with its terms. 
            3.4 Legal Validity
            This Agreement constitutes valid and legally binding obligations of the First party enforceable in accordance with its respective terms. The Second party has all requisite power to permit usage of premises as permissible under the Indian Laws.
            3.5 Non-Conflict
            The execution, delivery and performance of this Agreement will not (a) Contravene any existing applicable law to which Second party is subject, (b) Conflict with, or result in any breach of any of the terms of, or constitute a default under, any agreement or other instrument to which Second party is party or is subject or by which it or any of the Assets is bound,(c) Contravene or conflict with any provision of constitutional documents or (d) Contravene, violate, or conflict with any licenses, approvals, or consents obtained  
            3.6. Business 
            3.6.1 The First Party will deploy trained MANGOHOMZ attendant to take care of the Medical Traveler and their companions 24/7 who book a stay with Second Party, such attendant will be at the premises of the Second party 3-4 hours before the arrival of the user and shall be permitted to provide service to the MANGOHOMZ guest
            3.6.2 The First Party will provide Basic Home Medical Kit to the Second Party, who shall keep it handy at all times during the stay of the medical traveler/MANGOHOMZ guest.
            3.6.3 The First Party as is when required shall be permitted to install patient friendly material/equipment and other such facilities for the medical traveler.
            3.6.4 The First Party will give access to the second party of Terminal of MANGOHOMZ web and App for the Accommodation Partner to know the details of the business done.
            3.6.5 The second party will allow access to the first party to review the rooms.
            3.6.6 In case a medical traveler wants to check in before time or late check out then the First party shall pay to the second party as per mutually agreed rate. 
            3.6.7 Second party will allow the first party to do branding on the property for increasing visibility & also will do different kinds of promotion for making the property a preferred choice for medical travelers.
            3.6.8. The Second party shall ensure the availability of information with respect to the rooms on a real-time basis and ensure that at no point of time the room is available for booking with some other online travel agents but not with the First party (MangoHomz). The Second party shall be solely responsible for rates made available on the MangoHomz platform owned & managed by the First Party. The First Party shall have no responsibility with respect to the rates provided by the Second party.
            3.6.9. The Second party shall maintain rate parity, and room availability parity between the First Party (MangoHomz) and other travel agents, other sales channels of third parties and the Second party itself.
            3.6.10. Bookings of the rooms against the customer reservations communicated by the First Party will be purely at the choice of the customers
            4. Consideration
            4.1 On each booking confirmation First party will keep ${update.mh_service_fee} plus applicable taxes of the total booking amount towards the platform usage fee and remit ${(parseInt(100-update.mh_service_fee))} to the second party after deducting applicable taxes.
            4.2 A user of MangoHomz app makes a booking with the MangoHomz of medical travel a notification will be received by the second Party. The second party shall accordingly make arrangements for the booking.
            4.3 Second Party will receive check-in day booking amount from First Party towards room  charges, on or before 24 hours of the check-in day of the medical traveler if the booking would be more then 2 days. If the Booking would be less then 2 days, then the complete amount would be paid at the check-out day.
            4.4 First party Will only provide money receipt to the users for collecting money. Bills have to be raised on users by the Second Party for the services provided by them.
            4.5 The First Party will recover applicable taxes and duties as per Income Tax Act and GST act and any other applicable laws before remitting the money to the Second party, in all the cases of booking,cancellations and rescheduling.
            4.6 First Party will withhold it’s commission as mentioned on point 4.1 plus GST out of total collection before remitting the amount payable to Second Party. The First Party will raise a bill for commission plus GST on the Second Party.
            4.7 Second Party shall deduct applicable TDS and provide certificates for the same to get TDS reimbursed from the First party.
            4.8 That the second party will receive the balance payment in its registered bank account on the same day of successful check out of the medical traveler. 
            5. Cancellations
            5.1 In case of cancellation, prior to 3 days of check in there will be no payment to the second party by First Party
            5.2. The second Party is not permitted to cancel any of the bookings without 72 hours prior notice to the First Party and seeking approval to do so in writing.
            5.3. In case of cancellation by the user within 24 hours of check in, if the Booking is more than 2 days then the Second party will retain the check-in day Rate along with proportionate GST , If the Booking is less then 2 days then the second party will get 50% of  the check in day amount along with proportionate GST  booking amount mentioned in point number 4.3 of this agreement.
            5.4 incase of any cancellation after check-in the first party will pay the second party the consumed days by the user  plus one additional day room rent. 
            5.5. During the period between the signing of this Agreement and the Completion of other formalities, nothing will be done in the conduct of the management of the affairs of ACCOMODATION PARTNER (IK LONDON) which would be likely to prejudice the interests of MANGOHOMZ.
            6. Indemnity
            The Accommodation partner agrees to assume liability for, and do hereby indemnify, protect, save and keep harmless Mangohomz and its successors, assigns, agents, directors, servants and shareholders, in particular, from and against any and all claims, damages, losses, liabilities, obligations, demands, suits, penalties, judgments or causes of action and all legal proceedings, whether civil or criminal, penalties, fines and other sanctions, and any costs and expenses in connection therewith including, without limitation, legal fees and expenses of whatever kind and nature (whether or not also indemnified against by any other person under any other document), which may result from or grow or arise in any manner out of the ownership, title, acceptance, non-acceptance, rejection, of the taking the premises by Mangohomz.
            6. Dispute Resolution
            6.1. Governing Law —This Agreement shall be governed by and construed and enforced in accordance with the laws applicable in INDIA.
            6.2 Any dispute, controversy or claim arising out of or in relation to this agreement or the breach, termination or invalidity thereof, if the same cannot be settled amicably between the parties to this agreement, the same shall be referred to Arbitration and Arbitration shall be conducted as per the provisions of the Arbitration and Conciliation Law of India and the decision of the Arbitrator shall be final and binding arbitration.
            Whenever a Party shall decide to institute arbitration proceedings, it shall give written notice to that effect to the other Party. The Parties shall attempt to resolve the dispute between them. If the Parties are still unable to resolve the dispute, the Party giving the notice may institute the Arbitration Proceeding in terms of the Arbitration & Conciliation Act - 1996 and the venue of the Arbitration shall be at Delhi/Bengaluru, India and that the Courts at Hyderabad/ Bengaluru, India shall have exclusive jurisdiction in all matters arising there under.
            Pending to resolution of a dispute by arbitration, the parties shall, except in event of the termination continue to perform all their obligation under this agreement, without prejudice to final adjustment in accordance with the arbitration award   
            6.3 Finality of Award. —Any award shall be by majority vote and shall be final and binding on the Parties. Nothing contained in this section shall prevent either Party from seeking temporary restraining orders, injunctions or other temporary relief in any court of competent jurisdiction at Bangalore only.
            7. Confidentiality
            Each party hereby warrants and undertakes that all information acquired by any Party from the other party shall be related as confidential by the recipient and shall not be used other than for the purpose of contemplation by the Agreement without the consent from the Party providing the information, until such information becomes generally available to the public.
            8. Termination
            8.1. This Agreement may be terminated by the parties in case they find breaches of any of the provisions hereof or if any of the representations and warranties made hereunder or are found to be false. 
            8.2 Notice. —The Party terminating this Agreement shall give a written termination notice of 90 (Ninety) days to the other Party. In the event that after the receipt of the notice the Party in default fails to remedy the breach to the satisfaction of the terminating Party, this Agreement shall terminate upon the expiry of the said period.
            9. Miscellaneous
            9.1 Force Majeure. —Neither Party shall be considered in default or be liable to the other Party for any delay in performance or non-performance caused by circumstances beyond the reasonable control of such Party, including but not limited to acts of God, Government. Acts (except as otherwise enumerated herein) explosion, fire, flood, war, whether declared or not, pandemic, accident, labour strike or sabotage.
            9.2 Except where the nature of the event shall prevent it from doing so, the parties suffering such force majeure event shall notify the other parties in writing within ten (10) days after the occurrence of such force majeure event and shall in every instance, to the extent it is capable of doing so, uses its best efforts to remove or remedy such cause with all reasonable dispatch. 
            9.3 Modifications and Amendments. Modifications and amendments to this Agreement shall be effective only if made in writing. This also applies to a waiver of the written form. Evidence of the contents of this Agreement may only be produced in a form of written documents duly executed by authorized representatives of the Parties hereto. In Witness Whereof, the Parties have caused this Agreement to be executed on the day and year first above written.
                     
            Signed by and on behalf of First Party (MangoHomz Technologies Pvt. Ltd.)
            Authorized Person: Mr.Bairy Prashanth
            Designation: DIRECTOR
            Mobile: 986688337
            Address: Cauvery Serenity, No 601A, No 2-172/10/1/1-18, Raghavendra Extension, Tumkur Road, Yeshwanthpur, Bangalore, INDIA – 560022
                        
            Signed by Second Party: ${update.sub_property_name}
            Authorized Person: ${update.Name_Of_Contact_Person}  
            Designation: Owner/Manager
            Mobile: ${update.partner_phone}
            Address:${update.address}
            </textarea>

            <a href="http://localhost:3000/propertyRegistrationMaster/partnerAccepted/${update.txn_id}/${update.account_id}/${update.partner_id}">Acknowledge</a>


            </div>



           







          
            <div style="display:flex;">
              <div style="height: 5px;width: 70%;background-color:green;"></div>
              <div style="height: 5px;width: 30%;background-color:darkblue;"></div>
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
                  <h5 style="margin:0px">Please contact with us : </h5> <a href="mailto:care@mangohomz.com" style="color:darkblue;font-weight:700;">care@mangohomz.com</a> & <a href="https://www.mangohomz.com " target="_blank" style="color:darkblue;font-weight:700;">www.mangohomz.com </a>
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
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Err", error);
      console.log(error);
    } else {
      console.log("Succ", info);
      console.log("Email sent: " + info.response);
    }
  });

  return { message };
}

async function approveAccRoomData(partner_id, partner_sub_id, txn_id, update) {
  const result = await db.query(
    `UPDATE mh_property_rooms_table SET room_status=?, remarks=? WHERE partner_id='${partner_id}' AND partner_sub_id='${partner_sub_id}' AND property_txn_id='${txn_id}'`,
    ["approved", update.remarks]
  );

  let message = "Error in Approving partner Data";

  if (result.affectedRows) {
    message = "Room data updated successfully";
  }

  return { message };
}

async function rejectAccRoomData(partner_id, partner_sub_id, txn_id, update) {
  const result = await db.query(
    `UPDATE mh_property_rooms_table SET room_status=?, remarks=? WHERE partner_id='${partner_id}' AND partner_sub_id='${partner_sub_id}' AND property_txn_id='${txn_id}'`,
    ["rejected", update.remarks]
  );
  let message = "Error in rejecting Room Data";

  if (result.affectedRows) {
    message = "Room data Rejected successfully";
  }

  return { message };
}
async function updateRoomsData(
  txnID,
  partner_id,
  partner_sub_id,
  data,
  docNames
) {
  let amenity_arr = [];
  let amenity_iconArr = [];
  let room_numbers = [];
  for (let i = 0; i < data.facilities.length; i++) {
    amenity_arr.push(data.facilities[i].amenity_name ?? data.facilities[i]);
    amenity_iconArr.push(data.facilities[i].icon_image);
  }
  let amenities = amenity_arr.toString();
  let amenityIcon = amenity_iconArr.toString();
  //console.log("sssssss",data);
  // let roomNumber = data.room_numbers.toString();
  let fromDate = moment(data.from_date).format("DD-MM-YYYY");
  let toDate = moment(data.to_date).format("DD-MM-YYYY");
  const result = await db.query(
    `UPDATE mh_property_rooms_table SET  txn_id=?, partner_id=?,partner_sub_id=?, property_name=?, sub_property_name=?, facilities=?, icon_image=?, no_of_avail_rooms=?, room_type=?, price=?,other_amenities=?, units=?, date_from=?, date_to=?,room_category=? ,select_offer=?, partner_specialOffer=?, property_specialOffer=?, enter_amount=?,room_image_1=?,room_image_2=?,room_image_3=?,room_image_4=?,room_image_5=? WHERE txn_id='${txnID}' AND partner_id='${partner_id}' AND partner_sub_id='${partner_sub_id}'`,
    [
      data.txn_id ?? "",
      data.partner_id ?? "",
      data.partner_sub_id ?? "",
      data.property_name ?? "",
      data.sub_property_name ?? "",
      amenities ?? "",
      amenityIcon ?? "",
      // roomNumber ?? "",
      data.no_of_avail_rooms ?? "",
      data.room_type ?? "",
      data.price ?? "",
      data.other_amenities ?? "",
      data.units ?? "",
      data.date_from ?? data.data_from_up ?? "",
      data.date_to ?? data.data_to_up ?? "",
      data.room_category ?? "",
      data.select_offer ?? "",
      data.partner_specialOffer ?? "",
      data.property_specialOffer ?? "",
      data.enter_amount ?? "",
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
async function updateRoomStatus(
  accountID,
  partnerID,
  partnerSubId,
  propertyID,
  roomID,
  data
) {
  const result = await db.query(
    `UPDATE mh_property_rooms_table SET status=? WHERE account_id='${accountID}' AND partner_id='${partnerID}' AND partner_sub_id='${partnerSubId}' AND property_txn_id='${propertyID}' AND txn_id='${roomID}'`,
    [data.status == "yes" ? "no" : "yes"]
  );

  let message = "Error in Updating Room Status";

  if (result.affectedRows) {
    message = "Room Status Updated successfully";
  }
  return { message };
}
async function rejectAccPartnersData(partner_id, partner_sub_id, update) {
  const result = await db.query(
    `UPDATE mh_property_master SET status=?, remarks=? WHERE partner_id='${partner_id}' AND partner_sub_id='${partner_sub_id}'`,
    ["rejected", update.remarks]
  );
  let message = "Error in rejecting partner Data";

  if (result.affectedRows) {
    message = "partner data Rejected successfully";
  }

  return { message };
}
async function createPropertyDetails(fields, files, docs, ipAddress) {
  let data = JSON.parse(fields.property_details);
  // console.log("data",data);
  let amenity_nameArr = [];
  let amenity_iconArr = [];
  for (let i = 0; i < data.amenities.length; i++) {
    amenity_nameArr.push(data.amenities[i].amenity_name);
    amenity_iconArr.push(data.amenities[i].icon_image);
  }
  let amenityName = amenity_nameArr.toString();
  let amenityIcon = amenity_iconArr.toString();
  const result = await db.query(
    `INSERT IGNORE INTO mh_property_details_table( account_id, partner_id, partner_sub_id, partner_name,sub_partner_name, partner_phone,property_id, property_name, sub_property_name, property_phone,property_email,property_alternate_email,property_description, property_latitude,property_longitude,building_no,street,land_mark,country,state_id,state_name,city_id,city_name,pin_code, amenity_name, amenity_icon, checkIn_time, checkOut_time,Name_Of_Contact_Person,property_status, upload_image,upload_image1,upload_image2,upload_image3,upload_image4,ip_address,bankAccountNo, bankName, branchName, ifsc,cancelled_cheque_doc,mh_agreement,mh_declaration,mh_bankmandate,mh_gstin,mh_service_fee,property_gstin)VALUES
    (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
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
      data.property_alternate_email ?? "",
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
      data.property_status ?? "",
      docs.upload_image1_name ?? "",
      docs.upload_image2_name ?? "",
      docs.upload_image3_name ?? "",
      docs.upload_image4_name ?? "",
      docs.upload_image5_name ?? "",
      ipAddress,
      data.bankAccountNo ?? "",
      data.bankName ?? "",
      data.branchName ?? "",
      data.ifsc ?? "",
      docs.cancelledChequeName ?? "",
      docs.cancelledChequeName ?? "",
      docs.declarationName ?? "",
      docs.mhagreementName ?? "",
      docs.gst_tinName ?? "",
      data.mh_service_fee ?? "",
      data.gstin === "" ? data.gst_registration : data.gstin
    ]
  );
  const result2 = await db.query(
    `INSERT IGNORE INTO mh_search_city_master(city_id, city_name)VALUES(?,?)`,
    [data.city.city_id, data.city.city]
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
  //console.log("data89456", data);
  // console.log("docs",docs,files);

  let amenity_arr = [];
  let amenity_iconArr = [];
  for (let i = 0; i < data.facilities.length; i++) {
    amenity_arr.push(data.facilities[i].amenity_name);
    amenity_iconArr.push(data.facilities[i].icon_image);
  }
  let amenities = amenity_arr.toString();
  // console.log("1", amenities);
  let amenityIcon = amenity_iconArr.toString();
  //console.log("2", amenityIcon);
  // let roomNumber = data.room_numbers.toString();
  // console.log("3",roomNumber )
  const result = await db.query(
    `INSERT IGNORE INTO mh_property_rooms_table(txn_id,account_id,property_txn_id, partner_id, partner_name,partner_sub_id, sub_partner_name, property_name, sub_property_name, facilities, icon_image,other_amenities, no_of_avail_rooms, room_type, price,room_category, date_from,date_to,select_offer,	max_allow_adult,max_allow_kids,withac_withbreakfast_price,withac_withoutbreakfast_price,	withoutac_withbreakfast_price,withoutac_withoutbreakfast_price	,enter_amount,room_image_1,room_image_2,room_image_3,room_image_4,room_image_5,ip_address)VALUES
   (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.txn_id ?? "",
      data.account_id ?? "",
      data.property_txn_id ?? "",
      data.partner_id ?? "",
      data.partner_name ?? "",
      data.partner_sub_id ?? "",
      data.sub_partner_name ?? "",
      data.property_name ?? "",
      data.sub_property_name ?? "",
      amenities ?? "",
      amenityIcon ?? "",

      data.other_amenities ?? "",
      data.no_of_avail_rooms ?? "",
      data.room_type ?? "",
      // roomNumber ?? "",
      data.price ?? "",
      // data.units ?? "",
      data.room_category ?? "",
      data.date_from ?? "",
      data.date_to ?? "",
      data.select_offer ?? "",
      data.max_adult ?? "",
      data.max_kids ?? "",
      // data.gst_per.gst_value ?? "",
      data.withac_withbreakfast_price ?? "",
      data.withac_withoutbreakfast_price ?? "",
      data.withoutac_withbreakfast_price ?? "",
      data.withoutac_withoutbreakfast_price ?? "",
      // data.property_specialOffer ?? "",
      data.enter_amount ?? "",
      docs.upload_room_image1_name ?? "",
      docs.upload_room_image2_name ?? "",
      docs.upload_room_image3_name ?? "",
      docs.upload_room_image4_name ?? "",
      docs.upload_room_image5_name ?? "",
      // data.status ?? "",
      ipAddress,
    ]
  );
  var result1 = await db.query(
    `INSERT IGNORE INTO mh_room_operation(account_id,property_txn_id, partner_id, partner_name,partner_sub_id, sub_partner_name, property_name, sub_property_name,room_category, facilities, icon_image,other_amenities, room_type,max_allow_adult,max_allow_kids, gst_per,	withac_withbreakfast_price,withac_withoutbreakfast_price,	withoutac_withbreakfast_price,withoutac_withoutbreakfast_price,date_from,date_to,offer_nonac,offer_nonac_breakfast,offer_ac,offer_ac_breakfast,offer_date_from,offer_date_to,tendays_offer,twentydays_offer,thirtydays_offer,offerApplicableFromDate,offerApplicableToDate,maximum_capacity_adults,maximum_capacity_kids,rate_incress,ip_address) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.account_id ?? "",
      data.property_txn_id ?? "",
      data.partner_id ?? "",
      data.partner_name ?? "",

      data.partner_sub_id ?? "",
      data.sub_partner_name ?? "",
      data.property_name ?? "",
      data.sub_property_name ?? "",
      data.room_category ?? "",

      amenities ?? "",
      amenityIcon ?? "",
      data.other_amenities ?? "",
      data.room_type ?? "",
      data.max_allow_adult ?? "",
      data.max_allow_kids ?? "",
      data.gst_per ?? "",
      data.withac_withbreakfast_price ?? "",
      data.withac_withoutbreakfast_price ?? "",
      data.withoutac_withbreakfast_price ?? "",

      data.withoutac_withoutbreakfast_price ?? "",
      data.date_from ?? "",
      data.date_to ?? "",
      data.offer_nonac ?? "",
      data.offer_nonac_breakfast ?? "",
      data.offer_nonac ?? "",
      data.offer_ac_breakfast ?? "",
      data.offer_date_from ?? "",
      data.offer_date_to ?? "",
      data.tendays_offer ?? "",
      data.twentydays_offer ?? "",
      data.thirtydays_offer ?? "",

      // data.twentydays_price ?? "",
      // data.thirtydays_price ?? "",
      data.offerApplicableFromDate ?? "",
      data.offerApplicableToDate ?? "",
      data.maximum_capacity_adults ?? "",
      data.maximum_capacity_kids ?? "",
      data.rate_incress ?? "",
      ipAddress,
    ]
  );

  let message = "Error in Saving Room Details";

  if (result.affectedRows && result1.affectedRows) {
    // console.log("result1", result1);
    //console.log("result1", result1);
    message = "Room Details created successfully";
  }
  return { message };
}

// async function createRoomDetails(fields, files, docs, ipAddress) {
//   let data = JSON.parse(fields.room_details);
//   // console.log("datasada",data);
//   // console.log("docs",docs,files);

//   let amenity_arr = [];
//   let amenity_iconArr = [];
//   for (let i = 0; i < data.facilities.length; i++) {
//     amenity_arr.push(data.facilities[i].amenity_name);
//     amenity_iconArr.push(data.facilities[i].icon_image);
//   }
//   let amenities = amenity_arr.toString();
//   console.log("1",amenities)
//   let amenityIcon = amenity_iconArr.toString();
//   console.log("2",amenityIcon)
//   let roomNumber = data.room_numbers.toString();
//   console.log("3",roomNumber )
//   const result = await db.query(
//     `INSERT IGNORE INTO mh_property_rooms_table(account_id,property_txn_id, partner_id, partner_name,partner_sub_id, sub_partner_name, property_name, sub_property_name, facilities, icon_image,other_amenities, no_of_avail_rooms, room_type,room_numbers, price,room_category, date_from,date_to,select_offer,	max_allow_adult,max_allow_kids,gst_per,withac_withbreakfast_price,withac_withoutbreakfast_price,	withoutac_withbreakfast_price,withoutac_withoutbreakfast_price	,property_specialOffer,enter_amount,room_image_1,room_image_2,room_image_3,room_image_4,room_image_5,ip_address)VALUES
//    (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
//     [

//       data.account_id ?? "",
//       data.property_txn_id ?? "",
//       data.partner_id ?? "",
//       data.partner_name ?? "",
//       data.partner_sub_id ?? "",
//       data.sub_partner_name ?? "",
//       data.property_name?? "",
//       data.sub_property_name ?? "",
//       amenities ?? "",
//       amenityIcon ?? "",

//       data.other_amenities ?? "",
//       data.no_of_avail_rooms ?? "",
//       data.room_type ?? "",
//       roomNumber ?? "",
//       data.price ?? "",
//      // data.units ?? "",
//       data.room_category ?? "",
//       data.date_from ?? "",
//       data.date_to ?? "",
//       data.select_offer ?? "",
//       data.max_adult ?? "",
//       data.max_kids ?? "",
//       data.gst_per.gst_value ?? "",
//       data.withac_withbreakfast_price ?? "",
//       data.withac_withoutbreakfast_price ?? "",
//      data.withoutac_withbreakfast_price ?? "",
//        data.withoutac_withoutbreakfast_price ?? "",
//       data.property_specialOffer ?? "",
//       data.enter_amount ?? "",
//       docs.upload_room_image1_name ?? "",
//       docs.upload_room_image2_name ?? "",
//       docs.upload_room_image3_name ?? "",
//       docs.upload_room_image4_name ?? "",
//       docs.upload_room_image5_name ?? "",
//      // data.status ?? "",
//       ipAddress
//     ]
//   );
//   let message = "Error in Saving Room Details";

//   if (result.affectedRows) {
//     message = "Room Details created successfully";
//   }
//   return { message };
// }

async function update(
  accountId,
  partnerId,
  partnerSubId,
  agentName,
  agentSubName,
  data
) {
  let city = "";
  if (data.city != "") {
    city = data.city.city;
  } else {
    city = data.city1;
  }
  let state = "";
  if (data.state != "") {
    state = data.state.state_name;
  } else {
    state = data.state1;
  }
  // console.log("data",data)
  const result = await db.query(
    `UPDATE mh_property_master SET  account_id=?, partner_id=?, partner_sub_id=?,agent_name=?,agent_sub_name=?, phone=?, fax=?,alternate_no=?, email_id=?, description=?, building_no=?, street=?, land_mark=?, city=?, country=?, state=?, state_id=?, city_id=?, pin_code=?, accept=? WHERE account_id='${accountId}' AND partner_id='${partnerId}' AND partner_sub_id='${partnerSubId}'`,
    [
      data.account_id ?? "",
      data.partner_id ?? "",
      data.partner_sub_id ?? "",
      // data.propertyType ?? "",
      // data.propertyType ?? "",
      agentSubName == agentSubName ? agentSubName : agentName,
      data.name ?? "",
      // data.company_name ?? "",
      // data.individual_name??"",
      data.phone ?? "",
      data.fax ?? "",
      data.alternate_no ?? "",
      data.email_id ?? "",
      data.description ?? "",
      data.building_no ?? "",
      data.street ?? "",
      data.land_mark ?? "",
      data.prevcity == data.city ? data.city : city,
      data.country.name ?? data.country,
      data.prevstate == data.state ? data.state : state,
      data.state.state_id ?? 0,
      data.city.city_id ?? 0,
      data.pin_code ?? "",
      data.accept ?? "",
    ]
  );
  if (agentName == agentSubName) {
    const result2 = await db.query(
      `UPDATE mh_property_master SET agent_name=? WHERE partner_id='${partnerId}'`,
      [agentSubName == agentSubName ? data.partner_sub_name : agentName]
    );
    let message = "Error in updating Property Registration Master";
    if (result2.affectedRows) {
      message = "Property Registration Master updated successfully";
    }
    return { message };
  }

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
    `INSERT IGNORE INTO mh_property_master(partner_id,partner_sub_id,property_type,property_name,agent_name,individual_name, phone, fax, email_id, description, building_no, street, land_mark, city, country, state, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, accept)VALUES
      (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.partner_id ?? "",
      partnerSubId ?? "",
      data.property.property_type ?? "",
      data.property_name ?? "",
      data.name ?? "",
      // data.company_name ?? "",
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
async function gethotelData(account_id) {
  const rows = await db.query(
    `SELECT account_id,property_txn_id,partner_id,partner_sub_id,sub_property_name,room_type, room_category, date_format(date_from,"%d-%m-%Y") as date_from, date_format(date_to,"%d-%m-%Y") as date_to,facilities,max_allow_adult,max_allow_kids,withoutac_withoutbreakfast_price,withoutac_withbreakfast_price,withac_withbreakfast_price,gst_per, units,property_specialOffer FROM mh_property_rooms_table WHERE account_id='${account_id}'`
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
async function getMultiplePropertyDetails() {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT  partner_id,partner_sub_id,account_id,property_id,property_name,property_type,agent_name,agent_sub_name,phone,fax,alternate_no,email_id,agent_commission,description,building_no,street,land_mark,city,city_id,country,state,state_id,pin_code,pan,aadhar,gstin,bankAccountNo,bankName,branchName,ifsc,cancelled_cheque_doc,pan_loc,gst_tin_loc,addhaar_loc,mh_agreement_loc,partner_pic_loc,mb_certificate_loc,property_tax_loc,fire_safety_loc, accept, status, remarks,concat(building_no,",",street,"," ,state,"," ,city,"," ,country) as address,concat(state,"," ,city) as location,alternate_no FROM mh_property_master WHERE 1`
  );
  const data = helper.emptyOrRows(rows);
  //   const meta = { page };

  return {
    data,
  };
}

async function saveRoomAvailData(data) {
  let val = data.selected_date.split("/").reverse().join("-");
  let dateArr = val.split("-");
  let selDateValue = parseInt(dateArr[0]);
  let selMonthValue = parseInt(dateArr[1]);
  let selYearValue = parseInt(dateArr[2]);

  let dayColumn = `b${selDateValue}`;
  let availColumn = `a${selDateValue}`;

  const rows1 = await db.query(
    `SELECT account_id, partner_id, partner_sub_id, property_id, room_id, year, month FROM mht_rooms_availabilities WHERE account_id='${data.account_id}' AND partner_id='${data.partner_id}' AND partner_sub_id='${data.partner_sub_id}' AND property_id='${data.property_txn_id}' AND room_id='${data.room_txn_id}' AND year='${selYearValue}'AND month='${selMonthValue}'`
  );
  let getRoomsAvailData = helper.emptyOrRows(rows1);
  if (getRoomsAvailData.length == 0) {
    const result = await db.query(
      `INSERT IGNORE INTO mht_rooms_availabilities(account_id, partner_id, partner_sub_id, property_id, room_id, year, month, ${dayColumn},${availColumn})VALUES
        (?,?,?,?,?,?,?,?,?)`,
      [
        data.account_id ?? "",
        data.partner_id ?? "",
        data.partner_sub_id ?? "",
        data.property_txn_id ?? "",
        data.room_txn_id ?? "",
        selYearValue ?? "",
        selMonthValue ?? "",
        selDateValue ?? "",
        data.availability_count ?? "",
      ]
    );

    let message = "Error in Saving Room availability dates";

    if (result.affectedRows) {
      message = "Room availability dates saved successfully";
    }
    return { message };
  } else {
    const result = await db.query(
      `UPDATE mht_rooms_availabilities SET ${dayColumn}=?, ${availColumn}=? WHERE account_id='${data.account_id}' AND partner_id='${data.partner_id}' AND partner_sub_id='${data.partner_sub_id}' AND property_id='${data.property_txn_id}' AND room_id='${data.room_txn_id}' AND year='${selYearValue}' AND month='${selMonthValue}'`,
      [selDateValue, data.availability_count]
    );
    let message = "Error in Updating Room availability dates";

    if (result.affectedRows) {
      message = "Room availability dates Updated successfully";
    }
    return { message };
  }
}
async function getAllRoomAvailCountDates(
  accountId,
  partnerId,
  partnerSubId,
  propertyTxnId,
  RoomId
) {
  const rows = await db.query(
    `SELECT * FROM mht_rooms_availabilities WHERE account_id='${accountId}' &&  partner_id='${partnerId}' && partner_sub_id='${partnerSubId}' && property_id='${propertyTxnId}' && room_id='${RoomId}'`
  );
  const data = helper.emptyOrRows(rows);
  return { data };
}
//other partners saving
async function createTravelDetails(fields, files, docs, ipAddress) {
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
      ipAddress,
    ]
  );
  let message = "Error in Travel Location  Registration";

  if (result.affectedRows) {
    message = "Travel Location  Registration created successfully";
  }
  return { message };
}
async function createAccFood(fields, files, docs, ipAddress) {
  let data = JSON.parse(fields.food_details);
  // console.log("data",data);
  // let food_items_list_arr = [];
  // for (let i = 0; i < data.foodItemsList.length; i++) {
  //   food_items_list_arr.push(data.foodItemsList[i].food_items_name);
  // }
  // let foodItemsList = food_items_list_arr.toString();
  const result = await db.query(
    `INSERT IGNORE INTO mh_foodpartner_details(account_id,agent_id, agent_sub_id,kitchen_name, kitchen_type,item_name,food_items_name,items_available_from,items_available_to,price,units,partner_status,food_image, ip_address)VALUES
      (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      // data.kitchen_txn_id ??"",
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
      data.kitchen_name ?? "",
      data.kitchen_type ?? "",
      data.foodtype ?? "",
      data.foodName ?? "",
      data.items_available_from ?? "",
      data.items_available_to ?? "",
      data.price ?? "",
      data.units ?? "",
      data.partner_status ?? "",
      docs.foodImg_name ?? "",
      ipAddress,
    ]
  );

  let message = "Error in Saving Food Details";
  if (result.affectedRows) {
    message = "Food Details Master created successfully";
  }
  return { message };
}
async function createAccMedical(fields, files, docs, ipAddress) {
  let data = JSON.parse(fields.equipmentItemDetails);
  const result = await db.query(
    `INSERT IGNORE INTO mh_equipment_location_table(account_id, equipment_id, equipment_sub_id, agent_name, equipment_sub_name, item_name, item_id, price, units,units_id,medical_store,purchased_type,address,city,city_id,location,partner_status,equipment_image,ip_address)VALUES
    (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
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
      data.partner_status ?? "",
      docs.equipmentImageName ?? "",
      ipAddress,
    ]
  );
  let message = "Error in Equipment Registration Location Master";

  if (result.affectedRows) {
    message = "Equipment Registration Location Master created successfully";
  }

  return { message };
}
async function getAccFoodDetails(account_id, agent_id, agent_sub_id, txn_id) {
  const rows = await db.query(
    `SELECT account_id,item_txn_id,agent_id,agent_sub_id,kitchen_name, kitchen_type,item_name,items_available_from,items_available_to,food_type_id,food_items_name,price,units,food_image,status,date_format(updated_datetime,"%d-%m-%Y") as updated_datetime,partner_status FROM mh_foodpartner_details WHERE account_id = '${account_id}' AND agent_id=${agent_id} AND agent_sub_id=${agent_sub_id} AND txn_id='${txn_id}';`
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
async function accFoodUpdate(txnID, agentId, agentSubId, data) {
  // let food_items_list_arr = [];
  // for (let i = 0; i < data.foodItemsList.length; i++) {
  //   food_items_list_arr.push(
  //     data.foodItemsList[i].food_items_name ?? data.foodItemsList[i]
  //   );
  // }

  // let foodItemsList = food_items_list_arr.toString();
  const result = await db.query(
    `UPDATE mh_foodpartner_details SET  account_id=?,agent_id=?, agent_sub_id=?,kitchen_name=?, kitchen_type=?,item_name=?,food_items_name=?,price=?,units=?,partner_status=?,food_image=? WHERE item_txn_id='${txnID}' AND agent_id='${agentId}' AND agent_sub_id='${agentSubId}'`,
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
      data.kitchen_name ?? "",
      data.kitchen_type ?? "",
      data.foodtype ?? "",
      data.foodName ?? "",
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
async function loadAccTravel(account_id, agent_id, transport_sub_id) {
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
async function accTravelUpdating(txnID, agentId, transportSubId, data) {
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
async function getAccMedical(account_id, equipment_id, equipment_sub_id) {
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
async function accUpdatingmedical(
  equipment_id,
  equipment_sub_id,
  txn_id,
  data
) {
  const result = await db.query(
    `UPDATE mh_equipment_location_table SET account_id=?, txn_id=?, equipment_id=?, equipment_sub_id=?,agent_name=?,equipment_sub_name=?, item_name=?,item_id=?, medical_store=?, price=?, units=?, units_id=?, partner_status=?, purchased_type=? WHERE equipment_id='${equipment_id}' AND equipment_sub_id='${equipment_sub_id}' AND txn_id='${txn_id}'`,
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
async function getaccomodationdetails() {
  const rows = await db.query(`SELECT *  FROM mh_property_details_table`);
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  let partnerDetails = "";
  let roomdetails = "";
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      partnerDetails = await helper.getpartnerDetails(
        element.partner_id,
        element.partner_sub_id
      );
      roomdetails = await helper.getpartnerroomDetails(
        element.partner_id,
        element.partner_sub_id
      );
      // Gststate= await helper.getgststate();
      index = index + 1;
      data.push({
        s_no: index,
        partnerDetails: partnerDetails,
        roomdetails: roomdetails,
        // gststate:Gststate,
        ...element,
      });
    }
  }
  return data;
}
async function createRestaurantDetails(fields, docs, ipAddress) {
  // console.log("fgfgfgc",fields);
  // console.log("docs",docs);
  // console.log("ipAddress",ipAddress);
  let data = JSON.parse(fields.restaurant_details);

  // console.log("data",data);

  const result = await db.query(
    `INSERT IGNORE INTO mh_restaurant_details_table(txn_id,account_id, agent_id, agent_sub_id, food_partner_name, food_partner_sub_name, food_partner_phone, name_of_kitchen, type_of_kitchen, fssai_no,upload_fssai, special_offer,date_from,date_to, restaurant_description, restaurant_phone, restaurant_email, restaurant_latitude, restaurant_longitude, building_no, street, land_mark, country,state_id,state_name,city_id, city_name, pin_code, opening_time, closing_time, Name_Of_Contact_Person,partner_status, upload_image, upload_image1, upload_image2, ip_address)VALUES
    (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.txn_id ?? "",
      data.account_id ?? "",
      data.agent_id ?? "",
      data.agent_sub_id ?? "",
      data.food_partner_name ?? "",
      data.food_partner_sub_name ?? "",
      data.food_partner_phone ?? "",
      data.name_of_kitchen ?? "",
      data.type_of_kitchen ?? "",
      data.fssai_no ?? "",
      docs.upload_fssai_name ?? "",
      data.special_offer ?? "",
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
      ipAddress,
    ]
  );

  let message = "Error in Saving Restaurant Details";

  if (result.affectedRows) {
    message = "Restaurant Details Master created successfully";
  }

  return { message };
}
async function getRestaurantDetails(accountId, agentId, agentSubId) {
  // console.log("Mahendraaa");
  const rows = await db.query(
    `SELECT txn_id,account_id, agent_id, agent_sub_id, food_partner_name, food_partner_sub_name, food_partner_phone, name_of_kitchen, type_of_kitchen, fssai_no,upload_fssai, special_offer, date_from, date_to,restaurant_description, restaurant_phone, restaurant_email, restaurant_latitude, restaurant_longitude, building_no, street, land_mark, country, state_id, state_name, city_id, city_name, pin_code, opening_time, closing_time, Name_Of_Contact_Person, upload_image, upload_image1, upload_image2, ip_address FROM mh_restaurant_details_table WHERE account_id='${accountId}' AND agent_id='${agentId}' AND agent_sub_id='${agentSubId}'`
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
async function updateRestaurantDetails(txnID, data) {
  const result = await db.query(
    `UPDATE mh_restaurant_details_table SET agent_id=?, agent_sub_id=?, food_partner_name=?, food_partner_sub_name=?, food_partner_phone=?, name_of_kitchen=?, type_of_kitchen=?, fssai_no=?, special_offer=?, date_from=?, date_to=?, restaurant_description=?, restaurant_phone=?, restaurant_email=?, restaurant_latitude=?, restaurant_longitude=?, building_no=?, street=?, land_mark=?, country=?,state_id=?,state_name=?,city_id=?, city_name=?, pin_code=?, opening_time=?, closing_time=?, Name_Of_Contact_Person=? WHERE txn_id='${txnID}'`,
    [
      data.agent_id ?? "",
      data.agent_sub_id ?? "",
      data.food_partner_name ?? "",
      data.food_partner_sub_name ?? "",
      data.food_partner_phone ?? "",
      data.name_of_kitchen ?? "",
      data.type_of_kitchen ?? "",
      data.fssai_no ?? "",
      data.special_offer ?? "",
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
async function updateRoomdataSaving(fields, ipAddress) {
  let data = JSON.parse(fields.editedRoomItem);
  //console.log("datasada123", data);
  // console.log("docs",docs,files);

  let amenity_arr = [];
  let amenity_iconArr = [];
  for (let i = 0; i < data.facilities.length; i++) {
    amenity_arr.push(data.facilities[i].amenity_name ?? data.facilities[i]);
    amenity_iconArr.push(data.facilities[i].icon_image);
  }
  let amenities = amenity_arr.toString();
  // console.log("1",amenities)
  let amenityIcon = amenity_iconArr.toString();
  // console.log("2",amenityIcon)
  // let roomNumber = data.room_numbers.toString();
  // console.log("3",roomNumber )

  const result = await db.query(
    `INSERT IGNORE INTO mh_room_operation(account_id,property_txn_id, partner_id, partner_name,partner_sub_id, sub_partner_name, property_name, sub_property_name, facilities, icon_image,other_amenities, room_type,max_allow_adult,max_allow_kids, gst_per,	withac_withbreakfast_price,withac_withoutbreakfast_price,	withoutac_withbreakfast_price,withoutac_withoutbreakfast_price,date_from,date_to,offer_nonac,offer_nonac_breakfast,offer_ac,offer_ac_breakfast,offer_date_from,offer_date_to,10days_offer,20days_offer,30days_offer,offerApplicableFromDate,offerApplicableToDate,maximum_capacity_adults,maximum_capacity_kids,rate_incress,no_of_avail_rooms,ip_address)VALUES
   (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.account_id ?? "",
      data.property_txn_id ?? "",
      data.partner_id ?? "",
      data.partner_name ?? "",
      data.partner_sub_id ?? "",
      data.sub_partner_name ?? "",
      data.property_name ?? "",
      data.sub_property_name ?? "",
      amenities ?? "",
      amenityIcon ?? "",

      data.other_amenities ?? "",

      data.room_type ?? "",
      // roomNumber ?? "",

      // data.units ?? "",
      data.max_allow_adult ?? "",
      data.max_allow_kids ?? "",
      data.gst_per ?? "",
      data.withac_withbreakfast_price ?? "",
      data.withac_withoutbreakfast_price ?? "",
      data.withoutac_withbreakfast_price ?? "",
      data.withoutac_withoutbreakfast_price ?? "",
      data.date_from ?? "",
      data.date_to ?? "",
      data.noac_price_offer ?? "",
      data.nonacwithbreackfast_price_offer ?? "",
      data.ac_price_offer ?? "",
      data.acwithbreackfast_price_offer ?? "",
      data.date_from_offer ?? "",
      data.date_to_offer ?? "",
      data.tendays_price ?? "",
      data.twentydays_price ?? "",
      data.thirtydays_price ?? "",
      data.offer_applicable_date_from ?? "",
      data.offer_applicable_date_to ?? "",
      data.maximum_capacity_adults ?? "",
      data.maximum_capacity_kids ?? "",
      data.rate_incress ?? "",
      data.no_of_avail_rooms ?? "",

      // data.status ?? "",
      ipAddress,
    ]
  );
  let message = "Error in Saving Room Details";

  if (result.affectedRows) {
    message = "Room Details created successfully";
  }
  return { message };
}
async function getupdateroomDetails(txn_id) {
  const rows = await db.query(
    `SELECT txn_id,account_id,property_txn_id, partner_id, partner_name,partner_sub_id, sub_partner_name, property_name, sub_property_name,room_category, facilities, icon_image,other_amenities, room_type,max_allow_adult,max_allow_kids, gst_per,	withac_withbreakfast_price,withac_withoutbreakfast_price,	withoutac_withbreakfast_price,withoutac_withoutbreakfast_price,date_format(date_from, '%d-%m-%Y') as date_from,date_format(date_to, '%d-%m-%Y') as date_to,offer_nonac,offer_nonac_breakfast,offer_ac,offer_ac_breakfast,date_format(offer_date_from,'%d-%m-%Y') as offer_date_from ,date_format(offer_date_to,'%d-%m-%Y') as offer_date_to,tendays_offer,twentydays_offer,thirtydays_offer,date_format(offerApplicableFromDate,'%d-%m-%Y') as offerApplicableFromDate ,date_format(offerApplicableToDate,'%d-%m-%Y') as offerApplicableToDate,maximum_capacity_adults,maximum_capacity_kids,rate_incress,no_of_avail_rooms FROM mh_room_operation WHERE property_txn_id='${txn_id}'`
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
    // console.log("getroomupdatadata",data);
  }
  // console.log("getroomupdatadata",data);

  return {
    data,
  };
}
async function updatePropertyoperationroomDetails(txn_id, data) {
  let amenity_arr = [];
  let amenity_iconArr = [];
  for (let i = 0; i < data.facilities.length; i++) {
    amenity_arr.push(data.facilities[i].amenity_name);
    amenity_iconArr.push(data.facilities[i].icon_image);
  }
  let amenities = amenity_arr.toString();
  // console.log("1",amenities)
  let amenityIcon = amenity_iconArr.toString();

  //console.log("updateroomoperations", data);
  const fromDate = moment(data.date_from, "DD/MM/YYYY").format(
    "YYYY-MM-DD HH:mm:ss"
  );
  const toDate = moment(data.date_to, "DD/MM/YYYY").format(
    "YYYY-MM-DD HH:mm:ss"
  );
  const offerfromDate = moment(data.offer_date_from, "DD/MM/YYYY").format(
    "YYYY-MM-DD HH:mm:ss"
  );
  const offertoDate = moment(data.offer_date_to, "DD/MM/YYYY").format(
    "YYYY-MM-DD HH:mm:ss"
  );
  const offerApplifromDate = moment(
    data.offerApplicableFromDate,
    "DD/MM/YYYY"
  ).format("YYYY-MM-DD HH:mm:ss");
  const offerApplitoDate = moment(
    data.offerApplicableToDate,
    "DD/MM/YYYY"
  ).format("YYYY-MM-DD HH:mm:ss");

  const result = await db.query(
    `UPDATE mh_room_operation SET txn_id=?, account_id=?, partner_name=?, property_txn_id=?, partner_id=?,  partner_sub_id=?, sub_partner_name=?, property_name=?, sub_property_name=?,room_category=?, facilities=?, icon_image=?, other_amenities=?, room_type=?, max_allow_adult=?, max_allow_kids=?, gst_per=?, withac_withbreakfast_price=?, withac_withoutbreakfast_price=?, withoutac_withbreakfast_price=?, withoutac_withoutbreakfast_price=?, date_from=?, date_to=?, offer_nonac=?,offer_nonac_breakfast=?,offer_ac=?,offer_ac_breakfast=?,	offer_date_from=?,offer_date_to=?,tendays_offer=?,twentydays_offer=?,thirtydays_offer=?,offerApplicableFromDate =?,offerApplicableToDate=?,maximum_capacity_adults=?,maximum_capacity_kids=?,rate_incress=?,no_of_avail_rooms=? WHERE txn_id='${txn_id}'`,
    [
      data.txn_id ?? "",
      data.account_id ?? "",
      data.partner_name ?? "",
      data.property_txn_id ?? "",
      data.partner_id ?? "",

      data.partner_sub_id ?? "",
      data.sub_partner_name ?? "",
      data.property_name ?? "",
      data.sub_property_name ?? "",
      data.room_category ?? "",

      amenities ?? "",
      amenityIcon ?? "",
      data.other_amenities ?? "",
      data.room_type ?? "",
      data.max_allow_adult ?? "",
      data.max_allow_kids ?? "",
      data.gst_per ?? "",
      data.withac_withbreakfast_price ?? "",
      data.withac_withoutbreakfast_price ?? "",
      data.withoutac_withbreakfast_price ?? "",

      data.withoutac_withoutbreakfast_price ?? "",

      fromDate ?? "",
      toDate ?? "",
      data.offer_nonac ?? "",
      data.offer_nonac_breakfast ?? "",
      data.offer_nonac ?? "",
      data.offer_ac_breakfast ?? "",
      offerfromDate ?? "",
      offertoDate ?? "",
      data.tendays_offer ?? "",
      data.twentydays_offer ?? "",
      data.thirtydays_offer ?? "",

      // data.twentydays_price ?? "",
      // data.thirtydays_price ?? "",
      offerApplifromDate ?? "",
      offerApplitoDate ?? "",
      data.maximum_capacity_adults ?? "",
      data.maximum_capacity_kids ?? "",
      data.rate_incress ?? "",
      data.no_of_avail_rooms ?? "",
    ]
  );
  let message = "Error in updating Property Data";

  if (result.affectedRows) {
    message = "Property Data  updated successfully";
  }

  return { message };
}
async function getroomsavailabilitiespricestable(params) {
  //console.log("service", params);
  const payload = params.payload;
  const dates = payload.split(",");

  // Filter and transform the dates
  const filteredAndTransformed = dates.map((date) => {
    const dayNumber = parseInt(date.split("-")[2]);
    const payloadLabel = `p${dayNumber}`;
    const afterPayloadLabel = `a${dayNumber}`;
    return `${payloadLabel},${afterPayloadLabel}`;
  });

  // Join the transformed dates back into a string
  const output = filteredAndTransformed.join(",");

  //console.log("output,",output);

  const rows = await db.query(
    // `SELECT room_sub_type,p1,a1, p2, a2, p3, a3, p4, a4, p5, a5, p6, a6, p7, a7, p8, a8, p9, a9, p10, a10, p11, a11, p12, a12, p13, a13, p14, a14, p15, a15, p16, a16, p17, a17, p18, a18, p19, a19, p20, a20, p21, a21, p22, a22, p23, a23, p24, a24, p25, a25, p26, a26, p27, a27, p28, a28, p29, a29, p30, a30, p31, a31 FROM mhz_rooms_availabilities_prices_table WHERE room_sub_type IN ('ac','non_ac','ac_breakfast','non_ac_breakfast') AND room_id='${txn_id}';`
    `SELECT room_sub_type, ${output} FROM mhz_rooms_availabilities_prices_table WHERE room_sub_type IN ('ac','non_ac','ac_breakfast','non_ac_breakfast') AND room_id='19'; `
  );

  const result = helper.emptyOrRows(rows);
  let data = {};

  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      const roomSubType = element.room_sub_type;

      if (!data[roomSubType]) {
        data[roomSubType] = {};
      }

      for (const property in element) {
        if (property.startsWith("p") || property.startsWith("a")) {
          data[roomSubType][property] = element[property];
        }
      }
    }
  }

  //console.log("get room price", data);

  return {
    data,
  };
}
async function updateRoomPriceAndAvaliabilityData(room_id, update) {
  //console.log("updated Price", update, room_id);

  const result = await db.query(
    `UPDATE mhz_rooms_availabilities_prices_table SET year=?, m=?,${update.avaliabilityPrice}=?,${update.avaliabilityDate}=? WHERE room_id='${room_id}' AND room_sub_type = 'ac' `,
    [
      update.year ?? "",
      update.m ?? "",
      update.acprice ?? "",
      update.acAvailability ?? "",
    ]
  );
  const result1 = await db.query(
    `UPDATE mhz_rooms_availabilities_prices_table SET year=?, m=?, ${update.avaliabilityPrice}=?,${update.avaliabilityDate}=? WHERE room_id='${room_id}' AND room_sub_type = 'non_ac' `,
    [
      update.year ?? "",
      update.m ?? "",
      update.nonAcPrice ?? "",
      update.nonAcAvailability ?? "",
    ]
  );
  // SELECT p23 ,room_sub_type FROM `mhz_rooms_availabilities_prices_table` WHERE room_sub_type IN ('ac','non_ac','ac_breakfast') AND room_id =19;
  const result2 = await db.query(
    `UPDATE mhz_rooms_availabilities_prices_table SET year=?, m=?,${update.avaliabilityPrice}=?,${update.avaliabilityDate}=? WHERE room_id='${room_id}' AND room_sub_type = 'ac_breakfast' `,
    [
      update.year ?? "",
      update.m ?? "",
      update.acWithBreakfastPrice ?? "",
      update.acWithBreakfastAvailability ?? "",
    ]
  );
  const result3 = await db.query(
    `UPDATE mhz_rooms_availabilities_prices_table SET year=?, m=?,${update.avaliabilityPrice}=?,${update.avaliabilityDate}=? WHERE room_id='${room_id}' AND room_sub_type = 'non_ac_breakfast' `,
    [
      update.year ?? "",
      update.m ?? "",
      update.nonAcWithBreakfastPrice ?? "",
      update.nonAcWithBreakfastAvailability ?? "",
    ]
  );
  let message = "Error While Updating Price And Avaliability Data";

  if (
    result.affectedRows &&
    result1.affectedRows &&
    result2.affectedRows &&
    result3.affectedRows
  ) {
    message = " Updated Price And Avaliability Data Successfully";
  }

  return { message };
}

async function getBookingUpcomingForPartner() {
  const rows = await db.query(
    `SELECT booking_order_id, property_name, room_type, near_hospital_name, property_city_name, check_in, check_out,no_of_days,room_booked_count,(no_of_days * room_booked_count) as room_nights, total_price, guest_count,GROUP_CONCAT(b.guest_name) as guests FROM mh_bookings_table a JOIN mh_booking_txn_table b on a.booking_order_id =b.mh_booking_id WHERE check_in >= CURDATE() AND total_price > 200 AND a.booking_status = 'Booked' GROUP BY b.mh_booking_id;`
  );
  const data = helper.emptyOrRows(rows);
  //console.log("data", data);
  return {
    data,
  };
}

async function updatingFoodPriceForm(data) {
  const result = await db.query(
    `INSERT IGNORE INTO  mh_food_price_update(account_id,txn_id,agent_id,kitchen_type,units,food_price)
    VALUES
    (?,?,?,?,?,?)`,
    [
      data.account_id ?? "",
      data.txn_id ?? "",
      data.agent_id ?? "",
      data.kitchen_type ?? "",
      data.foods_per_plat ?? "",
      data.per_price ?? "",
    ]
  );
  let message = "Error in Food Price updating";

  if (result.affectedRows) {
    message = "Food Price updating successfully";
  }
  return { message };
}

async function createAccomadationVisitDetails(fields, files, docs, ipAddress) {

  let data = JSON.parse(fields.accomadation_details);
  let ratesData = JSON.parse(fields.accomadation_rates);
  //console.log('data',data)
  //console.log('ratesData',ratesData)


  let month = moment(new Date()).format("MM");
  let year = moment(new Date()).format("YY");
  let FieldVisitId = await helper.generateMaxAarthiBookingId(
    "mh_fieldvisit_accomodation_details",
    "s_no"
  ); // Pass the column name as a string
  let mh_field_visit_id = FieldVisitId.toString().padStart(4, "0");
  let confirmFieldVisitId = `FSID${data.user_id}${data.city_id}${year}${month}${mh_field_visit_id}`;
  // console.log(confirmFieldVisitId);

  const result1 = await db.query(
    `INSERT IGNORE INTO mh_fieldvisit_accomodation_details( user_id,user_name,employee_id,name,employee_location,city_id,field_visit_id,property_name,address,pin_code,phone_number,email_id,near_hospital_name,other_hospital_name,owner_name,owner_mail_id,owner_phone_number,manager_name,manager_mail_id,manager_phone_number,total_rooms,total_ac_rooms,total_non_ac_rooms,which_floor,distance_hospital,property_type,aggregator,aggregator_name,check_in_time,check_out_time,location,parking,lift,cctv,ramp,restaurant,self_kitchen,tv,wifi,hot_water,fridge,discussion_breif,mh_share_revenue,pan_card,gst,cancel_cheque,facade,facade2,lobby1,lobby2,restaurant_pic,self_kitchen_pic,room1,room1_bathroom,room2,room2_bathroom,room3,room3_bathroom,ip)VALUES
    (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.user_id ?? "",
      data.user_name ?? "",
      data.employee_id ?? "",
      data.employee_name ?? "",
      data.employee_location ?? "",
      data.city_id ?? "",
      confirmFieldVisitId ?? "",
      data.propertyName ?? "",
      data.address ?? "",
      data.pincode ?? "",
      data.phoneNumber ?? "",
      data.emailId ?? "",
      data.nearHospital.near_hospital_name ?? "",
      data.otherHospital ?? "",
      data.ownerName ?? "",
      data.ownerMail ?? "",
      data.ownerPhone ?? "",
      data.managerName ?? "",
      data.managerMail ?? "",
      data.managerPhone ?? "",
      data.totalRooms ?? "",
      data.AC ?? "",
      data.nonAc ?? "",
      data.whichFloor ?? "",
      data.farDistance ?? "",
      data.propertyType ?? "",
      data.aggregator ?? "",
      data.aggregatorName ?? "",
      data.checkIn ?? "",
      data.checkOut ?? "",
      data.location ?? "",
      data.parking ?? "",
      data.lift ?? "",
      data.cctv ?? "",
      data.ramp ?? "",
      data.restaurant ?? "",
      data.selfKitchenOption ?? "",
      data.Tv ?? "",
      data.Wifi ?? "",
      data.hotWater ?? "",
      data.fridge ?? "",
      data.discussionBrief ?? "",
      data.shareRevenue ?? "",
      docs.upload_pan_card_name ?? "",
      docs.upload_gst_name ?? "",
      docs.upload_cancel_cheque_name ?? "",
      docs.upload_facade_name ?? "",
      docs.upload_facade2_name ?? "",
      docs.upload_lobby1_name ?? "",
      docs.upload_lobby2_name ?? "",
      docs.upload_restaurant_name ?? "",
      docs.upload_self_kitchen_name ?? "",
      docs.room1_name ?? "",
      docs.upload_room1_bathroom_name ?? "",
      docs.room2_name ?? "",
      docs.upload_room2_bathroom_name ?? "",
      docs.room3_name ?? "",
      docs.upload_room3_bathroom_name ?? "",
      ipAddress,

    ]
  );

  for (let i = 0; i < ratesData.length; i++) {
    var result2 = await db.query(
      `INSERT IGNORE INTO mh_fieldvisit_accomadation_rates( user_id,user_name,employee_id,name,employee_location,city_id,field_visit_id,room_category,ac_type,sharing_type,breakfast_type,rate)VALUES
          (?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        ratesData[i].user_id ?? "",
        ratesData[i].user_name ?? "",
        ratesData[i].employee_id ?? "",
        ratesData[i].name ?? "",
        ratesData[i].employee_location ?? "",
        ratesData[i].city_id ?? "",
        confirmFieldVisitId ?? "",
        ratesData[i].roomCategory ?? "",
        ratesData[i].acRates ?? "",
        ratesData[i].sharingTypes ?? "",
        ratesData[i].breakFastTypes ?? "",
        ratesData[i].Rates ?? "",
      ]
    );
  }

  
 return { result1,result2 };
}


async function createTravelVisitDetails(fields, files, docs, ipAddress) {

let data = JSON.parse(fields.travel_visit_details);

// let data = JSON.parse(fields.accomadation_details);
  // let ratesData = JSON.parse(fields.accomadation_rates);
  //console.log('data',data)
//console.log('ratesData',ratesData)


  let month = moment(new Date()).format("MM");
    let year = moment(new Date()).format("YY");
    let FieldVisitId = await helper.generateMaxAarthiBookingId("mh_fieldvisit_travel_details","s_no"); // Pass the column name as a string
    let mh_field_visit_id = FieldVisitId.toString().padStart(4, "0");
    let confirmFieldVisitId = `FSID${data.user_id}${data.city_id}${year}${month}${mh_field_visit_id}`;
    // console.log(confirmFieldVisitId)
   //console.log(fields)
  // console.log(data)
  // console.log('docs',docs)
  const result = await db.query(
`INSERT IGNORE INTO mh_fieldvisit_travel_details( field_visit_id,user_id,user_name,city_id,employee_id,name,employee_location,travel_agency_name,address,pin_code,phone_number,email_id,near_hospital_name,other_hospital_name,owner_name,owner_mail,owner_phone_number,manager_name,manager_mail,manager_phone_number,total_vehicles,five_seaters,seven_seaters,discussion_brief,mh_share_revenue,pan_card,gst,cancel_cheque,ip)VALUES
(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
[
      confirmFieldVisitId ?? "",
      data.user_id ?? "",
      data.user_name ?? "",
      data.city_id ?? "",
      data.employee_id ?? "",
      data.name ?? "",
      data.employee_location ?? "",
data.travelAgencyName ?? "",
data.address ?? "",
data.pincode ?? "",
      data.phoneNumber ?? "",
      data.emailId ?? "",
      data.nearHospital.near_hospital_name ?? "",
      data.otherHospital ?? "",
      data.ownerName ?? "",
      data.ownerMail ?? "",
      data.ownerPhone ?? "",
      data.managerName ?? "",
      data.managerMail ?? "",
      data.managerPhone ?? "",
      data.totalVehicles ?? "",
      data.fiveSeaters ?? "",
      data.sevenSeaters ?? "",
      data.discussionBrief ??"",
      data.shareRevenue ?? "",
      docs.upload_pan_card_name ?? "",
      docs.upload_gst_name ?? "",
      docs.upload_cancel_cheque_name ?? "",
      
      ipAddress,
      
    ]
  );
  
  // console.log(result)
  return { result };
}


async function createFoodVisitDetails(fields, files, docs, ipAddress) {
  
  let data = JSON.parse(fields.food_visit_details);

  // let data = JSON.parse(fields.accomadation_details);
  // let ratesData = JSON.parse(fields.accomadation_rates);
  //console.log('data',data)
  //console.log('ratesData',ratesData)


  let month = moment(new Date()).format("MM");
    let year = moment(new Date()).format("YY");
    let FieldVisitId = await helper.generateMaxAarthiBookingId("mh_fieldvisit_food_details","s_no"); // Pass the column name as a string
    let mh_field_visit_id = FieldVisitId.toString().padStart(4, "0");
    let confirmFieldVisitId = `FSID${data.user_id}${data.city_id}${year}${month}${mh_field_visit_id}`;
    // console.log(confirmFieldVisitId)
  //console.log(data)
  //console.log(docs)
  const result = await db.query(
    `INSERT IGNORE INTO mh_fieldvisit_food_details( field_visit_id,employee_id,name,employee_location,user_name,user_id,city_id,restaurant_name,address,phone_number,email_id,pincode,near_hospital_name,other_hospital_name,owner_name,owner_mail,owner_phone_number,manager_name,manager_mail,manager_phone_number,item1,item2,item3,pan_card,gst,cancel_cheque,fssai_certificate,discussion_brief,mh_share_revenue,ip)VALUES
    (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      confirmFieldVisitId ?? "",
      data.employee_id ?? "",
      data.name ?? "",
      data.employee_location ?? "",
      data.user_name ?? "",
      data.user_id ?? "",
      data.city_id ?? "",
      data.restaurantName ?? "",
      data.address ?? "",
      data.phoneNumber ?? "",
      data.emailId ?? "",
      data.pincode ?? "",
      data.nearHospital.near_hospital_name ?? "", 
      data.otherHospital ?? "",
      data.ownerName ?? "",
      data.ownerMail ?? "",
      data.ownerPhone ?? "",
      data.managerName ?? "",
      data.managerMail ?? "",
      data.managerPhone ?? "",
      data.item1 ?? "",
      data.item2 ?? "",
      data.item3 ?? "",
    
      docs.upload_pan_card_name ?? "",
docs.upload_gst_name ?? "",
docs.upload_cancel_cheque_name ?? "",
      docs.upload_fssai_certificate_name ?? "",
      data.discussionBrief ?? "",
      data.MHShareRevenue ?? "",
      ipAddress,
     
      
    ]
  );
  
  // console.log("backend",result)
  return { result };
}

async function createEquipmentVisitDetails(fields, files, docs, ipAddress) {
  
  let data = JSON.parse(fields.equipment_visit_details);
  // console.log(data)

  let month = moment(new Date()).format("MM");
    let year = moment(new Date()).format("YY");
    let FieldVisitId = await helper.generateMaxAarthiBookingId("mh_fieldvisit_equipment_details","s_no"); // Pass the column name as a string
    let mh_field_visit_id = FieldVisitId.toString().padStart(4, "0");
    let confirmFieldVisitId = `FSID${data.user_id}${data.city_id}${year}${month}${mh_field_visit_id}`;

  // console.log(docs)
  const result = await db.query(
    `INSERT IGNORE INTO mh_fieldvisit_equipment_details( field_visit_id,employee_id,name,employee_location,user_name,user_id,city_id,equipment_name,address,pin_code,phone_number,email_id,near_hospital_name,other_hospital_name,owner_name,owner_mail,owner_phone_number,manager_name,manager_mail,manager_phone_number,wheel_chairs,oxygen_cylinders,tripod_walking_stick,pan_card,gst,cancel_cheque,wheel_chair_pic,oxygen_cylinder_pic,tripod_walking_stick_pic,mh_share_revenue,discussion_brief,ip,remarks)VALUES
    (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      confirmFieldVisitId ?? "",
      data.employee_id ?? "",
      data.employee_name ?? "",
      data.employee_location ?? "",
      data.user_name ?? "",

      data.user_id ?? "",
      data.city_id ?? "",
      data.equipmentName ?? "",
      data.address ?? "",
      data.pincode ?? "", 
      data.phoneNumber ?? "",
      data.emailId ?? "",
      data.nearHospital.near_hospital_name ?? "", 
      data.otherHospital ?? "",
      data.ownerName ?? "",
      data.ownerMail ?? "",
      data.ownerPhone ?? "",
      data.managerName ?? "",
      data.managerMail ?? "",
      data.managerPhone ?? "",
      data.wheelChair ?? "",
      data.oxygenCylinder ?? "",
      data.tripodWalkingStick ?? "",
      docs.upload_pan_card_name ?? "",
      docs.upload_gst_name ?? "",
      docs.upload_cancel_cheque_name ?? "",
      docs.upload_wheel_chair_pic_name ?? "",
      docs.upload_cylinder_pic_name?? "",
      docs.upload_stick_pic_name ?? "",
      data.MHShareRevenue ?? "",
      data.discussionBrief ?? "",
      ipAddress,

      data.remarks ?? "",
      
    ]
  );
  
  // console.log(result)
  return { result };
}


//Ravi kiran Update query for Accomadation
async function updateAccomadationVisitDetails(fields,value,docNames,visitId) {
  const index = 0;
  //console.log(visitId)

  //console.log(value)
  //console.log(docNames)

  let data = JSON.parse(fields.update_accomadation_details);
  let ratesData = JSON.parse(fields.update_accomadation_Rates);
  //console.log(ratesData);

  //console.log('value',value)
  //console.log('docs',docNames)
  //console.log('s-no',s_no)
  let hospital_name = "";

  if (typeof value.nearHospital == "object") {
    hospital_name = value.nearHospital.near_hospital_name;
    //console.log('1',hospital_name)
  } else {
    hospital_name = value.nearHospital;
    //console.log('2',hospital_name)
  }

  const result1 = await db.query(
    `UPDATE mh_fieldvisit_accomodation_details SET property_name=?,address=?,pin_code=?,phone_number=?,email_id=?,near_hospital_name=?,other_hospital_name=?,owner_name=?,owner_mail_id=?,owner_phone_number=?,manager_name=?,manager_mail_id=?,manager_phone_number=?,total_rooms=?,total_ac_rooms=?,total_non_ac_rooms=?,which_floor=?,distance_hospital=?,property_type=?,aggregator=?,aggregator_name=?,check_in_time=?,check_out_time=?,location=?,parking=?,lift=?,cctv=?,ramp=?,restaurant=?,self_kitchen=?,tv=?,wifi=?,hot_water=?,fridge=?,discussion_breif=?,mh_share_revenue=?,pan_card=?,gst=?,cancel_cheque=?,facade=?,facade2=?,lobby1=?,lobby2=?,restaurant_pic=?,self_kitchen_pic=?,room1=?,room1_bathroom=?,room2=?,room2_bathroom=?,room3=?,room3_bathroom=? WHERE field_visit_id='${visitId}';`,
    [

      data.propertyName ?? "",
      data.address ?? "",
      data.pincode ?? "",
      data.phoneNumber ?? "",
      data.emailId ?? "",
      hospital_name ?? "",
      data.otherHospital ?? "",
      data.ownerName ?? "",
      data.ownerMail ?? "",
      data.ownerPhone ?? "",
      data.managerName ?? "",
      data.managerMail ?? "",
      data.managerPhone ?? "",
      data.totalRooms ?? "",
      data.AC ?? "",
      data.nonAc ?? "",
      data.whichFloor ?? "",
      data.farDistance ?? "",
      data.propertyType ?? "",
      data.aggregator ?? "",
      data.aggregatorName ?? "",
      data.checkIn ?? "",
      data.checkOut ?? "",
      data.location ?? "",
      data.parking ?? "",
      data.lift ?? "",
      data.cctv ?? "",
      data.ramp ?? "",
      data.restaurant ?? "",
      data.selfKitchenOption ?? "",
      data.Tv ?? "",
      data.Wifi ?? "",
      data.hotWater ?? "",
      data.fridge ?? "",
      data.discussionBrief ?? "",
      data.shareRevenue ?? "",
      docNames.panCardName ?? "",
      docNames.gstName ?? "",
      docNames.cancelChequeName ?? "",
      docNames.facadeName ?? "",
      docNames.facadeName2 ?? "",
      docNames.lobby1Name ?? "",
      docNames.lobby2Name ?? "",
      docNames.restaurantName ?? "",
      docNames.selfKitchenName ?? "",
      docNames.room1Name ?? "",
      docNames.room1BathroomName ?? "",
      docNames.room2Name ?? "",
      docNames.room2BathroomName ?? "",
      docNames.room3Name ?? "",
      docNames.room3BathroomName ?? "",

    
    ]
  );


  for (let i = 0; i < ratesData.length; i++) {
    var result2 = await db.query(
      `INSERT IGNORE INTO mh_fieldvisit_accomadation_rates( field_visit_id,user_id,user_name,employee_id,name,employee_location,city_id,room_category,ac_type,sharing_type,breakfast_type,rate)VALUES
        (?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        ratesData[i].field_visit_id ?? "",
        ratesData[i].user_id ?? "",
        ratesData[i].user_name ?? "",
        ratesData[i].employee_id ?? "",
        ratesData[i].name ?? "",
        ratesData[i].employee_location ?? "",
        ratesData[i].city_id ?? "",
        ratesData[i].room_category ?? "",
        ratesData[i].ac_type ?? "",
        ratesData[i].sharing_type ?? "",
        ratesData[i].breakfast_type ?? "",
        ratesData[i].rate ?? "",
      ]
    );
  }

  
 return { result1,result2 }
 
}

async function updateTravelVisitDetails(data,files,docs,field_visit_id,ipAddress) {
  //const s_no = data.s_no;
  // console.log("sai",field_visit_id)
  //console.log('1',data)
  //console.log('2',files)

  let drop = null;
  // console.log(data)

  if (typeof(data.nearHospital.near_hospital_name)==="string") {
     drop = data.nearHospital.near_hospital_name
  }
  else {
    // console.log(data.nearHospital)
     drop = data.nearHospital
  }
  // console.log('3',docs)
  // console.log('4',s_no)
  //console.log('5',ipAddress)
  // console.log("data111111",data,docNames)
 // let data = JSON.parse(fields.updateProperty);
 const result = await db.query(
  `UPDATE mh_fieldvisit_travel_details SET travel_agency_name=?,address=?,pin_code=?,phone_number=?,email_id=?,near_hospital_name=?,other_hospital_name=?,owner_name=?,owner_mail=?,owner_phone_number=?,manager_name=?,manager_mail=?,manager_phone_number=?,total_vehicles=?,five_seaters=?,seven_seaters=?,discussion_brief=?,mh_share_revenue=?,pan_card=?,gst=?,cancel_cheque=? WHERE field_visit_id='${field_visit_id}';`,
  [
    data.travelAgencyName ?? "",
    data.address ?? "",
    data.pincode ?? "",
    data.phoneNumber ?? "",
    data.emailId ?? "",
    drop ?? "",
    data.otherHospital ?? "",
    data.ownerName ?? "",
    data.ownerMail ?? "",
    data.ownerPhone ?? "",
    data.managerName ?? "",
    data.managerMail ?? "",
    data.managerPhone ?? "",
    data.totalVehicles ?? "",
    data.fiveSeaters ?? "",
    data.sevenSeaters ?? "",
    data.discussionBrief ?? "",
    data.shareRevenue ?? "",
    docs.panCardName ?? "",
    docs.gstName ?? "",
    docs.cancelChequeName ?? "",
  
    
  ]
);

// console.log(result)
return { result }
 
}


async function updateFoodVisitDetails(data,files,docs,s_no,ipAddress) {
  //const s_no = data.s_no;
  // console.log(s_no)
 
// console.log(data)


let nearHospitalName
if (typeof(data.nearHospital)=='string'){
  nearHospitalName=data.nearHospital
}
else{
  nearHospitalName=data.nearHospital.near_hospital_name

}

// console.log(typeof(nearHospitalName))
// console.log(data.nearHospital)

const result = await db.query(
  `UPDATE mh_fieldvisit_food_details SET restaurant_name=?,address=?,pincode=?,phone_number=?,email_id=?,near_hospital_name=?,other_hospital_name=?,owner_name=?,owner_mail=?,owner_phone_number=?,manager_name=?,manager_mail=?,manager_phone_number=?,item1=?,item2=?,item3=?,pan_card=?,gst=?,cancel_cheque=?,fssai_certificate=?,discussion_brief=?,mh_share_revenue=? WHERE s_no='${s_no}';`,
  [
    data.restaurantName ?? "",
    data.address ?? "",
    data.pincode ?? "",
    data.phoneNumber ?? "",
    data.emailId ?? "",
    nearHospitalName ?? "",
    data.otherHospital ?? "",
    data.ownerName ?? "",
    data.ownerMail ?? "",
    data.ownerPhone ?? "",
    data.managerName ?? "",
    data.managerMail ?? "",
    data.managerPhone ?? "",
    data.item1 ?? "",
    data.item2 ?? "",
    data.item3 ?? "",
    docs.panCardName ?? "",
    docs.gstName ?? "",
    docs.cancelChequeName ?? "",
    docs.fssaiName ?? "",
    data.discussionBrief ?? "",
    data.MHShareRevenue ?? "",
  ]
);
// console.log(result)

return { result };

 
}


async function updateEquipmentVisitDetails(data,files,docs,field_visit_id,ipAddress) {
  //const s_no = data.s_no;
  let drop = null;
  // console.log(data)
  // console.log(field_visit_id)

  if (typeof(data.nearHospital.near_hospital_name)==="string") {
     drop = data.nearHospital.near_hospital_name
  }
  else {
    // console.log(data.nearHospital)
     drop = data.nearHospital
  }
  // console.log("data111111",data,docNames)
 // let data = JSON.parse(fields.updateProperty);
 const result = await db.query(
  `UPDATE mh_fieldvisit_equipment_details SET equipment_name=?,address=?,pin_code=?,phone_number=?,email_id=?,near_hospital_name=?,other_hospital_name=?,owner_name=?,owner_mail=?,owner_phone_number=?,manager_name=?,manager_mail=?,manager_phone_number=?,	wheel_chairs=?,oxygen_cylinders=?,tripod_walking_stick=?,discussion_brief=?,mh_share_revenue=?,pan_card=?,gst=?,cancel_cheque=?, wheel_chair_pic=?, 	oxygen_cylinder_pic=?, tripod_walking_stick_pic =? WHERE field_visit_id='${field_visit_id}';`,
  [
    data.equipmentName ?? "",
    data.address ?? "",
    data.pincode ?? "",
    data.phoneNumber ?? "",
    data.emailId ?? "",
    drop ?? "",
    data.otherHospital ?? "",
    data.ownerName ?? "",
    data.ownerMail ?? "",
    data.ownerPhone ?? "",
    data.managerName ?? "",
    data.managerMail ?? "",
    data.managerPhone ?? "",
    data.wheelChair ?? "",
    data.oxygenCylinder ?? "",
    data.tripodWalkingStick ?? "",
    data.discussionBrief ?? "",
    data.MHShareRevenue ?? "",
    docs.panCardName ?? "",
    docs.gstName ?? "",
    docs.cancelChequeName ?? "",
    docs.whelChairName ?? "",
    docs.oxygenName ?? "",
    docs.tripodWalkingstickName ?? "",
  
    
  ]
);


return { result }
 
}



//Ravi kiran Query For Verify Accomadation Details by Staff
async function verifyAccomadationDetails(s_no) {
  //console.log('sno',s_no)

  const result = await db.query(
    `UPDATE mh_fieldvisit_accomodation_details SET visit_status="LISTED" WHERE s_no='${s_no}';`,

  );

  //const metaData = helper.emptyOrRows(result);
  // const dataWithIndex = result.map((item, index) => ({
  //   index: index + 1,
  //   ...item,
  // }));

  //console.log(dataWithIndex)
  return { result }
 
}


async function loadRoomCategoriesListTable(visitId){
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

//Ravi kiran query for deleting Particulat Price Row

async function deleteParticularRowDetails(field_visit_id,s_no) {
  
  // console.log(field_visit_id,s_no)
  const result = await db.query(
    `DELETE FROM mh_fieldvisit_accomadation_rates WHERE field_visit_id=? and s_no=?`,
    [field_visit_id,s_no]
  );

  

  return { result };
}

// Ravi kiran saving query for Hospital Field Visit
async function createHospitalVisitDetails(fields, files, docs, ipAddress) {
  
  let data = JSON.parse(fields.hosptial_fieldvisit_details);
  let ratesData = JSON.parse(fields.hosptial_fieldvisit_key_details);
  // console.log('data',data)
  // console.log('ratesData',ratesData)


  let month = moment(new Date()).format("MM");
    let year = moment(new Date()).format("YY");
    let FieldVisitId = await helper.generateMaxAarthiBookingId("mh_fieldvisit_hospital_details","s_no"); // Pass the column name as a string
    let mh_field_visit_id = FieldVisitId.toString().padStart(4, "0");
    let confirmFieldVisitId = `FSID${data.user_id}${data.city_id}${year}${month}${mh_field_visit_id}`;
    // console.log(confirmFieldVisitId)


  const result1 = await db.query(
    `INSERT IGNORE INTO mh_fieldvisit_hospital_details( user_id,user_name,employee_id,name,employee_location,city_id,field_visit_id,hospital_name,address,pincode,phone_number,email,key_person_name,key_person_mail,key_person_phone,manager_name,manager_mail,manager_phone,providing_accomadation,accomadation_name,outstation_flow,other_services,	third_party,third_party_name,asset,	hospital_image_1,	hospital_image_2,	hospital_image_3,discussion_brief,ip)VALUES
    (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.user_id ?? "",
      data.user_name ?? "",
      data.employee_id ?? "",
      data.employee_name ?? "",
      data.employee_location ?? "",
      data.city_id ?? "",
      confirmFieldVisitId ?? "",
      data.hospitalName ?? "",
      data.address ?? "",
      data.pincode ?? "",
      data.phoneNumber ?? "",
      data.emailId ?? "",
      data.keyPersonName ?? "",
      data.keyPersonMail ?? "",
      data.keyPersonPhone ?? "",
      data.managerName ?? "",
      data.managerMail ?? "",
      data.managerPhone ?? "",
      data.accomadation ?? "",
      data.accomadationName ?? "",
      data.outstationFlow ?? "",
      data.otherServices ?? "",
      data.thirdParty ?? "",
      data.thirdPartyName ?? "",
      data.asset ?? "",
      docs.upload_hospital_image_1_Name ?? "",
      docs.upload_hospital_image_2_Name ?? "",
      docs.upload_hospital_image_3_Name ?? "",
      data.discussionBrief ?? "",
      ipAddress,
      
     ]
   );

   for (let i = 0; i < ratesData.length; i++) {
    var result2 = await db.query(
      `INSERT IGNORE INTO mh_fieldvisit_hospital_dept_details( user_id,user_name,employee_id,name,employee_location,city_id,field_visit_id,key_type,doctor_name,speciality_name)VALUES
          (?,?,?,?,?,?,?,?,?,?)`,
          [
            ratesData[i].s_no ?? "",
            ratesData[i].user_name ?? "",
            ratesData[i].account_id ?? "",
            ratesData[i].name ?? "",
            ratesData[i].employee_location ?? "",
            ratesData[i].city ?? "",
            confirmFieldVisitId ?? "",
            ratesData[i].departmentType ?? "",
            ratesData[i].doctorName ?? "",
            ratesData[i].specialityName ?? "",
      
           ]
         );
  }

  
 return { result1,result2 };
}


//Ravi kiran GET Query for Hospital FIeld Visit
async function loadHospitalpartnerData(city, userName) {
  let index = 0;
  const rows = await db.query(`SELECT s_no,user_id, user_name, employee_id, name, employee_location, city_id,field_visit_id, hospital_name, address, pincode, phone_number, email, key_person_name, key_person_mail, key_person_phone, manager_name, manager_mail, manager_phone, providing_accomadation, accomadation_name, outstation_flow,other_services,third_party,third_party_name,asset,hospital_image_1,hospital_image_2,hospital_image_3,
  discussion_brief,visit_status,admin_status,inserted_date_time,updated_date_time,
    CONCAT(name,' - ', user_name) as concatenated_name FROM mh_fieldvisit_hospital_details WHERE employee_location = '${city}' and name = '${userName}' ORDER BY updated_date_time DESC; `);
  
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


//Ravi kiran Update query for Accomadation
async function updateHospitalVisitDetails(fields,value,docNames,visitId) {
 
  //console.log(visitId)

  //console.log(value)
  let data = JSON.parse(fields.update_hospital_details);
  //onsole.log('data',data)
   let ratesData = JSON.parse(fields.update_hospital_dept_details);
   
  // console.log('visit id',visitId)
  // console.log('docs',docNames)
  //console.log('rd',ratesData);
 

  

  const result1 = await db.query(
  `UPDATE mh_fieldvisit_hospital_details SET hospital_name=?,address=?,pincode=?,phone_number=?,email=?,key_person_name=?,key_person_mail=?,key_person_phone=?,manager_name=?,manager_mail=?,manager_phone=?,providing_accomadation=?,accomadation_name=?,outstation_flow=?,other_services=?,third_party=?,third_party_name=?,asset=?,discussion_brief=?,hospital_image_1=?,hospital_image_2=?,hospital_image_3=? WHERE field_visit_id='${visitId}';`,
  [
   
    data.hospitalName ?? "",
    data.address ?? "",
    data.pincode ?? "",
    data.phoneNumber ?? "",
    data.emailId ?? "",
    data.keyPersonName ?? "",
    data.keyPersonMail ?? "",
    data.keyPersonPhone ?? "",
    data.managerName ?? "",
    data.managerMail ?? "",
    data.managerPhone ?? "",
    data.accomadation ?? "",
    data.accomadationName ?? "",
    data.outstationFlow ?? "",
    data.otherServices ?? "",
    data.thirdParty ?? "",
    data.thirdPartyName ?? "",
    data.asset ?? "",
    data.discussionBrief ?? "",
    docNames.imageName1 ?? "",
    docNames.imageName2 ?? "",
    docNames.imageName3 ?? "",
    
  ]
);


for (let i = 0; i < ratesData.length; i++) {
  var result2 = await db.query(
    `INSERT IGNORE INTO mh_fieldvisit_hospital_dept_details(field_visit_id,user_id,user_name,employee_id,name,employee_location,city_id,key_type,doctor_name,speciality_name)VALUES
        (?,?,?,?,?,?,?,?,?,?)`,
        [
          ratesData[i].field_visit_id ?? "",
          ratesData[i].user_id ?? "",
          ratesData[i].user_name ?? "",
          ratesData[i].employee_id ?? "",
          ratesData[i].name ?? "",
          ratesData[i].employee_location ?? "",
          ratesData[i].city_id ?? "",
          ratesData[i].key_type ?? "",
          ratesData[i].doctor_name ?? "",
          ratesData[i].speciality_name ?? "",
    
         ]
       );
}


 return { result1,result2 }
 
}

//Ravi kiran Query for Departments Table
async function loadDepartmentsTable(visitId){
  //console.log(visitId)
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

//Ravi kiran query for deleting Particulatar Dept Details of Hospital Field Visit

async function deleteParticularRowDetailsForHospital(field_visit_id,s_no) {

  //console.log(field_visit_id,s_no)
  const result = await db.query(
    `DELETE FROM mh_fieldvisit_hospital_dept_details WHERE field_visit_id=? and s_no=?`,
    [field_visit_id,s_no]
  );

  

   return { result };
}

//Ravi kiran Query For Verify Hospital Field Visit Details by Staff
async function verifyHospitalDetails(s_no) {
  //console.log('sno',s_no)

 const result = await db.query(
  `UPDATE mh_fieldvisit_hospital_details SET visit_status="LISTED" WHERE s_no='${s_no}';`,

);

//const metaData = helper.emptyOrRows(result);
// const dataWithIndex = result.map((item, index) => ({
//   index: index + 1, 
//   ...item, 
// }));

//console.log(dataWithIndex)
 return { result }
 
}

async function verifyEquipmentDetails(s_no) {
  // console.log("verifying")
  const result = await db.query(
    `UPDATE mh_fieldvisit_equipment_details SET visit_status="LISTED"  WHERE s_no='${s_no}';`,
  );

  let message = "Error in Updating Visit Status";

  if (result.affectedRows) {
    message = "Visit Status Updated successfully";
  }

  // console.log("finalREsult",result)
  return { message };
}



 
async function verifyTravelVisitDetails(s_no) {
  // console.log("verifying")
  const result = await db.query(
    `UPDATE mh_fieldvisit_travel_details SET visit_status="LISTED"  WHERE s_no='${s_no}';`,
  );

  let message = "Error in Updating Visit Status";

  if (result.affectedRows) {
    message = "Visit Status Updated successfully";
  }

  // console.log("finalREsult",result)
  return { message };
}

// Ravi kiran saving query for Agent Field Visit
async function createAgentDetails(fields, files, docs, ipAddress) {
  
  let data = JSON.parse(fields.agent_details);

  // console.log('data',data)
  // console.log('docs',docs)
  


  let month = moment(new Date()).format("MM");
    let year = moment(new Date()).format("YY");
    let FieldVisitId = await helper.generateMaxAarthiBookingId("mh_fieldvisit_agent_details","s_no"); // Pass the column name as a string
    let mh_field_visit_id = FieldVisitId.toString().padStart(4, "0");
    let confirmFieldVisitId = `FSID${data.user_id}${data.city_id}${year}${month}${mh_field_visit_id}`;
  // console.log(confirmFieldVisitId)


  const result = await db.query(
    `INSERT IGNORE INTO mh_fieldvisit_agent_details( user_id,user_name,employee_id,name,employee_location,city_id,field_visit_id,agent_name,country_code,phone_number,address,pin_code,email_id,official_id_type,govt_card_num,bank_details_type,upi_id,bank_account_num,bank_name,branch_name,ifsc_code,pan_card_image,passport_image,cancel_cheque_image,license_image,referral_hospital_name,ip)VALUES
    (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.user_id ?? "",
      data.user_name ?? "",
      data.employee_id ?? "",
      data.employee_name ?? "",
      data.employee_location ?? "",
      data.city_id ?? "",
      confirmFieldVisitId ?? "",
      data.first_name ?? "",
      data.country_code ?? "",
      data.mobile_no ?? "",
      data.address ?? "",
      data.pin_code ?? "",
      data.email_id ?? "",
      data.govtno ?? "",
      data.govtcardno ?? "",
      data.bankDetails ?? "",
      data.upi_id ?? "",
      data.bankAccountNo ?? "",
      data.bankName ?? "",
      data.branchName ?? "",
      data.ifsc ?? "",
      docs.upload_pan_card_name ?? "",
      docs.upload_passport_name ?? "",
      docs.upload_cancel_cheque_name ?? "",
      docs.upload_driving_license_name ?? "",
      data.nearest_hospital ?? "",
      ipAddress,
     ]
   );


  
return { result };
}

//Ravi kiran GET Query for Hospital FIeld Visit
async function loadAgentPartnerVisitDetails(city, userName) {
  let index = 0;
  const rows = await db.query(`SELECT s_no,user_id, user_name, employee_id, name, employee_location, city_id,field_visit_id, agent_name, address, pin_code, phone_number, email_id,official_id_type,govt_card_num,bank_details_type,upi_id,bank_account_num,bank_name,branch_name,ifsc_code,referral_hospital_name,pan_card_image,passport_image,license_image,cancel_cheque_image,inserted_date_time,updated_date_time,visit_status,admin_status,
    CONCAT(name,' - ', user_name) as concatenated_name FROM mh_fieldvisit_agent_details WHERE employee_location = '${city}' and name = '${userName}' ORDER BY updated_date_time DESC; `);
  
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

async function loadFoodPartnerData(city) {  
  const rows = await db.query(`SELECT s_no,employee_id,concat(name,"-",user_name) AS concatenated_name, employee_location,user_id,city_id,restaurant_name,address,pincode,phone_number,email_id,near_hospital_name,other_hospital_name,owner_name,owner_mail,owner_phone_number,manager_name,manager_mail,manager_phone_number,item1,item2,item3,pan_card,gst,cancel_cheque,fssai_certificate,discussion_brief,mh_share_revenue,ip,visit_status,remarks,admin_status,inserted_date_time,updated_date_time from mh_fieldvisit_food_details WHERE employee_location = '${city}' ORDER BY updated_date_time DESC;`);
  const data = helper.emptyOrRows(rows);
  // console.log('bangloredata',data)

let index=0
  const dataWithIndex =data.map((item,index)=>({
    index:index + 1,
    ...item,
  }));
  // console.log('indexdata',dataWithIndex)
 return {
    data:dataWithIndex,
  };
}


module.exports = {
  getMultiple,
  getSingleParentTypeDetail,
  create,
  update,
  remove,
  createPropretyReg,
  getMultiplePropertyDetails,
  getStatusCount,
  getPropertyDataOnStatus,
  getPropertyData,
  exsistingUserCreate,
  existingUserProperty,
  createRoomDetails,
  createPropertyDetails,
  getRoomsData,
  updatePropertyData,
  getpropertyReg,
  getPropertyDataForAdmin,
  approveAccPartnersData,
  approveAccPropertyData,
  rejectAccPartnersData,
  gethotelData,
  updateRoomsData,
  getHotelInfo,
  getHotelsNames,
  getDateAvailability,
  updateRoomStatus,
  // saveRoomStatusData,
  saveRoomAvailData,
  getRoomsDataForAdmin,
  getAllRoomAvailCountDates,
  createTravelDetails,
  createAccFood,
  createAccMedical,
  getAccFoodDetails,
  accFoodUpdate,
  loadAccTravel,
  accTravelUpdating,
  getAccMedical,
  accUpdatingmedical,
  getaccomodationdetails,
  getfoodHotelInfo,
  gettravelHotelInfo,
  getmedicalHotelInfo,
  createRestaurantDetails,
  getRestaurantDetails,
  updateRestaurantDetails,
  approveAccRoomData,
  rejectAccRoomData,
  updateRoomdataSaving,
  getupdateroomDetails,
  updatePropertyoperationroomDetails,
  getroomsavailabilitiespricestable,
  updateRoomPriceAndAvaliabilityData,
  getBookingUpcomingForPartner,
  updatingFoodPriceForm,
  createAccomadationVisitDetails,
  createTravelVisitDetails,
  createFoodVisitDetails,
  createEquipmentVisitDetails,
  updateAccomadationVisitDetails,
  updateTravelVisitDetails,
  updateFoodVisitDetails,
  updateEquipmentVisitDetails,
  verifyAccomadationDetails,
  loadRoomCategoriesListTable,
  deleteParticularRowDetails,
  createHospitalVisitDetails,
  loadHospitalpartnerData,
  updateHospitalVisitDetails,
  loadDepartmentsTable,
  deleteParticularRowDetailsForHospital,
  verifyHospitalDetails,
  createAgentDetails,
  loadAgentPartnerVisitDetails,
  loadFoodPartnerData,
  verifyTravelVisitDetails,
  verifyEquipmentDetails,
  
};
