// Business Logic for customerinfo ---------
function orders() {
  this.customers = [],
  this.currentId = 0
}

orders.prototype.addCustomer = function(customer) {
  customer.id = this.assignId();
  this.customers.push(customer);
}

orders.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

orders.prototype.findCustomer = function(id) {
  for (var i=0; i< this.customers.length; i++) {
    if (this.customers[i]) {
      if (this.customers[i].id == id) {
        return this.customers[i];
      }
    }
  };
  return false;
}

orders.prototype.deleteCustomer = function(id) {
  for (var i=0; i< this.customers.length; i++) {
    if (this.customers[i]) {
      if (this.customers[i].id == id) {
        delete this.customers[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for customers ---------
function Customerinfo(firstName, lastName, phoneNumber, address) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber
  this.address = address
}

Customerinfo.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// User Interface Logic ---------
var Customerinfo = new orders ();

function displayCustomerDetails(customerDisplay) {
  var customerList = $("ul#customers");
  var htmlForCustomerInfo = "";
  customerDisplay.customers.forEach(function(customer) {
   htmlForCustomerInfo += "<li id=" + customer.id + ">" +   customer.firstName + " " + customer.lastName + "</li>";
  });
  customerList.html(htmlForCustomerInfo);
};

function showCustomer(customerID) {
  var customer = Customerinfo.findCustomer(customerID);
  $("#show-customer").show();
  $(".first-name").html(customer.firstName);
  $(".last-name").html(customer.lastName);
  $(".phone-number").html(customer.phoneNumber);
  $(".address").html(customer.address);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + customer.id + ">Delete</button>");
}

function attachCustomerlist() {
  $("ul#customers").on("click", "li", function() {
    showCustomer(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    Customerinfo.deleteCustomer(this.id);
    $("#show-customer").hide();
    displayCustomerDetails(Customerinfo);
  });
};

$(document).ready(function() {
  attachCustomerlist();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedAddress = $("input#address").val();
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#address").val("");
    var newCustomer = new orders(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedAddress);
    Customerinfo.addCustomer(newCustomer);
    displayCustomerDetails(Customerinfo);
  });
});
