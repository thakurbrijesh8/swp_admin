<tr id="manufacturer_info_{{manufaturer_cnt}}" class="manufacturer_info" style="background-color: #fff;">
    <td style="width: 5px;">
        <input type="hidden" class='temp_cnt' value="{{manufaturer_cnt}}"><span class="display-manucaturer-cnt">{{manufaturer_cnt}}</span>
    </td>
    <td>
        <input type="text" id="month_{{manufaturer_cnt}}" name="month_{{manufaturer_cnt}}" maxlength="100" class="form-control" 
              value="{{month}}">
        <span class="error-message error-message-periodicalreturn-month_{{manufaturer_cnt}}"></span> 
    </td>
    <td>
        <input type="text" id="ulsold_stock_{{manufaturer_cnt}}" name="ulsold_stock_{{manufaturer_cnt}}" class="form-control"
               maxlength="100"  value="{{ulsold_stock}}">
        <span class="error-message error-message-periodicalreturn-ulsold_stock_{{manufaturer_cnt}}"></span>
    </td>
    <td>
        <input type="text" id="quantity_{{manufaturer_cnt}}" name="quantity_{{manufaturer_cnt}}" class="form-control"
               maxlength="100"  value="{{quantity}}">
        <span class="error-message error-message-periodicalreturn-quantity_{{manufaturer_cnt}}"></span>
    </td>
      <td>
        <input type="text" id="total_{{manufaturer_cnt}}" name="total_{{manufaturer_cnt}}" class="form-control"
               maxlength="100" value="{{total}}">
        <span class="error-message error-message-periodicalreturn-total_{{manufaturer_cnt}}"></span>
    </td>
       <td>
        <input type="text" id="itemsold_{{manufaturer_cnt}}" name="itemsold_{{manufaturer_cnt}}" class="form-control"
               maxlength="100"  value="{{itemsold}}">
        <span class="error-message error-message-periodicalreturn-itemsold_{{manufaturer_cnt}}"></span>
    </td>
     <td>
        <input type="text" id="dispatchno_{{manufaturer_cnt}}" name="dispatchno_{{manufaturer_cnt}}" class="form-control"
               maxlength="100" value="{{dispatchno}}">
        <span class="error-message error-message-periodicalreturn-dispatchno_{{manufaturer_cnt}}"></span>
    </td>
     
    <td class="text-center">
        <button type="button" class="btn btn-xs btn-danger" style="margin-top: 2px;" onclick="Periodicalreturn.listview.removeManufacturerInfo({{manufaturer_cnt}});">
            <label class="fa fa-trash label-btn-icon"></label>
        </button>
    </td>
</tr>
