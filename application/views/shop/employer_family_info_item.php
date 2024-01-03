<tr id="employer_family_info_{{item_cnt}}" class="employer_family_info" style="background-color: #fff;">
    <td>
        <input type="hidden" class='temp_cnt' value="{{item_cnt}}"><span class="display-employees-cnt">{{item_cnt}}</span>
    </td>
    <td>
        <input type="text" id="member_name_{{item_cnt}}" name="member_name_{{item_cnt}}" maxlength="100" class="form-control" 
               value="{{familyName}}" placeholder="Name !">
    </td>
    <td>
        <input type="text" id="member_relationship_{{item_cnt}}" name="member_relationship_{{item_cnt}}" class="form-control"
               maxlength="100"  value="{{familyRelationship}}" placeholder="Relationship !">
    </td>
    <td>&emsp;
        <input type="radio" id="member_gender_male_{{item_cnt}}" name="member_gender_{{item_cnt}}" class="" value="{{VALUE_ONE}}">&nbsp; Male<br>
        &emsp;
        <input type="radio" id="member_gender_female_{{item_cnt}}" name="member_gender_{{item_cnt}}" class="" style="margin-bottom: 0px;"
               maxlength="100" o value="{{VALUE_TWO}}">&nbsp;Female
    </td>
    <td class="text-center">
        <input type="checkbox" id="member_adult_{{item_cnt}}" name="member_adult_{{item_cnt}}" class="checkbox" 
               value="{{is_checked}}">
    </td>
    <td class="text-center">
        <input type="checkbox" id="member_young_person_{{item_cnt}}" name="member_young_person_{{item_cnt}}" class="checkbox" maxlength="10"  
               value="{{is_checked}}">
    </td>
    <td hidden>
        <input type="hidden" id='contractor_id_{{item_cnt}}' value="{{contractor_id}}">
    </td>
    <td class="text-center">
        <button type="button" class="btn btn-xs btn-danger" style="margin-top: 2px;" onclick="Shop.listview.removeFamilyMembers({{item_cnt}});">
            <label class="fa fa-trash label-btn-icon"></label>
        </button>
    </td>
</tr>
