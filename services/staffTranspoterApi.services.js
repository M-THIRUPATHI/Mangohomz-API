const db = require("./db");
const helper = require("../helper");

async function getStaffTravelData(params) {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM mh_transport_master GROUP BY agent_id`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  var index =0;
  //   const meta = { page };
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      var transport_count = "";
      if(element.agent_id){
        transport_count = await helper.getCountOfTransportId(element.agent_id)
        index = index+1;
      };
      data.push({
        transport_count: transport_count,
        index:index,
        ...element
      });
    }
  }
  return {
    data,
  };
}
async function getTravelLocation(agent_id, transport_sub_id) {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT txn_id,agent_id,account_id, transport_sub_id,account_id, travel_name, transport_sub_name,city_id,city, 
    vehicle_name,day_price,night_price,no_of_seaters,units, description,special_offer,vehicle_image,travel_status FROM mh_travel_location_table WHERE 
    agent_id=${agent_id} && transport_sub_id=${transport_sub_id}`
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
async function getStatusCount() {
    const rows = await db.query(
      `SELECT (SELECT COUNT(*) FROM mh_transport_master WHERE status='pending') AS pcount,(SELECT COUNT(*) FROM mh_transport_master WHERE status='approved') AS acount,(SELECT COUNT(*) FROM mh_transport_master WHERE status='verified') AS vcount,(SELECT COUNT(*) FROM mh_transport_master WHERE status='rejected') AS rcount FROM mh_transport_master GROUP BY status;`
    );
    const data = helper.emptyOrRows(rows);
    return {
      data,
    };
  }
async function getSingleParentTypeDetail(id) {
  const rows = await db.query(
    `SELECT  id,property_name,phone,email,registration_number FROM mht_hotels WHERE property_id=?`,
    [id]
  );
  const data = helper.emptyOrRows(rows);
  //   const meta = { page };
  return data;
}
async function createTravelDetails(fields, files, docs,ipAddress) {
  //let transportSubId = await helper.generateTransportSUBID();
  let data = JSON.parse(fields.travelLocation);
  const result = await db.query(
    `INSERT IGNORE INTO mh_travel_location_table( agent_id, transport_sub_id,account_id,travel_name,transport_sub_name,city_id,city,vehicle_name,no_of_seaters, day_price,night_price, units,description, vehicle_image,travel_status,ip_address)
    VALUES
    (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [      
      data.agent_id ?? "",
      data.transport_sub_id ?? "",      
      data.account_id ?? "",
      data.agent_name ?? "",
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
};
async function create(fields, files, docs,ipAddress) {
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
async function getTransportDataOnStatus(params) {
  const rows = await db.query(
    `SELECT agent_id,transport_sub_id,transport_sub_name,agent_name, company_name,individual_name, phone, fax, status, email_id, description, building_no, street, land_mark, city, city_id, country, state, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, cancelled_cheque, accept,pan_loc,addhaar_loc,gst_tin_loc,mh_agreement_loc,partner_pic_loc,mb_certificate_loc FROM mh_transport_master WHERE status='${params}'`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      var transport_count = "";
      if(element.agent_id){
        transport_count = await helper.getCountOfTransportId(element.agent_id)
      };
      data.push({
        transport_count: transport_count,
        ...element
      });
    }
  }
  return {
    data,
  };
};
async function createTransportExistingUser(fields, files, docs,ipAddress) {
  let data = JSON.parse(fields.transportPartnerForm);
 let transportSubId = await helper.generateTransportSUBID();
 
  const result = await db.query(`INSERT IGNORE INTO mh_transport_master(transport_sub_id,transport_sub_name,agent_name,company_name,individual_name,phone,fax,email_id,description,building_no,street,land_mark,city,city_id,country,state,pin_code,pan,aadhar,gstin,bankAccountNo,bankName,branchName,ifsc,accept,pan_loc,addhaar_loc,gst_tin_loc,mh_agreement_loc,undertaking_certificate,property_tax,fire_safety,cancelled_cheque,agent_id,account_id,ip_address)VALUES
  (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      transportSubId ?? "",
      data.name ?? "",
      data.agent_name ??"",
      data.company_name ??"",
      data.individual_name??"",
      data.phone ??"",
      data.fax ??"",
      data.email_id ??"",
      data.description ??"",
      data.building_no ??"",
      data.street ??"",
      data.land_mark ??"",
      data.city.city ??"",
      data.city.city_id ??"",
      data.country ??"",
      data.state.state_name ??"",
      data.pin_code ??"",
      data.pan ??"",
      data.aadhar ??"",
      data.gstin ??"",
      data.bankAccountNo ??"",
      data.bankName ??"",
      data.branchName ??"",
      data.ifsc ??"",
      data.accept ??"",
      docs.pan ??"",
      docs.addhaar??"",
      docs.gst ??"",
      docs.mh_agreement??"",
      docs.undertaking_certificate??"",
      docs.property_tax??"" ,
      docs.fire_safety ??"",
      docs.cancelled_cheque ??"" ,
      data.agent_id ??"",
      data.user_id ?? "",
      ipAddress
    ]);
  let message = "Error in Transport Registration Master";

  if (result.affectedRows) {
    message = "Transport Registration Master created successfully";
  }
  return { message };
};
async function transportExistingUser(params) {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM mh_transport_master WHERE agent_id='${params}'`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];

  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      var transport_count = "";
      if(element.agent_id){
        transport_count = await helper.getCountOfTransportId(element.agent_id)
      };
      data.push({
        transport_count: transport_count,
        ...element
      });
    }
  }
  return {
    data,
  };
}

async function updatetransportPartnerForm( agent_id, transport_sub_id, data,docs) {
  console.log("12356",data)
  console.log("docs",docs)

  // `agent_id`, `transport_sub_id`, `transport_sub_name`, `account_id`, `status`, `agent_name`, `company_name`, `individual_name`, `phone`, `fax`, `alternate_no`, `email_id`, `agent_commission`, `description`, `building_no`, `street`, `land_mark`, `city`, `city_id`, `country`, `state`, `pin_code`, `pan`, `aadhar`, `gstin`, `bankAccountNo`, `bankName`, `branchName`, `ifsc`, `cancelled_cheque`, `pan_loc`, `gst_tin_loc`, `addhaar_loc`, `mh_agreement_loc`, `partner_pic_loc`, `mb_certificate_loc`, `undertaking_certificate`, `property_tax`, `fire_safety`, `accept`, `remarks`, `created_datetime`, `updated_datetime`, `ip_address`


  const result = await db.query(
    `UPDATE mh_transport_master SET agent_id=?,transport_sub_id=?,transport_sub_name=?,account_id=?,agent_name=?,phone=?,fax=?,alternate_no=?,email_id=?,description=?,building_no=?,street=?,land_mark=?,city=?,city_id=?,country=?,state=?,pin_code=?,pan=?,aadhar=?,gstin=?,bankAccountNo=?,bankName=?,branchName=?,ifsc=?,cancelled_cheque=?,pan_loc=?,gst_tin_loc=?,addhaar_loc=?,mh_agreement_loc=?,mb_certificate_loc=?,property_tax=?,fire_safety=?,accept=? WHERE agent_id='${agent_id}' AND transport_sub_id='${transport_sub_id}'`,
    [
      
      data.agent_id?? "",
      data.transport_sub_id?? "",
      // prevName == prevSubName ? data.name : prevName,
      data.name?? "",
      // data.transport_sub_name?? "",
      data.user_id?? "",
      // data.status?? "",
      data.name?? "",
      data.phone?? "",
      data.fax?? "",
      data.alternate_no?? "",
      data.email_id?? "",
      // data.agent_commission?? "",
      data.description?? "",
      data.building_no?? "",
      data.street?? "",
      data.land_mark?? "",
      data.city.city ?? data.city,
      data.city.city_id ?? data.city_id,
      data.country?? "",
      data.state.state_name ?? data.state,
      // data.state.state_id ?? "",
      // data.city.city_id ?? "",
      data.pin_code?? "",
      data.pan ?? "",
      data.aadhar ?? "",
      data.gstin ?? "",
      data.bankAccountNo ?? "",
      data.bankName ?? "",
      data.branchName ?? "",
      data.ifsc?? "",
      docs.cancelledChequeName ?? "",
      docs.panCardName ?? "",
      docs.gstInName?? "",
      docs.addhaarName ?? "",
      docs.mhAgreementName ?? "",
      docs.mbCertificateName ?? "",
      docs.propertyTaxName?? "",
      docs.fireSafetyName ?? "",
      data.accept?? "",
      
    ]
  );
  
  // if (status == "pending") {
  //   const result2 = await db.query(
  //     `UPDATE mh_transport_master SET status="verified" WHERE agent_id='${agent_id}'`,
  //   );
  //   let message = "Error in updating Transport Registration Master";
  //   if (result2.affectedRows) {
  //     message = "Transport Registration Master updated successfully";
  //   }
  //   return { message };
  // }else{
  //   message = "Transport Registration Master updated successfully";
  // }

  let message = "Error in updating Transport Registration Master";

  if (result.affectedRows) {
    message = "Transport Registration Master updated successfully";
  }

  return { message };
}
async function updateTravelDetails(txn_id, agent_id, transport_sub_id, data,docNames) {
  console.log("updatinggggg",data);
  console.log("txn_id",txn_id);
  console.log("agent_id",agent_id);
  console.log("transport_sub_id",transport_sub_id);
  const result = await db.query(
    `UPDATE mh_travel_location_table SET  account_id=?,agent_id=?, transport_sub_id=?,travel_name=?, transport_sub_name=?,city_id=?,city=?,vehicle_name=?,day_price=?,night_price=?,units=?,description=?,no_of_seaters=?,vehicle_image=? WHERE txn_id='${txn_id}' AND agent_id='${agent_id}' AND transport_sub_id='${transport_sub_id}'`,
    [
      data.account_id ?? "",
      data.agent_id?? "",
      data.transport_sub_id?? "",
      data.agent_name?? "",
      data.transport_sub_name?? "",
      // data.vehicle_type,
      data.city_id?? "",
      data.city ?? "",
      data.vehicle_name ?? "",
      data.day_price ?? "",
      data.night_price ?? "",
      data.units ?? "",
      data.description ?? "",
      // data.special_offer,
      data.no_of_seaters ?? "",
      docNames.vehicle_imageName?? "",
      
    ]
  );
  let message = "Error in Travel Location  Registration";

  if (result.affectedRows) {
    message = "Travel Location  Registration updated successfully";
  }
  return { message };
};
async function remove(id) {
  const result = await db.query(
    `DELETE FROM mht_hotels WHERE property_id=?`,
    [id]
  );

  let message = "Error in deleting Transport Registration Master";

  if (result.affectedRows) {
    message = "Transport Registration Master deleted successfully";
  }

  return { message };
}
async function getTravelDetails(agent_id, transport_sub_id,travel_status) {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT txn_id, agent_id,account_id, transport_sub_id, travel_name, transport_sub_name,city_id,city,vehicle_name, day_price, night_price,units,no_of_seaters, description,vehicle_image,travel_status,status FROM mh_travel_location_table WHERE agent_id='${agent_id}' && transport_sub_id='${transport_sub_id}' && travel_status='${travel_status}'`
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
    console.log("gettravel",data);
    return {
    data,
    };
   }
   async function getTravelpartnerNames() {
    const rows = await db.query(
      `SELECT txn_id, agent_id,account_id, transport_sub_id, travel_name, transport_sub_name,city_id,city,vehicle_name, day_price,night_price,units,no_of_seaters, description,vehicle_image,status,travel_status FROM mh_travel_location_table WHERE travel_status="approved" GROUP BY agent_id; `
    );    const data = helper.emptyOrRows(rows);
    return {
      data,
    };
  }
  async function getSubTravelpartnerNames(agentId,travel_status) {
    const rows = await db.query(
      `SELECT txn_id, agent_id,account_id, transport_sub_id, travel_name, transport_sub_name,city_id,city,vehicle_name,day_price,night_price,units,no_of_seaters, description,vehicle_image,status,travel_status FROM mh_travel_location_table WHERE agent_id='${agentId}' && travel_status='${travel_status}' GROUP BY transport_sub_id;`
    );
    const data = helper.emptyOrRows(rows);
    return {
      data,
    };
    
  }
async function ledgertravelDetails(data) {
  var travelstatus = data.status == true ? "yes" : "no";
  const result = await db.query(
    `INSERT IGNORE INTO mh_travel_ledger_table(txn_id,agent_id, transport_sub_id,account_id, travel_name, transport_sub_name,city_id,city,vehicle_name,no_of_seaters, day_price,night_price,units, description, vehicle_image,travel_status,status)VALUES
    (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.txn_id ?? "",
      data.agent_id ?? "",
      data.transport_sub_id ?? "",
      data.account_id ?? "",
      data.travel_name ?? "",
      data.transport_sub_name ?? "",
      
      data.city_id ?? "",
      data.city ?? "",
      data.vehicle_name ?? "",
      data.no_of_seaters ?? "",
      data.day_price ?? "",
      data.night_price ?? "",
      data.units ?? "",
      data.description ?? "",
     
      data.vehicle_image ?? "",
      data.travel_status ?? "",
      travelstatus ?? "",
    ]
  );

  let message = "Error in Saving Travel Details";

  if (result.affectedRows) {
    message = "Travel Details created successfully";
  }
  return { message };
}
async function loadTravelStatus(agent_id, transport_sub_id, txn_id, data) {
  var travelstatus = data.status == true ? 'yes' : 'no';
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
async function getMultiple(params) {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT agent_id,agent_name, transport_sub_name,transport_sub_id,company_name,individual_name,phone, fax,alternate_no, email_id, description, building_no, street, land_mark, city,city_id, country, state, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, cancelled_cheque, accept,pan_loc,addhaar_loc,gst_tin_loc,mh_agreement_loc,partner_pic_loc,mb_certificate_loc,status,undertaking_certificate,property_tax,fire_safety,concat(building_no,",",street,"," ,state,"," ,city,"," ,country) as address,concat(state,"," ,city) as location FROM mh_transport_master GROUP BY transport_sub_id`
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
  // console.log("rrrr",data)
  return {
    data,
  };
}
async function getTrasportDetails( agent_id, transport_sub_id) {
  
  // console.log("agent_id",agent_id);
  // console.log("transport_sub_id",transport_sub_id);

  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT  tnx_id,agent_id, transport_sub_id, account_id, transport_sub_name, agent_name, transport_company_name, special_offer,enter_amount,select_offer,  from_date,to_date,transport_phone, transport_email_id, Name_Of_Contact_Person, transport_description, building_no, street, land_mark,country, city, state, pin_code, transport_latitude, transport_longitude, upload_image1, upload_image2, ip_address  FROM mh_transport_details WHERE   
     agent_id='${agent_id}' && transport_sub_id='${transport_sub_id}'`
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
//  console.log("data",data);
  
  return {
    data,
  };
}
async function updateTransportDetails(
  agent_id,
  transport_sub_id,
  tnx_id,
  data,
  docNames
) {
  //console.log("updatedata",docNames);
  const result = await db.query(
    `UPDATE mh_transport_details SET agent_id=?, transport_sub_id=?, account_id=?, transport_sub_name=?, agent_name=?, transport_company_name=?, special_offer=?,select_offer=?, enter_amount=?,from_date=?,to_date=?, transport_phone=?, transport_email_id=?, Name_Of_Contact_Person=?, transport_description=?, building_no=?, street=?, land_mark=?,country=?, city=?,city_id=?, state=?,state_id=?, pin_code=?, transport_latitude=?, transport_longitude=?,upload_image1=?,upload_image2=?,ip_address=?  WHERE   
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
      data.city.city_id ?? "",
      data.state.state_name?? "",
      data.state.state_id ?? "",
      data.pin_code ?? "",
      data.transport_latitude ?? "",
      data.transport_longitude ?? "",
      docNames.upload_image1Name ?? "",
      docNames.upload_image2Name ?? "",
      data.ip_address ?? "",
    ]
  );

  let message = "Error in updating Transport Details";

  if (result.affectedRows) {
    message = "Transport Details updated successfully";
  }
  return { message };
}
async function getTransportAllDisplayForStaff(status) {
  console.log("status",status);
  let eq = "";
  if (status != "ALL") {
    eq = " AND status = " + "'" + status + "' ";
  }
  let qry =
    "SELECT  agent_id,transport_sub_id,transport_sub_name,agent_name, company_name,individual_name, phone, fax, status, email_id, description, building_no, street, land_mark, city, city_id, country, state, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, cancelled_cheque, accept,pan_loc,addhaar_loc,gst_tin_loc,mh_agreement_loc,partner_pic_loc,mb_certificate_loc FROM mh_transport_master WHERE 1 " +
    eq +
    "  ORDER BY agent_id  ASC";
  //console.log('qry',qry);
  const rows = await db.query(qry);
  const result = helper.emptyOrRows(rows);
  let data = [];
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      var transport_count = "";
      if(element.agent_id){
        transport_count = await helper.getCountOfTransportId(element.agent_id)
      };
      data.push({
        transport_count: transport_count,
        ...element
      });
    }
  }
  return data;
  
}


module.exports = {
    getStaffTravelData,
    getStatusCount,
    getSingleParentTypeDetail,
    create,
    
    remove,
    getTransportDataOnStatus,
    transportExistingUser,
    createTransportExistingUser,
    // saveTravelLoc,
    createTravelDetails,
    getTravelLocation,
    updateTravelDetails,
    getTravelDetails,
    getTravelpartnerNames,
    getSubTravelpartnerNames,
    ledgertravelDetails,
    loadTravelStatus,
    getMultiple,
    updatetransportPartnerForm,
    getTrasportDetails,
    updateTransportDetails,
    getTransportAllDisplayForStaff,
    
    // test_create,
};
