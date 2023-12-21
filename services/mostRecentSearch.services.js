const db = require("./db");
const helper = require("../helper");
const { parse } = require("dotenv");

async function loadCityWiseForSeo(city_seo_name,hospital_seo_name) {
  const rows = await db.query(
    `SELECT sno, near_hospital_id, near_hospital_name, locality, hospital_nick_name, city_seo_name, hospital_seo_name, type, latitude, longitude, distance_from_hospital, city_id, city, city_alias, state, address, pin_code, specialty, gmap_loc_link, no_of_bed, hospital_link, ratings, status FROM mh_hospital_master WHERE city_seo_name = '${city_seo_name}' AND  hospital_seo_name = '${hospital_seo_name}'`

  );
  const data = helper.emptyOrRows(rows);

  const today = new Date().toISOString().slice(0, 10).replace(/-/g, "/");
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextDay = tomorrow.toISOString().slice(0, 10).replace(/-/g, "/");
  const guest= 2;
  const adult_count= 2;
  const child_count= 0;
 return {
    data,
    today,
    nextDay,guest,adult_count,child_count

  };
  
}

async function loadhotelsCity(cityId,lat,long) {
    const rows = await db.query(
      // `SELECT mh_hospital_master.near_hospital_name,latitude as hospital_latitude,longitude as hospital_longitude,sub_property_name as property_name,property_latitude,property_longitude,property_description,building_no,street,land_mark,country,state_id,state_name,city_id,city_name,pin_code,amenity_name,amenity_icon,checkIn_time,checkOut_time,upload_image, upload_image1,upload_image2,upload_image3,upload_image4,ST_DISTANCE_SPHERE(POINT(longitude, latitude), POINT(property_longitude,property_latitude)) AS distance FROM mh_property_details_table JOIN mh_hospital_master ON '143'='143' WHERE city_id='143' AND near_hospital_id='MHHOSP1' ORDER BY distance ASC`
      `SELECT txn_id, partner_id, partner_sub_id, partner_name, sub_partner_name, partner_phone, property_name, sub_property_name, property_phone, property_email, property_description, property_latitude, property_longitude,building_no, street,concat(building_no,",",street,"," ,land_mark) as address, land_mark, country, state_id, state_name, city_id, city_name, pin_code, checkIn_time, checkOut_time, upload_image,upload_image1,upload_image2,upload_image3,upload_image4,mh_offer_status FROM mh_property_details_table WHERE property_status= 'Approved' AND city_id='${cityId}' ORDER BY property_latitude ASC`
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
         
          
          ...element
        });     
  // console.log("ffff",data)
      }
    }
    const sorted = data.sort((a, b) => a.kilo_meter - b.kilo_meter)
    return sorted;
  }

  async function loadCityWisehotelinfoForSeo(city_seo_name, hospital_seo_name,subproperty_seo_name) {
    // console.log(city_seo_name,hospital_seo_name,subproperty_seo_name);
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

      getPropertydata = await helper.getgetPropertydata1(
        element.partner_id,element.partner_sub_id
      );

      getHospitalmasterdata = await helper.getPropertyHotelMasterinfo(
        element.city_seo_name,
        element.hospital_seo_name,
        element.subproperty_seo_name
      );

      address = await helper.getHotelAddressForHotelInfo(
        element.partner_id,
        element.partner_sub_id,
        element.property_txn_id
      );
      mhofferstatus = await helper.getmhOfferStatus1(
        element.partner_id,element.partner_sub_id
      );
      data.push({
        today,
      nextDay,
      guest,
      adult_count,
      child_count,
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
          near_hospital_name: getHospitalmasterdata.near_hospital_name,
          latitude: getHospitalmasterdata.latitude,
          longitude: getHospitalmasterdata.longitude,
          sub_property_name: getPropertydata.sub_property_name
      ,
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
  // console.log("hotel info",data);
  return {
    data,
  };


  }












module.exports = {
  loadCityWiseForSeo,
  loadhotelsCity,
  loadCityWisehotelinfoForSeo
  };
  