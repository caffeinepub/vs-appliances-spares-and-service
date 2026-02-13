import Map "mo:core/Map";
import List "mo:core/List";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

// Enable data migration on upgrade via import of migration module and with migration - see documentation

actor {
  // Authorization system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile System
  public type UserProfile = {
    name : Text;
    email : Text;
    phone : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Brand data structure
  type Brand = {
    id : Nat;
    name : Text;
  };

  // Appliance data structure
  type Appliance = {
    id : Nat;
    name : Text;
    brandIds : [Nat];
  };

  // Product data structure
  type Product = {
    id : Nat;
    name : Text;
    brandId : Nat;
    applianceId : Nat;
    price : Float;
  };

  // Store data using persistent Map
  let brandMap = Map.empty<Nat, Brand>();
  let applianceMap = Map.empty<Nat, Appliance>();
  let productMap = Map.empty<Nat, Product>();

  // Initialize brands
  let brands : [Brand] = [
    { id = 1; name = "Bosch" },
    { id = 2; name = "Samsung" },
    { id = 3; name = "Electrolux" },
    { id = 4; name = "Whirlpool" },
    { id = 5; name = "Siemens" },
  ];

  // Populate brandMap
  for (brand in brands.values()) {
    brandMap.add(brand.id, brand);
  };

  // Initialize appliances with associated brand IDs
  let appliances : [Appliance] = [
    { id = 1; name = "Washing Machine"; brandIds = [1, 2, 3] },
    { id = 2; name = "Dryer"; brandIds = [1, 2, 4] },
    { id = 3; name = "Fridge"; brandIds = [2, 3, 5] },
    { id = 4; name = "Freezer"; brandIds = [1, 2, 3, 4, 5] },
    { id = 5; name = "Dishwasher"; brandIds = [1, 2, 3, 4, 5] },
  ];

  // Populate applianceMap
  for (appliance in appliances.values()) {
    applianceMap.add(appliance.id, appliance);
  };

  // Initialize products
  let products : [Product] = [
    // Washing Machines
    { id = 1; name = "Bosch Washing Machine Series 6"; brandId = 1; applianceId = 1; price = 649.0 },
    { id = 2; name = "Samsung EcoBubble"; brandId = 2; applianceId = 1; price = 549.0 },
    { id = 3; name = "Electrolux PerfectCare"; brandId = 3; applianceId = 1; price = 599.0 },

    // Dryers
    { id = 4; name = "Bosch Heat Pump Dryer"; brandId = 1; applianceId = 2; price = 749.0 },
    { id = 5; name = "Samsung AirDry"; brandId = 2; applianceId = 2; price = 699.0 },
    { id = 6; name = "Whirlpool FreshCare"; brandId = 4; applianceId = 2; price = 719.0 },

    // Fridges
    { id = 7; name = "Samsung Family Hub"; brandId = 2; applianceId = 3; price = 1499.0 },
    { id = 8; name = "Electrolux FreshPlus"; brandId = 3; applianceId = 3; price = 999.0 },
    { id = 9; name = "Siemens KG36VVW3A"; brandId = 5; applianceId = 3; price = 899.0 },

    // Freezers
    { id = 10; name = "Bosch Serie 4 Freezer"; brandId = 1; applianceId = 4; price = 499.0 },
    { id = 11; name = "Samsung Upright Freezer"; brandId = 2; applianceId = 4; price = 699.0 },
    { id = 12; name = "Electrolux Chest Freezer"; brandId = 3; applianceId = 4; price = 599.0 },
    { id = 13; name = "Whirlpool Frost-Free Freezer"; brandId = 4; applianceId = 4; price = 649.0 },
    { id = 14; name = "Siemens GI21VV5S0"; brandId = 5; applianceId = 4; price = 799.0 },

    // Dishwashers
    { id = 15; name = "Bosch SilencePlus"; brandId = 1; applianceId = 5; price = 699.0 },
    { id = 16; name = "Samsung WaterWall"; brandId = 2; applianceId = 5; price = 849.0 },
    { id = 17; name = "Electrolux RealLife"; brandId = 3; applianceId = 5; price = 799.0 },
    { id = 18; name = "Whirlpool PowerDry"; brandId = 4; applianceId = 5; price = 779.0 },
    { id = 19; name = "Siemens SN236I00KE"; brandId = 5; applianceId = 5; price = 849.0 },
  ];

  // Populate productMap
  for (product in products.values()) {
    productMap.add(product.id, product);
  };

  /// COMPONENT: Service Request - Data Structures and State
  type ServiceRequest = {
    id : Nat;
    name : Text;
    phone : Text;
    email : Text;
    postalCode : Text;
    city : Text;
    preferredTime : Text;
    applianceType : Text;
    brand : Text;
    applianceAge : Text;
    message : Text;
    status : Text;
    creationTime : Nat;
  };

  type ServiceRequestInput = {
    name : Text;
    phone : Text;
    email : Text;
    postalCode : Text;
    city : Text;
    preferredTime : Text;
    applianceType : Text;
    brand : Text;
    applianceAge : Text;
    message : Text;
  };

  let serviceRequests = Map.empty<Nat, ServiceRequest>();
  var nextRequestId = 1;

  // Query: Get brands for a specific appliance
  // Public access - needed for customer-facing booking form
  public query ({ caller }) func getBrandsForAppliance(applianceId : Nat) : async ?[Brand] {
    switch (applianceMap.get(applianceId)) {
      case (null) { null };
      case (?appliance) {
        let brandsForAppliance = appliance.brandIds.map(
          func(brandId) {
            brandMap.get(brandId);
          }
        );
        let validBrands = brandsForAppliance.filter(
          func(brandData) {
            switch (brandData) {
              case (null) { false };
              case (_) { true };
            };
          }
        );
        let finalBrands = validBrands.map(
          func(brandData) {
            switch (brandData) {
              case (null) { { id = 0 : Nat; name = "Unknown" } };
              case (?brand) { brand };
            };
          }
        );
        ?finalBrands;
      };
    };
  };

  // Query: Search for products (static data, legacy endpoint)
  public query ({ caller }) func searchProducts(_applianceIds : [Nat], _brandIds : [Nat], _maxPrice : ?Float) : async ([Product], Nat) {
    // Legacy endpoint, data is now static
    let products : [Product] = [];
    (products, 0);
  };

  // Query: Get specific products by IDs (static data, legacy endpoint)
  public query ({ caller }) func getProductsByIds(_productIds : [Nat]) : async [Product] {
    // Legacy endpoint, data is now static
    [];
  };

  // Query: Get all appliances
  // Public access - needed for customer-facing booking form
  public query ({ caller }) func getAllAppliances() : async [Appliance] {
    applianceMap.values().toArray();
  };

  // Query: Get all brands
  // Public access - needed for customer-facing booking form
  public query ({ caller }) func getAllBrands() : async [Brand] {
    brandMap.values().toArray();
  };

  /// COMPONENT: Service Request - Create Request
  // Public access - customer-facing booking form, accessible to all including guests
  public shared ({ caller }) func createServiceRequest(request : ServiceRequestInput) : async {
    requestId : Nat;
    confirmationMessage : Text;
  } {
    let newRequest : ServiceRequest = {
      id = nextRequestId;
      name = request.name;
      phone = request.phone;
      email = request.email;
      postalCode = request.postalCode;
      city = request.city;
      preferredTime = request.preferredTime;
      applianceType = request.applianceType;
      brand = request.brand;
      applianceAge = request.applianceAge;
      message = request.message;
      status = "Pending";
      creationTime = 0;
    };

    serviceRequests.add(nextRequestId, newRequest);

    nextRequestId += 1;

    {
      requestId = newRequest.id;
      confirmationMessage = "Request has been successfully submitted.";
    };
  };

  /// COMPONENT: Service Request - Admin Get Single
  public shared ({ caller }) func getServiceRequest(id : Nat) : async ServiceRequest {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this operation");
    };

    switch (serviceRequests.get(id)) {
      case (null) {
        Runtime.trap("Service request with " # id.toText() # " does not exist");
      };
      case (?request) {
        request;
      };
    };
  };

  /// COMPONENT: Service Request - Admin Get All
  public shared ({ caller }) func getAllServiceRequests() : async [ServiceRequest] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this operation");
    };

    serviceRequests.values().toArray();
  };

  /// COMPONENT: Service Request Count - Admin
  public shared ({ caller }) func getServiceRequestCount() : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this operation");
    };
    serviceRequests.size();
  };

  /// COMPONENT: Service Request - Admin Update
  public shared ({ caller }) func updateServiceRequest(id : Nat, updates : ServiceRequestInput) : async ServiceRequest {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this operation");
    };

    switch (serviceRequests.get(id)) {
      case (null) {
        Runtime.trap("Service request not found: " # id.toText());
      };
      case (?existingRequest) {
        let updatedRequest : ServiceRequest = {
          id = existingRequest.id;
          name = updates.name;
          phone = updates.phone;
          email = updates.email;
          postalCode = updates.postalCode;
          city = updates.city;
          preferredTime = updates.preferredTime;
          applianceType = updates.applianceType;
          brand = updates.brand;
          applianceAge = updates.applianceAge;
          message = updates.message;
          status = existingRequest.status;
          creationTime = existingRequest.creationTime;
        };

        serviceRequests.add(id, updatedRequest);
        updatedRequest;
      };
    };
  };

  /// COMPONENT: Service Request - Admin Update Status
  public shared ({ caller }) func updateServiceRequestStatus(id : Nat, status : Text) : async {
    id : Nat;
    newStatus : Text;
  } {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this operation");
    };

    switch (serviceRequests.get(id)) {
      case (null) {
        Runtime.trap("Service request not found: " # id.toText());
      };
      case (?existingRequest) {
        let updatedRequest : ServiceRequest = {
          id = existingRequest.id;
          name = existingRequest.name;
          phone = existingRequest.phone;
          email = existingRequest.email;
          postalCode = existingRequest.postalCode;
          city = existingRequest.city;
          preferredTime = existingRequest.preferredTime;
          applianceType = existingRequest.applianceType;
          brand = existingRequest.brand;
          applianceAge = existingRequest.applianceAge;
          message = existingRequest.message;
          status;
          creationTime = existingRequest.creationTime;
        };

        serviceRequests.add(id, updatedRequest);

        {
          id = updatedRequest.id;
          newStatus = status;
        };
      };
    };
  };

  /// COMPONENT: Service Request - Admin Delete
  public shared ({ caller }) func deleteServiceRequest(id : Nat) : async {
    deletedRequestId : Nat;
    message : Text;
  } {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this operation");
    };

    switch (serviceRequests.get(id)) {
      case (null) {
        Runtime.trap("Service request not found: " # id.toText());
      };
      case (?_) {
        serviceRequests.remove(id);
        {
          deletedRequestId = id;
          message = "Service request " # id.toText() # " deleted successfully";
        };
      };
    };
  };

  /// COMPONENT: Service Request - Admin Bulk Delete
  public shared ({ caller }) func deleteAllServiceRequests() : async {
    deletedRequestIds : [Nat];
    message : Text;
  } {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this operation");
    };

    let deletedIdsList = List.empty<Nat>();
    for ((requestId, _) in serviceRequests.entries()) {
      deletedIdsList.add(requestId);
    };

    serviceRequests.clear();

    {
      deletedRequestIds = deletedIdsList.toArray();
      message = if (deletedIdsList.isEmpty()) { "No service requests to delete" } else {
        "All service requests deleted successfully";
      };
    };
  };
};

