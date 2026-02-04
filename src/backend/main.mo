import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";

actor {
  public type ItemType = {
    #console;
    #game;
    #controller;
  };

  public type ContactSubmission = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  public type RentalInquiry = {
    itemType : ItemType;
    quantity : Nat;
    startDate : Time.Time;
    durationDays : Nat;
    totalCost : Nat;
    timestamp : Time.Time;
  };

  public type Pricing = {
    console : Nat; // daily rate
    game : Nat; // daily rate
    controller : Nat; // daily rate
  };

  module RentalInquiry {
    public func compareByTimestamp(a : RentalInquiry, b : RentalInquiry) : Order.Order {
      Int.compare(a.timestamp, b.timestamp);
    };
  };

  let contactSubmissions = Map.empty<Time.Time, ContactSubmission>();
  let rentalInquiries = Map.empty<Time.Time, RentalInquiry>();

  var pricing : Pricing = {
    console = 1000;
    game = 300;
    controller = 200;
  };

  public shared ({ caller }) func submitContactForm(name : Text, email : Text, message : Text) : async () {
    let timestamp = Time.now();
    let submission : ContactSubmission = {
      name;
      email;
      message;
      timestamp;
    };
    contactSubmissions.add(timestamp, submission);
  };

  public shared ({ caller }) func submitRentalInquiry(itemType : ItemType, quantity : Nat, startDate : Time.Time, durationDays : Nat) : async Nat {
    let totalCost = calculateRentalCostHelper(itemType, quantity, durationDays);
    let timestamp = Time.now();
    let inquiry : RentalInquiry = {
      itemType;
      quantity;
      startDate;
      durationDays;
      totalCost;
      timestamp;
    };
    rentalInquiries.add(timestamp, inquiry);
    totalCost;
  };

  func calculateRentalCostHelper(itemType : ItemType, quantity : Nat, durationDays : Nat) : Nat {
    if (quantity == 0 or durationDays == 0) { Runtime.trap("Quantity and duration must be greater than 0") };
    let dailyRate = switch (itemType) {
      case (#console) { pricing.console };
      case (#game) { pricing.game };
      case (#controller) { pricing.controller };
    };
    dailyRate * quantity * durationDays;
  };

  public query ({ caller }) func calculateRentalCost(itemType : ItemType, quantity : Nat, durationDays : Nat) : async Nat {
    calculateRentalCostHelper(itemType, quantity, durationDays);
  };

  public query ({ caller }) func getPricing() : async Pricing {
    pricing;
  };

  public shared ({ caller }) func updatePricing(consoleRate : Nat, gameRate : Nat, controllerRate : Nat) : async () {
    pricing := {
      console = consoleRate;
      game = gameRate;
      controller = controllerRate;
    };
  };

  public query ({ caller }) func getContactSubmissions() : async [ContactSubmission] {
    contactSubmissions.values().toArray();
  };

  public query ({ caller }) func getRentalInquiries() : async [RentalInquiry] {
    rentalInquiries.values().toArray().sort(RentalInquiry.compareByTimestamp);
  };
};
