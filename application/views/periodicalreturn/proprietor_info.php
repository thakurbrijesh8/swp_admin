<tr id="proprietor_info_{{per_cnt}}" class="proprietor_info" style="background-color: #fff;">
    <td style="width: 5px;">
        <input type="hidden" class='temp_cnt' value="{{per_cnt}}"><span class="display-cnt">{{per_cnt}}</span>
    </td>
    <td>
        <input type="text" id="month_{{per_cnt}}" name="month_{{per_cnt}}" maxlength="100" class="form-control" 
                value="{{month}}">
        <span class="error-message error-message-periodicalreturn-month_{{per_cnt}}"></span> 
    </td>
    <td>
        <input type="text" id="ulsold_stock_{{per_cnt}}" name="ulsold_stock_{{per_cnt}}" class="form-control"
               maxlength="100" value="{{ulsold_stock}}">
        <span class="error-message error-message-periodicalreturn-ulsold_stock_{{per_cnt}}"></span>
    </td>
    <td>
        <input type="text" id="brought_within_{{per_cnt}}" name="brought_within_{{per_cnt}}" class="form-control"
               maxlength="100" value="{{brought_within}}">
        <span class="error-message error-message-periodicalreturn-brought_within_{{per_cnt}}"></span>
    </td>
       <td>
        <input type="text" id="broughtouside_{{per_cnt}}" name="broughtouside_{{per_cnt}}" class="form-control"
               maxlength="100" value="{{broughtouside}}">
        <span class="error-message error-message-periodicalreturn-broughtouside_{{per_cnt}}"></span>
    </td>
      <td>
        <input type="text" id="total_{{per_cnt}}" name="total_{{per_cnt}}" class="form-control"
               maxlength="100" value="{{total}}">
        <span class="error-message error-message-periodicalreturn-total_{{per_cnt}}"></span>
    </td>
    <td class="text-center">
        <button type="button" class="btn btn-xs btn-danger" style="margin-top: 2px;" onclick="Periodicalreturn.listview.removeProprietorInfo({{per_cnt}});">
            <label class="fa fa-trash label-btn-icon"></label>
        </button>
    </td>
</tr>
