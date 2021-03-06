import { Component, OnInit } from '@angular/core';
declare var $: any;
import { NgxSpinnerService } from "ngx-spinner";
import { ApiService } from '../service/api.service';
declare var bootbox: any;
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  public isOrders: boolean = true;
  public isOrderInfo: boolean = false;
  public orderId: any;
  public orders: any;
  public orderInfo: any;
  orderRemarks: any;
  selectedOrderStatus: any;
  constructor(private spinner: NgxSpinnerService,
    public service: ApiService,
    public toastr: ToastrService) {
    let vm = this;
    vm.selectedOrderStatus = '0';
  }

  ngOnInit(): void {
    let vm = this;
    vm.spinner.show();
    vm.orders = [];
    vm.getAllOrders();
    $('.dropdown-menu').find('form').click(function (e) {
      e.stopPropagation();
    });
  }
  getAllOrders() {
    let vm = this;
    vm.service
      .getOrders()
      .subscribe((data: any) => {
        vm.spinner.hide();
        if (data.status == 200) {
          vm.orders = data;
        }
        else {
          alert(data.message)
        }
        // console.log(vm.orders);
      });
  }
  showOrderInfo(orderInfo) {
    let vm = this;
    vm.isOrders = false;
    vm.isOrderInfo = true;
    vm.orderInfo = orderInfo;
    vm.selectedOrderStatus = '0';
    vm.orderRemarks = '';
    //console.log(vm.orderInfo);
  }
  hideOrderInfo() {
    let vm = this;
    vm.isOrders = true;
    vm.isOrderInfo = false;
  }
  isEmpty(val) {
    return (val === 0 || val === '0' || val === false || val === '' || val === undefined || val == null || val.length <= 0) ? true : false;
  }
  presentAlert(msg) {
    bootbox.alert({
      message: msg,
      backdrop: true
    });
  }
  updateOrderStatus() {
    let vm = this;
    if (vm.isEmpty(vm.selectedOrderStatus)) {
      vm.presentAlert('Please select a order status!')
    } else {
      let postData = {
        "Status": parseInt(vm.selectedOrderStatus ? vm.selectedOrderStatus : '1'),
        "Remarks": vm.orderRemarks ? vm.orderRemarks : ''
      }
      let orderId = vm.orderInfo ? vm.orderInfo.id : '0';
      vm.spinner.show();
      vm.service.updateOrderStatus(orderId, postData).subscribe((data: any) => {
        vm.spinner.hide();
        vm.isOrders = true;
        vm.isOrderInfo = false;
        vm.toastr.info('Order status upgraded successfully');
        vm.getAllOrders();
      });
    }
  }
}
