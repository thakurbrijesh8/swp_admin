<tr id="principle_product_info_{{prod_cnt}}" class="principle_product_info" style="background-color: #fff;">
    <td style="width: 5px;">
        <input type="hidden" class='temp_cnt' value="{{prod_cnt}}"><span class="display-cnt">{{prod_cnt}}</span>
    </td>
    <td>
        <input type="text" id="product_name_{{prod_cnt}}" name="product_name_{{prod_cnt}}" maxlength="100" class="form-control" 
               onblur="checkValidation('factory-license', 'product_name_{{prod_cnt}}', productNameValidationMessage);" value="{{product_name}}">
        <span class="error-message error-message-factory-license-member_name_{{prod_cnt}}"></span> 
    </td>
    <td>
        <input type="text" id="product_value_{{prod_cnt}}" name="product_value_{{prod_cnt}}" class="form-control"
               maxlength="100" onblur="checkValidation('contractor', 'product_value_{{prod_cnt}}', productValueValidationMessage);" value="{{product_value}}">
        <span class="error-message error-message-factory-license-product_value_{{prod_cnt}}"></span>
    </td>
    <td>
        <button type="button" class="btn btn-xs btn-danger" style="margin-top: 2px;" onclick="FactoryLicense.listview.removeProductInfo({{prod_cnt}});">
            <label class="fa fa-trash label-btn-icon"></label>
        </button>
    </td>
</tr>
