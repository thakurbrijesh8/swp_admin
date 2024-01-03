<tr id="partner_info_{{item_cnt}}" class="partner_info" style="background-color: #fff;">
    <td>
        <input type="hidden" class='temp_cnt' value="{{item_cnt}}"><span class="display-cnt">{{item_cnt}}</span>
    </td>
    <td>
        <input type="text" id="partner_name_{{item_cnt}}" name="partner_name_{{item_cnt}}" maxlength="100" class="form-control partner_name" placeholder="Full Name of the Partner !"
                value="{{name}}">
        <span class="error-message error-message-shop-partner_name_{{item_cnt}}"></span> 
    </td>
    <td>
        <textarea type="text" id="partner_address_{{item_cnt}}" name="partner_address_{{item_cnt}}" class="form-control partner_address" placeholder="Full Address of the Partner !"
                  maxlength="100">{{address}}</textarea>
        <span class="error-message error-message-shop-partner_address_{{item_cnt}}"></span>
    </td>
    <td class="text-center remove_btn_hidden">
        <button type="button" class="btn btn-xs btn-danger " style="margin-top: 2px;" onclick="Shop.listview.removePartnerInfo({{item_cnt}});">
            <label class="fa fa-trash label-btn-icon"></label>
        </button>
    </td>
</tr>
