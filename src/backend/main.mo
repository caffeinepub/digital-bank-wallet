import Map "mo:core/Map";
import List "mo:core/List";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import AccessControl "authorization/access-control";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import Migration "migration";

(with migration = Migration.run)
actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
    email : Text;
    password : Text;
  };

  type TransactionType = {
    #deposit;
    #withdrawal;
    #transfer;
  };

  type Transaction = {
    amount : Nat;
    timestamp : Int;
    description : Text;
    transactionType : TransactionType;
  };

  type Wallet = {
    balance : Nat;
    transactions : List.List<Transaction>;
  };

  let wallets = Map.empty<Principal, Wallet>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func updatePassword(currentPassword : Text, newPassword : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update password");
    };
    let userProfile = switch (userProfiles.get(caller)) {
      case (null) { Runtime.trap("User not found") };
      case (?profile) { profile };
    };
    if (userProfile.password != currentPassword) {
      Runtime.trap("Incorrect current password");
    };
    let updatedProfile = {
      userProfile with
      password = newPassword;
    };
    userProfiles.add(caller, updatedProfile);
  };

  // Wallet Management
  public shared ({ caller }) func initializeAccount() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create accounts");
    };
    if (wallets.containsKey(caller)) {
      Runtime.trap("Account already initialized");
    };
    wallets.add(caller, { balance = 0; transactions = List.empty<Transaction>() });
  };

  public query ({ caller }) func getBalance() : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access balance");
    };
    switch (wallets.get(caller)) {
      case (null) { Runtime.trap("Account not found") };
      case (?wallet) { wallet.balance };
    };
  };

  public query ({ caller }) func getTransactions() : async [Transaction] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access transactions");
    };
    switch (wallets.get(caller)) {
      case (null) { Runtime.trap("Account not found") };
      case (?wallet) {
        wallet.transactions.toArray();
      };
    };
  };

  public shared ({ caller }) func deposit(amount : Nat, description : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can deposit funds");
    };
    let wallet = switch (wallets.get(caller)) {
      case (null) { Runtime.trap("Account not found") };
      case (?wallet) { wallet };
    };
    let transaction : Transaction = {
      amount;
      timestamp = Time.now();
      description;
      transactionType = #deposit;
    };
    wallet.transactions.add(transaction);
    wallets.add(caller, { wallet with balance = (wallet.balance + amount) });
  };

  public shared ({ caller }) func withdraw(amount : Nat, description : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can withdraw funds");
    };
    let wallet = switch (wallets.get(caller)) {
      case (null) { Runtime.trap("Account not found") };
      case (?wallet) { wallet };
    };
    if (wallet.balance < amount) {
      Runtime.trap("Insufficient funds");
    };
    let transaction : Transaction = {
      amount;
      timestamp = Time.now();
      description;
      transactionType = #withdrawal;
    };
    wallet.transactions.add(transaction);
    wallets.add(caller, { wallet with balance = (wallet.balance - amount) });
  };

  public shared ({ caller }) func transfer(to : Principal, amount : Nat, description : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can transfer funds");
    };
    if (caller == to) {
      Runtime.trap("Cannot transfer to self");
    };

    let fromWallet = switch (wallets.get(caller)) {
      case (null) { Runtime.trap("Sender account not found") };
      case (?wallet) { wallet };
    };

    let toWallet = switch (wallets.get(to)) {
      case (null) { Runtime.trap("Recipient account not found") };
      case (?wallet) { wallet };
    };

    if (fromWallet.balance < amount) {
      Runtime.trap("Insufficient funds");
    };

    let transaction : Transaction = {
      amount;
      timestamp = Time.now();
      description;
      transactionType = #transfer;
    };

    fromWallet.transactions.add(transaction);

    toWallet.transactions.add({
      amount;
      timestamp = transaction.timestamp;
      description;
      transactionType = #deposit;
    });

    wallets.add(caller, { fromWallet with balance = (fromWallet.balance - amount) });
    wallets.add(to, { toWallet with balance = (toWallet.balance + amount) });
  };
};
