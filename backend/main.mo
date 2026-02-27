import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let balances = Map.empty<Principal, Nat>();
  let defaultBalance = 211_239;

  // Profile management

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can get profiles");
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
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Balance management

  public query ({ caller }) func getBalance() : async Nat {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can access balance");
    };
    switch (balances.get(caller)) {
      case (?balance) { balance };
      case (null) { 0 };
    };
  };

  public shared ({ caller }) func deposit(amount : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can deposit funds");
    };
    let currentBalance = switch (balances.get(caller)) {
      case (?balance) { balance };
      case (null) { defaultBalance };
    };
    balances.add(caller, currentBalance + amount);
  };

  public shared ({ caller }) func withdraw(amount : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can withdraw funds");
    };
    let currentBalance = switch (balances.get(caller)) {
      case (?balance) { balance };
      case (null) { defaultBalance };
    };
    if (currentBalance < amount) {
      Runtime.trap("Insufficient funds");
    };
    balances.add(caller, currentBalance - amount);
  };

  public shared ({ caller }) func transfer(to : Principal, amount : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can transfer funds");
    };
    let senderBalance = switch (balances.get(caller)) {
      case (?balance) { balance };
      case (null) { defaultBalance };
    };
    if (senderBalance < amount) {
      Runtime.trap("Insufficient funds");
    };
    let recipientBalance = switch (balances.get(to)) {
      case (?balance) { balance };
      case (null) { defaultBalance };
    };
    balances.add(caller, senderBalance - amount);
    balances.add(to, recipientBalance + amount);
  };
};
