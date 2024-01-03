<tr id="repairer_info_{{detail_cnt}}" class="repairer_info" style="background-color: #fff;">
    <td style="width: 5px;">
        <input type="hidden" class='temp_cnt' value="{{detail_cnt}}"><span class="detailrepairer-cnt">{{detail_cnt}}</span>
    </td>
    <td>
        <input type="text" id="date_{{detail_cnt}}" name="date_{{detail_cnt}}" maxlength="100" class="form-control" 
              value="{{date}}">
        <span class="error-message error-message-periodicalreturn-date_{{detail_cnt}}"></span> 
    </td>
    <td>
        <input type="text" id="username_{{detail_cnt}}" name="username_{{detail_cnt}}" class="form-control"
               maxlength="100"  value="{{username}}">
        <span class="error-message error-message-periodicalreturn-username_{{detail_cnt}}"></span>
    </td>
    <td>
        <input type="text" id="items_{{detail_cnt}}" name="items_{{detail_cnt}}" class="form-control"
               maxlength="100"  value="{{items}}">
        <span class="error-message error-message-periodicalreturn-items_{{detail_cnt}}"></span>
    </td>
      <td>
        <input type="text" id="receiptno_{{detail_cnt}}" name="receiptno_{{detail_cnt}}" class="form-control"
               maxlength="100" value="{{receiptno}}">
        <span class="error-message error-message-periodicalreturn-receiptno_{{detail_cnt}}"></span>
    </td>
       <td>
        <input type="text" id="charges_{{detail_cnt}}" name="charges_{{detail_cnt}}" class="form-control"
               maxlength="100"  value="{{charges}}">
        <span class="error-message error-message-periodicalreturn-charges_{{detail_cnt}}"></span>
    </td>
     <td>
        <input type="text" id="verificsationfees_{{detail_cnt}}" name="verificsationfees_{{detail_cnt}}" class="form-control"
               maxlength="100" value="{{verificsationfees}}">
        <span class="error-message error-message-periodicalreturn-verificsationfees_{{detail_cnt}}"></span>
    </td>
     </td>
       <td>
        <input type="text" id="itemsold_{{detail_cnt}}" name="itemsold_{{detail_cnt}}" class="form-control"
               maxlength="100"  value="{{itemsold}}">
        <span class="error-message error-message-periodicalreturn-itemsold_{{detail_cnt}}"></span>
    </td>
     <td>
        <input type="text" id="total_{{detail_cnt}}" name="total_{{detail_cnt}}" class="form-control"
               maxlength="100" value="{{total}}">
        <span class="error-message error-message-periodicalreturn-total_{{detail_cnt}}"></span>
    </td>
    <td>
        <input type="text" id="returndate_{{detail_cnt}}" name="returndate_{{detail_cnt}}" class="form-control"
               maxlength="100" value="{{returndate}}">
        <span class="error-message error-message-periodicalreturn-returndate_{{detail_cnt}}"></span>
    </td>
     </td>
       <td>
        <input type="text" id="remarks_{{detail_cnt}}" name="remarks_{{detail_cnt}}" class="form-control"
               maxlength="100"  value="{{remarks}}">
        <span class="error-message error-message-periodicalreturn-remarks_{{detail_cnt}}"></span>
    </td>

     
    <td class="text-center">
        <button type="button" class="btn btn-xs btn-danger" style="margin-top: 2px;" onclick="Periodicalreturn.listview.removeRepairerInfo({{detail_cnt}});">
            <label class="fa fa-trash label-btn-icon"></label>
        </button>
    </td>
</tr>
