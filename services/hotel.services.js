const db = require("./db");
const helper = require("../helper");
const { parse } = require("dotenv");

async function getHotelsDetailsBySearch(cityId,lat,long) {
  const rows = await db.query(
    `SELECT txn_id, partner_id, partner_sub_id, partner_name, sub_partner_name, partner_phone, property_name, sub_property_name, property_phone, property_email,property_alternate_email,property_description, property_latitude, property_longitude,building_no, street,concat(building_no,",",street,"," ,land_mark) as address, land_mark, country, state_id, state_name,amenity_name,amenity_icon, city_id, city_name, pin_code, checkIn_time, checkOut_time, upload_image,upload_image1,upload_image2,upload_image3,upload_image4,mh_offer_status FROM mh_property_details_table WHERE property_status= 'Approved' AND city_id='${cityId}' ORDER BY property_latitude ASC`
  );
  
  const result = helper.emptyOrRows(rows);
  //   const meta = { page };
  let data = [];
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      var latitude = Math.abs(parseFloat(lat)-parseFloat(element.property_latitude));
      var longitude = Math.abs(parseFloat(long)-parseFloat(element.property_longitude));

      var R = 6371; // km
      var dLat = parseFloat(latitude * Math.PI / 180);
      var dLon = parseFloat(longitude * Math.PI / 180);
      var lat1 = parseFloat(lat *  Math.PI / 180);
      var lat2 = parseFloat(element.property_latitude *  Math.PI / 180);

      var a = parseFloat(Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2)); 
      var c = parseFloat(2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))); 
      var kilo_meter = parseFloat(R * c).toFixed(2); 

      var price = "";
      var property_specialOffer ="";
      var gst_per ="";
      var partner_specialOffer ="";
         // price = await helper.getRoomDetails(
      //  element.txn_id
      // );
      price = await helper.getRoomDetails(
        element.partner_id,element.partner_sub_id,element.txn_id
      );
      property_specialOffer = await helper.getRoomSpecialOfferDetails(
        element.partner_id,element.partner_sub_id,element.txn_id
      );
      gst_per = await helper.getgstetails(
        element.partner_id,element.partner_sub_id,element.txn_id
      );
      partner_specialOffer = await helper.getpartneSpecialOffer(
        element.partner_id,element.partner_sub_id,element.txn_id
      );
      var units = "";

      units = await helper.getRoomUnits(
        element.partner_id,element.partner_sub_id,element.txn_id
      );
      var no_of_avail_rooms = "";

      no_of_avail_rooms = await helper.getnoOfAvalableRoomMdetails(
        element.partner_id,element.partner_sub_id,element.txn_id
      );
      var max_allow_adult = "";

      max_allow_adult = await helper.getMaximumAdultAllowdetails(
        element.partner_id,element.partner_sub_id,element.txn_id
      );
      var max_allow_kids = "";

      max_allow_kids = await helper.getMaximumKidsAllowdetails(
        element.partner_id,element.partner_sub_id,element.txn_id
      );
      room_type_priority = await helper.getroomTypePrioritydetails(
        element.partner_id,element.partner_sub_id,element.txn_id
      );

      data.push({
        kilo_meter: kilo_meter,
        price: price,
        units: units,
        property_specialOffer:property_specialOffer,
        gst_per:gst_per,
        partner_specialOffer:partner_specialOffer,
        no_of_avail_rooms:no_of_avail_rooms,
        max_allow_adult:max_allow_adult,
        max_allow_kids:max_allow_kids,
        room_type_priority:room_type_priority,
       
        
        ...element
      });     
// console.log("ffff",data)
    }
  }
  for(let i = 0; i < data.length; i++) {
    var test_string = data[i].amenity_name;
    var temp = new Array();
    temp = test_string.split(",")
  
    data[i].amenity_name = temp
  }
  for(let i = 0; i < data.length; i++) {
    var test_string = data[i].amenity_icon;
    var temp = new Array();
    temp = test_string.split(",")
  
    data[i].amenity_icon = temp
  }
  const sorted = data.sort((a, b) => a.kilo_meter - b.kilo_meter)
  return sorted;
}
async function getHotelFullInfo(partner_id, partner_sub_id,txn_id) {
  const rows = await db.query(
    `SELECT txn_id, account_id, property_txn_id, partner_id, partner_name, partner_sub_id, sub_partner_name, property_name, sub_property_name, facilities, icon_image, other_amenities, no_of_avail_rooms, room_type,room_type_priority, room_numbers, price, units, room_category, date_from, date_to, select_offer, partner_specialOffer,property_specialOffer, enter_amount, mh_offer, ac_nonac, max_allow_adult, max_allow_kids, gst_per, withac_withbreakfast_price, withac_withoutbreakfast_price, withoutac_withbreakfast_price, withoutac_withoutbreakfast_price, room_image_1, room_image_2, room_image_3, room_image_4, room_image_5, status, ip_address, room_status, remarks FROM mh_property_rooms_table WHERE partner_id='${partner_id}' && partner_sub_id='${partner_sub_id}' && property_txn_id='${txn_id}'`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];

  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      var upload_image = "";
      var address ="";
      var mhofferstatus ="";
      var getPropertydata ="",
    

      upload_image = await helper.getHotelImageBasedonPartner(
        element.partner_id,element.partner_sub_id,element.property_txn_id
      );
      getPropertydata = await helper.getgetPropertydata(
        element.partner_id,element.partner_sub_id,element.property_txn_id
      );

      address = await helper.getHotelAddressForPage2(
        element.partner_id,element.partner_sub_id,element.property_txn_id
      );
      mhofferstatus = await helper.getmhOfferStatus(
        element.partner_id,element.partner_sub_id,element.property_txn_id
      );
      data.push({
        upload_image: upload_image,
        getPropertydata:getPropertydata,
        address : address,
        mhofferstatus:mhofferstatus,
        ...element,
      });
    }
  }
  for(let i = 0; i < data.length; i++) {
    var test_string = data[i].facilities;
    var temp = new Array();
    temp = test_string.split(",")
  
    data[i].facilities = temp
  }
  for(let i = 0; i < data.length; i++) {
    var test_string = data[i].icon_image;
    var temp = new Array();
    temp = test_string.split(",")
  
    data[i].icon_image = temp
  }
  return {
    data,
  };
};



async function loadHotelInfoForCart(partner_id, partner_sub_id,txn_id) {
  const rows = await db.query(
    `SELECT txn_id, account_id, property_txn_id, partner_id, partner_name, partner_sub_id, sub_partner_name, property_name, sub_property_name, facilities, icon_image, other_amenities, no_of_avail_rooms, room_type,room_type_priority, room_numbers, price, units, room_category, date_from, date_to, select_offer, partner_specialOffer,property_specialOffer, enter_amount, mh_offer, ac_nonac, max_allow_adult, max_allow_kids, gst_per, withac_withbreakfast_price, withac_withoutbreakfast_price, withoutac_withbreakfast_price, withoutac_withoutbreakfast_price, room_image_1, room_image_2, room_image_3, room_image_4, room_image_5, status, ip_address, room_status, remarks FROM mh_property_rooms_table WHERE partner_id='${partner_id}' && partner_sub_id='${partner_sub_id}' && txn_id='${txn_id}'`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];

  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      var upload_image = "";
      var address ="";
      var mhofferstatus ="";
      var getPropertydata ="";
     
    

      upload_image = await helper.getHotelImageBasedonPartner1(
        element.partner_id,element.partner_sub_id
      );

      getPropertydata = await helper.getgetPropertydata1(
        element.partner_id,element.partner_sub_id
      );



      address = await helper.getHotelAddressForPage21(
        element.partner_id,element.partner_sub_id
      );
      mhofferstatus = await helper.getmhOfferStatus1(
        element.partner_id,element.partner_sub_id
      );

    
      data.push({
        upload_image: upload_image,
        
          checkIn_time: getPropertydata.checkIn_time,
          checkOut_time: getPropertydata.checkOut_time,
          city_id: getPropertydata.city_id,
          city_name: getPropertydata.city_name,
          property_alternate_email: getPropertydata.property_alternate_email,
          property_description: getPropertydata.property_description,
          property_email: getPropertydata.property_email,
          property_phone: getPropertydata.property_phone,
          state_id: getPropertydata.state_id,
          state_name: getPropertydata.state_name,
          sub_property_name: getPropertydata.sub_property_name,
          mh_service_fee:getPropertydata.mh_service_fee,
          address : address,
          mhofferstatus:mhofferstatus,
          getgstdata:getPropertydata.property_gstin,
        ...element,
      });
    }
  }
  for(let i = 0; i < data.length; i++) {
    var test_string = data[i].facilities;
    var temp = new Array();
    temp = test_string.split(",")
  
    data[i].facilities = temp
  }
  for(let i = 0; i < data.length; i++) {
    var test_string = data[i].icon_image;
    var temp = new Array();
    temp = test_string.split(",")
  
    data[i].icon_image = temp
  }
  return {
    data,
  };
};
async function loadPropertyInfo(city_seo_name,hospital_seo_name,subproperty_seo_name) {
    console.log(city_seo_name,hospital_seo_name,subproperty_seo_name);

  const rows = await db.query(
    `SELECT txn_id, account_id, property_txn_id, partner_id, partner_name, partner_sub_id, sub_partner_name, property_name, city_seo_name, hospital_seo_name, subproperty_seo_name, sub_property_name, facilities, icon_image, other_amenities, no_of_avail_rooms, room_type, room_type_priority, room_numbers, price, units, room_category, date_from, date_to, select_offer, partner_specialOffer, property_specialOffer, enter_amount, mh_offer, ac_nonac, max_allow_adult, max_allow_kids, gst_per, withac_withbreakfast_price, withac_withoutbreakfast_price, withoutac_withbreakfast_price, withoutac_withoutbreakfast_price, room_image_1, room_image_2, room_image_3, room_image_4, room_image_5, status, room_status, remarks, property_address, created_date_time FROM mh_property_rooms_table WHERE city_seo_name = '${city_seo_name}' AND hospital_seo_name = '${hospital_seo_name}' AND subproperty_seo_name = '${subproperty_seo_name}'`
  );
  
  const result = helper.emptyOrRows(rows);
  let data = [];

  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      var upload_image = "";
      var address ="";
      var mhofferstatus ="";
      var getPropertydata ="";
      var getHospitalmasterdata ="";
      const today = new Date().toISOString().slice(0, 10).replace(/-/g, "/");
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const nextDay = tomorrow.toISOString().slice(0, 10).replace(/-/g, "/");
        const guest= 2;
  const adult_count= 2;
  const child_count= 0;
      upload_image = await helper.getHotelImageBasedonPartner1(
        element.partner_id,element.partner_sub_id
      );
      getPropertydata = await helper.getPropertyinfo(
        element.partner_id, element.partner_sub_id, element.account_id
      );
      address = await helper.getHotelAddressForPage21(
        element.partner_id,element.partner_sub_id
      );
      mhofferstatus = await helper.getmhOfferStatus1(
        element.partner_id,element.partner_sub_id
      );
      getHospitalmasterdata = await helper.getPropertyHotelMasterinfo(
        element.city_seo_name,
        element.hospital_seo_name,
        element.subproperty_seo_name
      );
      const lat = parseFloat(getHospitalmasterdata.latitude);
      const long = parseFloat(getHospitalmasterdata.longitude);
      const propertyLat = parseFloat(getPropertydata.property_latitude);
      const propertyLong = parseFloat(getPropertydata.property_longitude);

      const latitude = Math.abs(lat - propertyLat);
      const longitude = Math.abs(long - propertyLong);
      const R = 6371; // km
      const dLat = latitude * Math.PI / 180;
      const dLon = longitude * Math.PI / 180;
      const lat1 = lat * Math.PI / 180;
      const lat2 = propertyLat * Math.PI / 180;

      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const kilo_meter = (R * c).toFixed(2);
      data.push({
          upload_image: upload_image,
          today,
          nextDay,
          guest,
          kilo_meter,
          adult_count,
          child_count,
          checkIn_time: getPropertydata.checkIn_time,
          checkOut_time: getPropertydata.checkOut_time,
          city_id: getPropertydata.city_id,
          city_name: getPropertydata.city_name,
          property_alternate_email: getPropertydata.property_alternate_email,
          property_description: getPropertydata.property_description,
          property_email: getPropertydata.property_email,
          property_phone: getPropertydata.property_phone,
          state_id: getPropertydata.state_id,
          state_name: getPropertydata.state_name,
          sub_property_name: getPropertydata.sub_property_name,
          near_hospital_name: getHospitalmasterdata.near_hospital_name,
          address : address,
          mhofferstatus:mhofferstatus,
        ...element,
      });
    }
  }
  for(let i = 0; i < data.length; i++) {
    var test_string = data[i].facilities;
    var temp = new Array();
    temp = test_string.split(",")
  
    data[i].facilities = temp
  }
  for(let i = 0; i < data.length; i++) {
    var test_string = data[i].icon_image;
    var temp = new Array();
    temp = test_string.split(",")

    data[i].icon_image = temp
  }
  // console.log("hotel service",data);
  return {
    data,
  };
}
module.exports = {
  getHotelsDetailsBySearch,
  getHotelFullInfo,
  loadHotelInfoForCart,
  loadPropertyInfo
};
