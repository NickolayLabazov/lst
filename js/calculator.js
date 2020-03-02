console.log('1');

$(function () {
    function call() {
        var monthInterest = interest / 100 / 12;
        var amountNew = amount / 100 * amountPrimary
        var paymentValue = Math.floor((amount - amountNew) * (monthInterest + (monthInterest / (Math.pow(1 + monthInterest, term) - 1))) * 100 / 100);
        var returnValue = Math.floor(paymentValue * term * 100 / 100);
        var D = new Date();

        D.setMonth(D.getMonth() + term);

        $("#date").html(D.toLocaleDateString());
        $("#take").html(amount.toLocaleString('ru-RU'));
        $("#take-primary").html(amountPrimary.toLocaleString('ru-RU'));
        $("#paymentValue").html(paymentValue.toLocaleString('ru-RU'));
        $("#returnValue").html(returnValue.toLocaleString('ru-RU'));
    }

$("#slider-amount").slider({
    orientation: "horizontal",
    range: "min",
    min: 150000,
    max: 4000000,
    value: 100000,
    step: 50000,
    slide: function (event, ui) {
        $("#amount").html(ui.value.toLocaleString('ru-RU'));
        amount = ui.value;
        call();
    }
});

$("#slider-amount-primary").slider({
orientation: "horizontal",
    range: "min",
    min: 0,
    max: 100,
    value: 0,
    step: 1,
    slide: function (event, ui) {
        $("#amount-primary").html(ui.value.toLocaleString('ru-RU'));
        amountPrimary = ui.value;
        call();
    }
}); 

$("#slider-term").slider({
    orientation: "horizontal",
    range: "min",
    min: 6,
    max: 60,
    value: 9,
    slide: function (event, ui) {
        $("#term").html(ui.value);
        term = ui.value;
        if (ui.value < 5) {
            $("#months").html(" месяца ");
        } else if (ui.value === 12) {
            $("#months").html(" год ");
            $("#term").html("1");

        } else if (ui.value === 24) {
            $("#months").html(" года ");
            $("#term").html("2");

        } else if (ui.value === 36) {
            $("#months").html(" года ");
            $("#term").html("3");

        } else if (ui.value === 48) {
            $("#months").html(" года ");
            $("#term").html("4");

        } else if (ui.value === 60) {
            $("#months").html(" лет ");
            $("#term").html("5");


        } else {
            $("#months").html(" месяцев ");
        } call();
    }
});

$("#slider-interest").slider({
    orientation: "horizontal",
    range: "min",
    min: 7,
    max: 28,
    value: 11,
    step: 0.5,
    slide: function (event, ui) {
        interest = ui.value;
        $("#interest").html(ui.value);
        call();
    }
});

var amount = $("#slider-amount").slider("value");
var amountPrimary = $("#slider-amount-primary").slider("value");
var term = $("#slider-term").slider("value");
var interest = $("#slider-interest").slider("value");

$("#amount").html(amount.toLocaleString('ru-RU'));
$("#amount-primary").html(amountPrimary.toLocaleString('ru-RU'));
$("#term").html(term);
$("#interest").html(interest);
call();
});

console.log('2');