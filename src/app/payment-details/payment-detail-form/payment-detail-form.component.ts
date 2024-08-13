import { Component } from '@angular/core';
import { PaymentDetailService } from 'src/app/services/payment-detail.service';
import { NgForm} from '@angular/forms'
import { PaymentDetail } from 'src/app/services/payment-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styleUrls: ['./payment-detail-form.component.css']
})
export class PaymentDetailFormComponent {
  constructor(public service : PaymentDetailService,private toastr:ToastrService)
  {}

  onSubmit(form:NgForm)
  {
    this.service.formSubmitted = true
    if(form.valid)
    {
     if(this.service.formData.paymentDetailId == 0)
      this.insertRecord(form)
     else
        this.updateRecord(form)
    }
  }
  insertRecord(form :NgForm){
    this.service.postPaymentDetail().subscribe({
      next : res => {
            this.service.list = res as PaymentDetail[]
            this.service.resetForm(form)
            this.toastr.success('Inserted Successfully !...','Payment Detail Register')
      },
      error : err => {
        console.log(err)
      }
     })
  }
  updateRecord(form :NgForm){
    this.service.putPaymentDetail().subscribe({
      next : res => {
            this.service.list = res as PaymentDetail[]
            this.service.resetForm(form)
            this.toastr.info('Updated Successfully !...','Payment Detail Register')
      },
      error : err => {
        console.log(err)
      }
     })
  }
}
