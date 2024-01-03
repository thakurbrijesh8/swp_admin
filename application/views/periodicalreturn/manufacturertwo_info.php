<tr id="manufacturertwo_info_{{manufacturer_cnt}}" class="manufacturertwo_info" style="background-color: #fff;">
    <td style="width: 5px;">
        <input type="hidden" class='temp_cnt' value="{{manufacturer_cnt}}"><span class="display-manufacturertwo-cnt">{{manufacturer_cnt}}</span>
    </td>
    <td>
        <input type="text" id="state_{{manufacturer_cnt}}" name="state_{{manufacturer_cnt}}" maxlength="100" class="form-control" 
              value="{{state}}">
        <span class="error-message error-message-periodicalreturn-state_{{manufacturer_cnt}}"></span> 
    </td>
          <td>
        <input type="text" id="itemsold_{{manufacturer_cnt}}" name="itemsold_{{manufacturer_cnt}}" class="form-control"
               maxlength="100"  value="{{itemsold}}">
        <span class="error-message error-message-periodicalreturn-itemsold_{{manufacturer_cnt}}"></span>
    </td>
       <td>
        <input type="text" id="dispatchno_{{manufacturer_cnt}}" name="dispatchno_{{manufacturer_cnt}}" class="form-control"
               maxlength="100" value="{{dispatchno}}">
        <span class="error-message error-message-periodicalreturn-dispatchno_{{manufacturer_cnt}}"></span>
    </td>
    <td>
         <input type="text" id="total_{{manufacturer_cnt}}" name="total_{{manufacturer_cnt}}" class="form-control"
               maxlength="100" value="{{total}}">
        <span class="error-message error-message-periodicalreturn-total_{{manufacturer_cnt}}"></span>
    </td>
    <td>
        <input type="text" id="balance_{{manufacturer_cnt}}" name="balance_{{manufacturer_cnt}}" class="form-control"
               maxlength="100"  value="{{balance}}">
        <span class="error-message error-message-periodicalreturn-balance_{{manufacturer_cnt}}"></span>
    </td>
    <td>
        <input type="text" id="remarks_{{manufacturer_cnt}}" name="remarks_{{manufacturer_cnt}}" class="form-control"
               maxlength="100"  value="{{remarks}}">
        <span class="error-message error-message-periodicalreturn-remarks_{{manufacturer_cnt}}"></span>
    </td>
    <td class="text-center">
        <button type="button" class="btn btn-xs btn-danger" style="margin-top: 2px;" onclick="Periodicalreturn.listview.removeManufacturertwoInfo({{manufacturer_cnt}});">
            <label class="fa fa-trash label-btn-icon"></label>
        </button>
    </td>
</tr>
