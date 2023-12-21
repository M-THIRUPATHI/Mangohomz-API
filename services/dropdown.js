const db = require("./db");
const helper = require("../helper");


async function getProperty() {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    "SELECT property_code,property_type FROM mht_hotels_property_types WHERE 1"
  );
  const data = helper.emptyOrRows(rows);
  //   const meta = { page };

  return {
    data,
  };
}
async function getJsonData() {
  const rows = await db.query("SELECT * FROM `testJsontable` ");
  const data = helper.emptyOrRows(rows);
  // let json_data = data[0].json_data
  //   const meta = { page };

  return {
    data,
  };
}
async function saveJsonTable() {
  let qualityControlLabEquipment = {
    AnalyticalWeighingBalance: false,
    HotAirOven: false,
    Refrigerator: false,
    pHmeter: false,
    Spectrophotometer: false,
    hpcl: false,
    StandardGlassware: false,
    SieveShaker: false,
    fumeHood: false,
    distilledWaterStill: false,
    meltingPointApparatus: false,
    glc: false,
    anyOtherEquipment: false,
  };
  let json_data = JSON.stringify(qualityControlLabEquipment);
  let sql = `INSERT IGNORE INTO testJsontable 
      (json_data) 
      VALUES  ('${json_data}') `;
  const result = await db.query(sql);
  let message = "Error in Facility Type Master";

  if (result.affectedRows) {
    message = "Facility Type Master submitted successfully";
  }

  return { message };
}
async function loadPartnerNames(accountID) {
  const rows = await db.query(
    `SELECT partner_id, agent_name FROM mh_property_master WHERE account_id='${accountID}' GROUP BY agent_name`
  );
  const data = helper.emptyOrRows(rows);
  return { data };
}


async function loadAllgst() {
  const rows = await db.query(
    `SELECT  sno,type, gst_value FROM gst_master WHERE type='room' ORDER BY gst_value `
  );
  const data = helper.emptyOrRows(rows);
 return {
    data,
  };
}
async function loadSubPartnerNames(accountID) {
  const rows = await db.query(
    `SELECT partner_sub_id, agent_sub_name, building_no, street, land_mark, city, state, country, pin_code FROM mh_property_master WHERE account_id='${accountID}'`
  );
  const data = helper.emptyOrRows(rows);
  return { data };
}
async function loadPropertyNames(accountID, partnerSubID) {
  const rows = await db.query(
    `SELECT txn_id, sub_property_name FROM mh_property_details_table WHERE account_id='${accountID}' AND partner_sub_id='${partnerSubID}'`
  );
  const data = helper.emptyOrRows(rows);
  return { data };
}
// change method//
async function loadPropertiesforadmin() {
  const rows = await db.query(
    `SELECT txn_id, sub_property_name FROM  mh_property_details_table WHERE property_status !='Pending' ORDER BY sub_property_name`
    // `SELECT txn_id, sub_property_name,account_id FROM mh_property_details_table WHERE property_status !='Pending' AND account_id IN (select account_id FROM mh_bookings_table WHERE inserted_date_time > '2023-03-15' AND booking_status != 'Pending' ) ORDER BY sub_property_name`
  );
  const data = helper.emptyOrRows(rows);
  return { data };
}
async function loadfoodProperties(accountID, partnerID) {
  const rows = await db.query(
    `SELECT partner_id,partner_sub_id,txn_id, sub_property_name FROM mh_property_details_table WHERE account_id='${accountID}' AND partner_id='${partnerID}'`
  );
  const data = helper.emptyOrRows(rows);
  return { data };
}

async function loadTravelproperties(accountID, partnerID) {
  const rows = await db.query(
    `SELECT partner_id,partner_sub_id,txn_id, sub_property_name FROM mh_property_details_table WHERE account_id='${accountID}' AND partner_id='${partnerID}'`
  );
  const data = helper.emptyOrRows(rows);
  return { data };
}

async function loadEquipmentProperties(accountID, partnerID) {
  const rows = await db.query(
    `SELECT partner_id,partner_sub_id,txn_id, sub_property_name FROM mh_property_details_table WHERE account_id='${accountID}' AND partner_id='${partnerID}'`
  );
  const data = helper.emptyOrRows(rows);
  return { data };
}
async function loadrestaurantDetails(accountID, partnerID) {
  // console.log("");
  const rows = await db.query(
    `SELECT txn_id,agent_id,account_id,name_of_kitchen,type_of_kitchen,fssai_no FROM mh_restaurant_details_table WHERE account_id='${accountID}' AND agent_id='${partnerID}' GROUP BY agent_sub_id`
  );
  const data = helper.emptyOrRows(rows);
  return {data} ;
}
async function loadFoodrestaurantDetails(accountID, partnerID) {
  const rows = await db.query(
    `SELECT txn_id,agent_id,account_id,name_of_kitchen,type_of_kitchen,fssai_no FROM mh_restaurant_details_table WHERE account_id='${accountID}' AND agent_id='${partnerID}' GROUP BY agent_sub_id`
  );
  const data = helper.emptyOrRows(rows);
  return {data} ;
}
async function loadTravelrestaurantDetails(accountID, partnerID) {
  const rows = await db.query(
    `SELECT txn_id,agent_id,account_id,name_of_kitchen,type_of_kitchen,fssai_no FROM mh_restaurant_details_table WHERE account_id='${accountID}' AND agent_id='${partnerID}' GROUP BY agent_sub_id`
  );
  const data = helper.emptyOrRows(rows);
  return {data} ;
}
async function loadMedicalrestaurantDetails(accountID, partnerID) {
  const rows = await db.query(
    `SELECT txn_id,agent_id,account_id,name_of_kitchen,type_of_kitchen,fssai_no FROM mh_restaurant_details_table WHERE account_id='${accountID}' AND agent_id='${partnerID}' GROUP BY agent_sub_id`
  );
  const data = helper.emptyOrRows(rows);
  return {data} ;
}
async function loadFoodSubPartnerNames(accountID, partnerID) {
  const rows = await db.query(
    `SELECT partner_sub_id, agent_sub_name, building_no, street, land_mark, city, state, country, pin_code FROM mh_property_master WHERE account_id='${accountID}' AND partner_id='${partnerID}'`
  );
  const data = helper.emptyOrRows(rows);
  // console.log("loadFoodSubPartnerNames",data);
  return { data };
}
async function loadFoodPropertyNames(accountID, agentID, agentSubID) {
  const rows = await db.query(
    `SELECT txn_id, sub_property_name FROM mh_property_details_table WHERE account_id='${accountID}' AND partner_id='${agentID}' AND partner_sub_id='${agentSubID}'`
  );
  const data = helper.emptyOrRows(rows);
  // console.log("loadFoodPropertyNames",data);
  return { data };
}




async function getPropertyDetailsForoperation(
  account_id,
  property_txn_id,
  partner_sub_id
) {
  const rows = await db.query(
    `SELECT account_id,txn_id,property_txn_id,partner_id,partner_sub_id,sub_property_name,room_type,room_category, date_format(date_from,"%d-%m-%Y") as date_from, date_format(date_to,"%d-%m-%Y") as date_to,facilities, max_allow_adult,max_allow_kids,gst_per,	withac_withbreakfast_price,withac_withoutbreakfast_price,	withoutac_withbreakfast_price,withoutac_withoutbreakfast_price	,units,property_specialOffer,status,room_image_1,(SELECT COUNT(*) FROM mh_property_rooms_table WHERE partner_sub_id='${partner_sub_id}') AS chandu FROM mh_property_rooms_table WHERE account_id='${account_id}' && property_txn_id='${property_txn_id}'  && partner_sub_id='${partner_sub_id}';`
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
        `SELECT amenity_name, amenity_icon FROM mh_property_details_table WHERE account_id='${account_id}' AND txn_id='${property_txn_id}' AND partner_sub_id='${partner_sub_id}';`
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
async function getAllProblemDetails() {
  const rows = await db.query(
    `SELECT sno, disease_id, disease_type, disease_name, status, ip_address 
FROM mh_disease_types 
WHERE disease_type IN ('Heart','Liver','Kidney','Brain','Digestive','Respiratory')`

  );
  const data = helper.emptyOrRows(rows);
 return {
    data,
  };
}
async function getpropertydetailsforoffers(city_id) {
  const rows = await db.query(
    `SELECT txn_id, account_id, partner_id, partner_sub_id, partner_name, sub_partner_name, partner_phone, property_id, property_name, sub_property_name, property_phone, property_email, property_description, property_latitude, property_longitude, building_no, street, land_mark, country, state_id, state_name, city_id, city_name, pin_code, amenity_name, amenity_icon, checkIn_time, checkOut_time, Name_Of_Contact_Person, upload_image, upload_image1, upload_image2, upload_image3, upload_image4, remarks, property_status, ip_address, bankAccountNo, bankName, branchName, ifsc, cancelled_cheque_doc, mh_agreement, mh_declaration, mh_bankmandate, mh_gstin, mh_offer_status, mh_service_fee, property_gstin FROM mh_property_details_table WHERE city_id='${city_id}'`
  );
  const data = helper.emptyOrRows(rows);
  // console.log(data);
  return data;
}

async function getpropertyroomtype(txn_id,partner_id) {
  const rows = await db.query(
    `SELECT sno, txn_id, account_id, property_txn_id, partner_id, partner_name, partner_sub_id, sub_partner_name, property_name, sub_property_name, facilities, icon_image, other_amenities, no_of_avail_rooms, room_type, room_numbers, price, units, room_category, date_from, date_to, select_offer, partner_specialOffer, property_specialOffer, enter_amount, mh_offer, ac_nonac, max_allow_adult, max_allow_kids, gst_per, withac_withbreakfast_price, withac_withoutbreakfast_price, withoutac_withbreakfast_price, withoutac_withoutbreakfast_price, room_image_1, room_image_2, room_image_3, room_image_4, room_image_5, status, ip_address, room_status, remarks, property_address, created_date_time FROM mh_property_rooms_table WHERE property_txn_id='${txn_id}' AND partner_id='${partner_id}'`
  );
  const data = helper.emptyOrRows(rows);
  // console.log(data);
  return data;
}
async function getcategorywiseroominfo(txn_id,partner_id,room_category,room_type) {
  const rows = await db.query(
    `SELECT sno, txn_id, account_id, property_txn_id, partner_id, partner_name, partner_sub_id, sub_partner_name, property_name, sub_property_name, facilities, icon_image, other_amenities, no_of_avail_rooms, room_type, room_numbers, price, units, room_category, date_from, date_to, select_offer, partner_specialOffer, property_specialOffer, enter_amount, mh_offer, ac_nonac, max_allow_adult, max_allow_kids, gst_per, withac_withbreakfast_price, withac_withoutbreakfast_price, withoutac_withbreakfast_price, withoutac_withoutbreakfast_price, room_image_1, room_image_2, room_image_3, room_image_4, room_image_5, status, ip_address, room_status, remarks, property_address, created_date_time FROM mh_property_rooms_table WHERE property_txn_id='${txn_id}' AND partner_id='${partner_id}' AND room_category ='${room_category}'  AND room_type ='${room_type}'`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let mh_service_fee="";
  let agent_fee_on_property="";
  let index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      mh_service_fee= await helper.getMhService(
        element.account_id
      );

      agent_fee_on_property= await helper.getagentFeeonProperty(
        element.account_id,element.txn_id
      );
      index = index + 1;

      data.push({
        sno: index,
        mh_service_fee: mh_service_fee[0].mh_service_fee,
        agent_fee_on_property:agent_fee_on_property[0].agent_fee_on_property,
        ...element,
      });
      // console.log("data123",data)
    }
  }
  // console.log("data",data);
  return data;
}


//Hospital Master GET MEthod async Function
async function loadHospitalMasterDetails() {
  const rows = await db.query(
    `SELECT sno, near_hospital_id,near_hospital_name,locality,hospital_nick_name,city_seo_name,hospital_seo_name,type, latitude, longitude,distance_from_hospital,city_id, city,city_alias,state,address, pin_code, specialty, gmap_loc_link, no_of_bed,  hospital_link, ratings, status FROM mh_hospital_master  ORDER BY
    sno ASC `
  );
  const data = helper.emptyOrRows(rows);
  //   const meta = { page };
  //  console.log(data);
  return {
    data,
  };
}




async function loadVehicalTypeCategory() {
  const rows = await db.query(`SELECT txn_id,vehicle_name from mh_travel_location_table;`);
  const data = helper.emptyOrRows(rows);

  //console.log(data)
  return {
    data,
  };
}


async function loadVehiclePerTrip() {
  const rows = await db.query(`SELECT DISTINCT units from mh_travel_location_table;`);
  const data = helper.emptyOrRows(rows);

  //console.log(data)
  return {
    data,
  };
}

async function loadVehicleFromPlace(city) {
  //console.log('city',city)
  //console.log(city)
  const rows = await db.query(`SELECT DISTINCT point_type from travel_points_city_wise_master where city_name = '${city}';`);
  const data = helper.emptyOrRows(rows);

  //console.log(data)
  return {
    data,
  };
}

async function loadVehicleToPlace(city) {
  //console.log('city',city)
  //console.log(city)
  const rows = await db.query(`SELECT near_hospital_name from mh_hospital_master where city = '${city}';`);
  const data = helper.emptyOrRows(rows);

  //console.log(data)
  return {
    data,
  };
}

async function loadNearHospitalNames(city) {
  //console.log('city',city)
  //console.log(city)
  const rows = await db.query(`SELECT concat(near_hospital_name,"," , " ",locality) as near_hospital_name FROM mh_hospital_master where city = '${city}';`);
  const data = helper.emptyOrRows(rows);

  //console.log('data',data)
 return {
    data,
  };
}

//loadNearHospitalNames()

async function loadAccomadationpartnerData(city, userName) {
  let index = 0;
  const rows = await db.query(`SELECT s_no,user_id, user_name, employee_id, name, employee_location, city_id,field_visit_id, property_name, address, pin_code, phone_number, email_id, near_hospital_name, other_hospital_name, owner_name, owner_mail_id, owner_phone_number, manager_name, manager_mail_id, manager_phone_number, total_rooms, total_ac_rooms, total_non_ac_rooms,which_floor, distance_hospital, property_type, aggregator, aggregator_name, check_in_time, check_out_time, location, parking, lift, cctv, ramp, restaurant, self_kitchen, tv, wifi, hot_water, fridge, discussion_breif, mh_share_revenue, pan_card, gst, cancel_cheque, facade, facade2, lobby1, lobby2, restaurant_pic, self_kitchen_pic, room1, room1_bathroom, room2, room2_bathroom, room3, room3_bathroom,visit_status,admin_status,inserted_date_time,updated_date_time,
    CONCAT(name,' - ', user_name) as concatenated_name FROM mh_fieldvisit_accomodation_details WHERE employee_location = '${city}' and name = '${userName}' ORDER BY updated_date_time DESC; `);
  
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

async function loadTravelPartnerData(city) {  

  let index = 0;
  const rows = await db.query(`SELECT s_no,field_visit_id,user_id,city_id,employee_id, concat(name,"  -  ",user_name) as names, name, user_name,employee_location,travel_agency_name,address,pin_code,phone_number,email_id,near_hospital_name,other_hospital_name,owner_name,owner_mail,owner_phone_number,manager_name,manager_mail,manager_phone_number,total_vehicles,five_seaters,seven_seaters,discussion_brief,mh_share_revenue,pan_card,gst,cancel_cheque,ip,inserted_date_time,updated_date_time,visit_status,admin_status  FROM mh_fieldvisit_travel_details ORDER BY updated_date_time DESC;`);  
  const data = helper.emptyOrRows(rows);
  const dataWithIndex = data.map((item, index) => ({
    index: index + 1, 
    ...item, 
  }));


//  console.log('data',dataWithIndex)
 return {
    data: dataWithIndex
  };
}

async function loadFoodPartnerData(city) {  
  const rows = await db.query(`SELECT * from mh_fieldvisit_food_details WHERE employee_location = '${city}'; `);
  const data = helper.emptyOrRows(rows);

  //console.log('data',data)
 return {
    data,
  };
}

async function loadEquipmentPartnerData(city) {  
  const rows = await db.query(`SELECT s_no,field_visit_id,employee_id, employee_location,user_id,city_id,equipment_name,name,user_name,concat(name," - ",user_name) as names,address,pin_code,phone_number,email_id,near_hospital_name,other_hospital_name,owner_name,owner_mail,owner_phone_number,manager_name,manager_mail,manager_phone_number,pan_card,gst,cancel_cheque,wheel_chairs,oxygen_cylinders,tripod_walking_stick,wheel_chair_pic,oxygen_cylinder_pic,tripod_walking_stick_pic,discussion_brief,mh_share_revenue,ip,visit_status,remarks,admin_status,inserted_date_time,updated_date_time  from mh_fieldvisit_equipment_details WHERE employee_location = '${city}' ORDER BY updated_date_time DESC;`);
  const data = helper.emptyOrRows(rows);
  const dataWithIndex = data.map((item, index) => ({
    index: index + 1, 
    ...item, 
  }));

  //  console.log('data',data)
 return {
  data: dataWithIndex
  };
}
    

//Ravi kiran query for get room categories
async function loadRoomCategories() {
  //console.log('city',city)
  //console.log(city)
  const rows = await db.query(`SELECT DISTINCT room_category FROM mh_room_category;`);
  const data = helper.emptyOrRows(rows);

  //console.log('data',data)
  return {
    data,
  };
}



module.exports = {
  getProperty,
  saveJsonTable,
  getJsonData,
  loadPartnerNames,
  loadSubPartnerNames,
  loadPropertyNames,
  loadfoodProperties,
  loadTravelproperties,
  loadEquipmentProperties,
  loadrestaurantDetails,
  loadFoodrestaurantDetails,
  loadTravelrestaurantDetails,
  loadMedicalrestaurantDetails,
  loadFoodSubPartnerNames,
  loadFoodPropertyNames,
  loadAllgst,
  getPropertyDetailsForoperation,
  getAllProblemDetails,
  loadPropertiesforadmin,
  getpropertydetailsforoffers,
  getpropertyroomtype,
  getcategorywiseroominfo,
  loadHospitalMasterDetails,
  loadVehicalTypeCategory,
  loadVehiclePerTrip,
  loadVehicleFromPlace,
  loadVehicleToPlace,
  loadNearHospitalNames,
  loadAccomadationpartnerData,
  loadTravelPartnerData, 
  loadFoodPartnerData,
  loadEquipmentPartnerData,
  loadRoomCategories,

};
