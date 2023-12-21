const express = require("express");
const router = express.Router();
const dropdown = require("../services/dropdown");

router.get("/", async function (req, res, next) {
  try {
    res.json(await dropdown.getProperty());
  } catch (err) {
    console.error(`Error while getting Property Data `, err.message);
    next(err);
  }
});

router.get("/getJsonData", async function (req, res, next) {
  try {
    res.json(await dropdown.getJsonData());
  } catch (err) {
    console.error(`Error while getting Property Data `, err.message);
    next(err);
  }
});

router.post("/saveJsonData", async function (req, res, next) {
  try {
    res.json(await dropdown.saveJsonTable());
  } catch (err) {
    console.error(`Error while getting Property Data `, err.message);
    next(err);
  }
});
router.get("/loadPartnersNames/:account_id", async function (req, res, next) {
  try {
    res.json(await dropdown.loadPartnerNames(req.params.account_id));
  } catch (err) {
    console.error(`Error while getting Partners Data `, err.message);
    next(err);
  }
});



router.get("/loadAllgst", async function (req, res, next) {
  try {
    res.json(await dropdown.loadAllgst());
  } catch (err) {
    console.error(`Error while getting GST Data `, err.message);
    next(err);
  }
});
router.get("/loadSubPartnersNames/:account_id", async function (req, res, next) {
  try {
    res.json(await dropdown.loadSubPartnerNames(req.params.account_id));
  } catch (err) {
    console.error(`Error while getting Sub Partners Data `, err.message);
    next(err);
  }
});
router.get("/loadPropertyNames/:account_id/:partner_sub_id", async function (req, res, next) {
  try {
    res.json(await dropdown.loadPropertyNames(req.params.account_id, req.params.partner_sub_id));
  } catch (err) {
    console.error(`Error while getting Properties Data `, err.message);
    next(err);
  }
});
// change method//
router.get("/loadPropertiesforadmin", async function (req, res, next) {
  try {
    res.json(await dropdown.loadPropertiesforadmin());
  } catch (err) {
    console.error(`Error while getting Properties Data `, err.message);
    next(err);
  }
});
router.get("/loadfoodProperties/:account_id/:agent_id", async function (req, res, next) {
  try {
    res.json(await dropdown.loadfoodProperties(req.params.account_id, req.params.agent_id));
  } catch (err) {
    console.error(`Error while getting Properties Data `, err.message);
    next(err);
  }
});

router.get("/loadTravelproperties/:account_id/:agent_id", async function (req, res, next) {
  try {
    res.json(await dropdown.loadTravelproperties(req.params.account_id, req.params.agent_id));
  } catch (err) {
    console.error(`Error while getting Properties Data `, err.message);
    next(err);
  }
});

router.get("/loadEquipmentProperties/:account_id/:equipment_id", async function (req, res, next) {
  try {
    res.json(await dropdown.loadEquipmentProperties(req.params.account_id, req.params.equipment_id));
  } catch (err) {
    console.error(`Error while getting Properties Data `, err.message);
    next(err);
  }
});
router.get("/loadrestaurantDetails/:account_id/:partner_id", async function (req, res, next) {
  try {
    res.json(await dropdown.loadrestaurantDetails(req.params.account_id, req.params.partner_id));
  } catch (err) {
    console.error(`Error while getting Restaurants Data `, err.message);
    next(err);
  }
});
router.get("/loadFoodrestaurantDetails/:account_id/:agent_id", async function (req, res, next) {
  try {
    res.json(await dropdown.loadFoodrestaurantDetails(req.params.account_id, req.params.agent_id));
  } catch (err) {
    console.error(`Error while getting food Restaurants Data `, err.message);
    next(err);
  }
});
router.get("/loadTravelrestaurantDetails/:account_id/:agent_id", async function (req, res, next) {
  try {
    res.json(await dropdown.loadTravelrestaurantDetails(req.params.account_id, req.params.agent_id));
  } catch (err) {
    console.error(`Error while getting travel Restaurants Data `, err.message);
    next(err);
  }
});
router.get("/loadMedicalrestaurantDetails/:account_id/:equipment_id", async function (req, res, next) {
  try {
    res.json(await dropdown.loadMedicalrestaurantDetails(req.params.account_id, req.params.equipment_id));
  } catch (err) {
    console.error(`Error while getting Medical Restaurants Data `, err.message);
    next(err);
  }
});
router.get("/loadFoodSubPartnersNames/:account_id/:agent_id", async function (req, res, next) {
  
  try {
    res.json(await dropdown.loadFoodSubPartnerNames(req.params.account_id, req.params.agent_id));
  } catch (err) {
    console.error(`Error while getting Sub Partners Data `, err.message);
    next(err);
  }
  // console.log("route",req.params);
});
router.get("/loadFoodPropertyNames/:account_id/:agent_id/:agent_sub_id", async function (req, res, next) {
  try {
    res.json(await dropdown.loadFoodPropertyNames(req.params.account_id, req.params.agent_id, req.params.agent_sub_id));
    // console.log("loadFoodPropertyNames",req.params)
  } catch (err) {
    console.error(`Error while getting Properties Data `, err.message);
    next(err);
  }
});
router.get(
  "/getPropertyDetailsForoperation/:account_id/:property_txn_id/:partner_sub_id",
  async function (req, res, next) {
    try {
      res.json(
        await dropdown.getPropertyDetailsForoperation(
          req.params.account_id,
          req.params.property_txn_id,
          req.params.partner_sub_id
        )
      );
    } catch (err) {
      console.error(`Error while getting Property For Operation Details `, err.message);
      next(err);
    }
  });
  router.get("/getAllProblemDetails", async function (req, res, next) {
    try {
      res.json(await dropdown.getAllProblemDetails());
    } catch (err) {
      console.error(`Error while getting All Problem Dropdown `, err.message);
      next(err);
    }
  });
  router.get("/getpropertydetailsforoffers/:city_id", async function (req, res, next) {
    try {
      const city_id = req.params.city_id;
      res.json(await dropdown.getpropertydetailsforoffers(city_id));
    } catch (err) {
      console.error(`Error while loading property details for offers`, err.message);
      next(err);
    }
  });
  router.get("/getpropertyroomtype/:txn_id/:partner_id", async function (req, res, next) {
    try {
      res.json(await dropdown.getpropertyroomtype( req.params.txn_id, req.params.partner_id));
    } catch (err) {
      console.error(`Error while loading property room type details for offers`, err.message);
      next(err);
    }
  });
  router.get("/getcategorywiseroominfo/:txn_id/:partner_id/:room_category/:room_type", async function (req, res, next) {
    try {
      res.json(await dropdown.getcategorywiseroominfo( req.params.txn_id, req.params.partner_id,req.params.room_category,req.params.room_type));
    } catch (err) {
      console.error(`Error while loading property room info category wise details for offers`, err.message);
      next(err);
    }
  });



  router.get("/loadHospitalMasterDetails", async function (req, res, next) {
    //console.log("hospital master");
    try {
      res.json(await dropdown.loadHospitalMasterDetails());
    }
    catch (err) {
      console.error(
        `Error while getting Transport Partners Data`,
        err.message
      );
      next(err);
    }  
  });



  
  router.get("/loadVehicalTypeCategory", async function (req, res, next) {
    try {
      res.json(await dropdown.loadVehicalTypeCategory());
    } catch (err) {
      console.error(`Error while getting All Problem Dropdown `, err.message);
      next(err);
    }
  });

  router.get("/loadVehiclePerTrip", async function (req, res, next) {
    try {
      res.json(await dropdown.loadVehiclePerTrip());
    } catch (err) {
      console.error(`Error while getting All Problem Dropdown `, err.message);
      next(err);
    }
  });

  router.get("/loadVehicleFromPlace/:payload", async function (req, res, next) {
    try {
      const city = req.params.payload;
      //console.log("req.params",city)
      res.json(await dropdown.loadVehicleFromPlace(city));
    } catch (err) {
      console.error(`Error while getting All Problem Vehicle From Places `, err.message);
      next(err);
    }
  });

  router.get("/loadVehicleToPlace/:payload", async function (req, res, next) {
    try {
      const city = req.params.payload;
      //console.log("req.params",city)
      res.json(await dropdown.loadVehicleToPlace(city));
    } catch (err) {
      console.error(`Error while getting All Problem Vehicle to Places `, err.message);
      next(err);
    }
  });


  router.post("/travelUpdateDetailsSavingMethod", async function (req, res, next) {
    //console.log('payload')
    //console.log("req.body",req.body);  
    try {
      res.json(await dropdown.SavingTravelUpdateData(req.body));
    } catch (err) {
      console.error(`Error while submitting the Travel Update Data`, err.message);
      next(err);
    }
   
  });

  router.get("/loadMedicalStoreDetails", async function (req, res, next) {
    try {
      res.json(await dropdown.loadMedicalStoreDetails());
    } catch (err) {
      console.error(`Error while getting All Problem Dropdown `, err.message);
      next(err);
    }
  });

  router.get("/loadItemNameDetails", async function (req, res, next) {
    try {
      res.json(await dropdown.loadItemNameDetails());
    } catch (err) {
      console.error(`Error while getting All Problem Dropdown `, err.message);
      next(err);
    }
  });

  router.get("/loadEquipmentUnits",async function(req,res,next) {
    try {
      res.json(await dropdown.loadEquipmentUnits());
    } catch(err){
      console.error(`Error while getting All Problem Dropdown`,err.message);
      next(err);
    }
  });

  router.post("/partnerEquipmentSubmitData", async function (req, res, next) {
    //console.log('payload')
    //console.log("req.body",req.body);  
    try {
      res.json(await dropdown.partnerEquipmentSubmitData(req.body));
    } catch (err) {
      console.error(`Error while submitting the partner Equipment Data`, err.message);
      next(err);
    }
   
  });

  router.get("/loadNearHospitalNames/:payload", async function (req, res, next) {
    try {
      const city = req.params.payload;
      //console.log("req.params",city)
      res.json(await dropdown.loadNearHospitalNames(city));
    } catch (err) {
      console.error(`Error while getting near Hospital Names `, err.message);
      next(err);
    }
  });

   
  router.get("/loadAccomadationpartnerData/:city/:userName", async function (req, res, next) {
    //console.log('rk',req.params)
      try {
        const city = req.params.city;
        const userName = req.params.userName;
        //console.log(city)
        //console.log(userName)
        res.json(await dropdown.loadAccomadationpartnerData(city,userName));
      } catch (err) {
        console.error(`Error while getting Accomadation Field Visits `, err.message);
        next(err);
      }
    });

router.get("/loadTravelPartnerData/:payload", async function (req, res, next) {
    //console.log('rk')
    try {
      const city = req.params.payload;
      res.json(await dropdown.loadTravelPartnerData(city));
    } catch (err) {
      console.error(`Error while getting Partner Field Visits `, err.message);
      next(err);
    }
  });

  router.get("/loadFoodPartnerData/:payload", async function (req, res, next) {
    //console.log('rk')
    try {
      const city = req.params.payload;
      res.json(await dropdown.loadFoodPartnerData(city));
    } catch (err) {
      console.error(`Error while getting Partner Field Visits `, err.message);
      next(err);
    }
  });

  router.get("/loadEquipmentPartnerData/:payload", async function (req, res, next) {
    //console.log('rk')
    try {
      const city = req.params.payload;
      res.json(await dropdown.loadEquipmentPartnerData(city));
    } catch (err) {
      console.error(`Error while getting Partner Field Visits `, err.message);
      next(err);
    }
  });
  
//Ravi GET Room Categories
    router.get("/loadRoomCategories", async function (req, res, next) {
      //console.log('rk')
      try {
        
        res.json(await dropdown.loadRoomCategories());
      } catch (err) {
        console.error(`Error while getting Room Categories`, err.message);
        next(err);
      }
    });

  

module.exports = router;
