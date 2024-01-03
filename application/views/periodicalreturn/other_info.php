<tr id="other_info_{{dealer_cnt}}" class="other_info" style="background-color: #fff;">
    <td style="width: 5px;">
        <input type="hidden" class='temp_cnt' value="{{dealer_cnt}}"><span class="displaydealer-cnt">{{dealer_cnt}}</span>
    </td>
    <td>
        <input type="text" id="item_sold_{{dealer_cnt}}" name="item_sold_{{dealer_cnt}}" maxlength="100" class="form-control" 
                value="{{item_sold}}">
        <span class="error-message error-message-periodicalreturn-item_sold_{{dealer_cnt}}"></span> 
    </td>
    <td>
        <input type="text" id="dispatch_voucher_{{dealer_cnt}}" name="dispatch_voucher_{{dealer_cnt}}" class="form-control"
               maxlength="100" value="{{dispatch_voucher}}">
        <span class="error-message error-message-periodicalreturn-dispatch_voucher_{{dealer_cnt}}"></span>
    </td>
    <td>
        <input type="text" id="itemsold2_{{dealer_cnt}}" name="itemsold2_{{dealer_cnt}}" class="form-control"
               maxlength="100" value="{{itemsold2}}">
        <span class="error-message error-message-periodicalreturn-itemsold2_{{dealer_cnt}}"></span>
    </td>
       <td>
        <input type="text" id="dispatchvoucher2_{{dealer_cnt}}" name="dispatchvoucher2_{{dealer_cnt}}" class="form-control"
               maxlength="100"  value="{{dispatchvoucher2}}">
        <span class="error-message error-message-periodicalreturn-dispatchvoucher2_{{dealer_cnt}}"></span>
    </td>
      <td>
        <input type="text" id="state_name_{{dealer_cnt}}" name="state_name_{{dealer_cnt}}" class="form-control"
               maxlength="100" value="{{state_name}}">
        <span class="error-message error-message-periodicalreturn-state_name_{{dealer_cnt}}"></span>
    </td>

       <td>
        <input type="text" id="totalsold_{{dealer_cnt}}" name="totalsold_{{dealer_cnt}}" class="form-control"
               maxlength="100" value="{{totalsold}}">
        <span class="error-message error-message-periodicalreturn-totalsold_{{dealer_cnt}}"></span>
    </td>
     <td>
        <input type="text" id="totalbalance_{{dealer_cnt}}" name="totalbalance_{{dealer_cnt}}" class="form-control"
               maxlength="100" value="{{totalbalance}}">
        <span class="error-message error-message-periodicalreturn-totalbalance_{{dealer_cnt}}"></span>
    </td>
  <td>
        <input type="text" id="remarks_{{dealer_cnt}}" name="remarks_{{dealer_cnt}}" class="form-control"
               maxlength="100" value="{{remarks}}">
        <span class="error-message error-message-periodicalreturn-remarks_{{dealer_cnt}}"></span>
    </td>



    <td class="text-center">
        <button type="button" class="btn btn-xs btn-danger" style="margin-top: 2px;" onclick="Periodicalreturn.listview.removeOtherInfo({{dealer_cnt}});">
            <label class="fa fa-trash label-btn-icon"></label>
        </button>
    </td>
</tr>
