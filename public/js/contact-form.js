// JavaScript Document
$(document).ready(function() {

    "use strict";

    $(".contact-form").submit(function(e) {
        e.preventDefault();
        var name = $(".name");
        var email = $(".email");
        var company = $(".company");
        var message = $(".message");
        var flag = false;
        if (name.val() == "") {
            name.closest(".form-control").addClass("error");
            name.focus();
            flag = false;
            return false;
        } else {
            name.closest(".form-control").removeClass("error").addClass("success");
        } if (email.val() == "") {
            email.closest(".form-control").addClass("error");
            email.focus();
            flag = false;
            return false;
        } else {
            email.closest(".form-control").removeClass("error").addClass("success");
        } if (message.val() == "") {
            message.closest(".form-control").addClass("error");
            message.focus();
            flag = false;
            return false;
        } else {
            message.closest(".form-control").removeClass("error").addClass("success");
            flag = true;
        }
        // var dataString = "name=" + name.val() + "&email=" + email.val() + "&company=" + company.val() + "&message=" + message.val();
        let dataString = {
            name: name.val(),
            email: email.val(),
            company: company.val(),
            message: message.val()
        }
        console.log(dataString)
        $(".loading").fadeIn("slow").html("Loading...");
        // $.ajax({
        //     url: "/email",
        //     method: 'POST',
        //     data: dataString
        //     }).done(function(res) {
        //         console.log(res)
        //         if (res.success) {
        //         console.log('id from ajax call is', res);
        //     } else {
        //         console.log('error...ajax');
        //     }
        // });
        $.ajax({
            method: "POST",
            data: dataString,
            url: "/email",
            cache: false,
            dataType: 'json'
            })
            .done(function(res) {
                console.log(res)
                if (res.success) {
                    $(".form-control").removeClass("success");
                    $('.loading').fadeIn('slow').html('<font color="#48af4b">Mail sent Successfully.</font>').delay(3000).fadeOut('slow');
                } else {
                    console.log('error...ajax');
                    $('.loading').fadeIn('slow').html('<font color="#ff5607">Mail not sent.</font>').delay(3000).fadeOut('slow');
                }

            // success: function (d) {
            //     console.log(d)
            //     $(".form-control").removeClass("success");
            //         if(d == 'success') // Message Sent? Show the 'Thank You' message and hide the form
            //             $('.loading').fadeIn('slow').html('<font color="#48af4b">Mail sent Successfully.</font>').delay(3000).fadeOut('slow');
            //              else
            //             $('.loading').fadeIn('slow').html('<font color="#ff5607">Mail not sent.</font>').delay(3000).fadeOut('slow');
            //                     }
        });
        return false;
    });
    $("#reset").on('click', function() {
        $(".form-control").removeClass("success").removeClass("error");
    });
    
})



