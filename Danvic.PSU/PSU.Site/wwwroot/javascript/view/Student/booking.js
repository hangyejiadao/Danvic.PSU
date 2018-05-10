﻿/*!
 *   Student Register Booking Page JavaScript v1.0.0
 *   Author: Danvic712
 */
$(function () {
    //datetime
    $('.date-picker').datepicker({
        autoclose: true,
        todayHighlight: true,
        language: 'zh-CN',
        format: 'yyyy-mm-dd'
    });

    //detail
    $(document).on('click',
        '#service_detail',
        function () {
            $.ajax({
                type: "GET",
                dataType: "html",
                url: '/Student/Register/ServiceInfo',
                data: {
                    id: $(this).attr('data-id')
                },
                success: function (html) {
                    bootbox.dialog({
                        title: '迎新服务详细信息',
                        message: html
                    });
                }
            });
        });

    //add
    $(document).on('click',
        '#book_service',
        function () {
            $.ajax({
                type: "GET",
                dataType: "html",
                url: '/Student/Register/BookingService',
                data: {
                    Id: $(this).attr('data-id'),
                    IsBooking: $(this).attr('data-booking')
                },
                success: function (html) {
                    bootbox.dialog({
                        title: '预定迎新服务',
                        message: html
                    });
                }
            });
        });

    //info
    $(document).on('click',
        '#book_serviceInfo',
        function () {
            $.ajax({
                type: "GET",
                dataType: "html",
                url: '/Student/Register/BookingService',
                data: {
                    id: $(this).attr('data-id'),
                    IsBooking: $(this).attr('data-booking')
                },
                success: function (html) {
                    bootbox.dialog({
                        title: '迎新服务预定详情',
                        message: html
                    });
                }, error: function (msg) {
                    console.log(msg.responseText);
                }
            });
        });

    //save
    $(document).on('click', '#book_save', function () {

        if ($('#way').val() === '-1') {
            bootbox.dialog({
                message: "请选择来校方式"
            });
            return false;
        }
        if ($('#place').val() === '') {
            bootbox.dialog({
                message: "请输入到达地点"
            });
            return false;
        }
        if ($('#arrivetime').val() === '') {
            bootbox.dialog({
                message: "请输入预计到达日期"
            });
            return false;
        }
        if ($('#express').val() === '-1') {
            bootbox.dialog({
                message: "请选择档案是否快递寄送"
            });
            return false;
        }

        //build ajax request param
        var param = {};
        param.Id = $(this).attr('data-id');
        param.Way = $('#way').val();
        param.Place = $('#place').val();
        param.ArriveTime = $('#arrivetime').val();
        param.IsExpress = $('#express').val();
        param.ExpressId = $('#expressid').val();
        param.Remark = $('#remark').val();

        $(this).attr('disabled', 'disabled');

        $.ajax({
            type: "POST",
            url: "/Student/Register/SignUp",
            data: param,
            dataType: "json",
            success: function (result) {
                if (result.msg !== undefined) {
                    bootbox.dialog({
                        message: result.msg
                    });
                    if (result.success) {
                        setTimeout(function () {
                            bootbox.hideAll();
                            window.location.href = window.location.href;
                        }, 2000);
                    }
                }
                $('#save').removeAttr('disabled');
            },
            error: function (msg) {
                console.log(msg);
                $('#save').removeAttr('disabled');
            }
        });
    });
});