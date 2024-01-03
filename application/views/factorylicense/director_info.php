<tr id="director_info_{{director_cnt}}" class="director_info" style="background-color: #fff;">
    <td style="width: 5px;">
        <input type="hidden" class='temp_cnt' value="{{director_cnt}}"><span class="display-cnt-dir">{{director_cnt}}</span>
    </td>
    <td>
        <input type="text" id="director_name_{{director_cnt}}" name="director_name_{{director_cnt}}" maxlength="100" class="form-control" placeholder="Enter Director Name !" value="{{director_name}}">
        <span class="error-message error-message-factory-license-director_name_{{director_cnt}}"></span> 
    </td>
    <td>
        <button type="button" class="btn btn-xs btn-danger" style="margin-top: 2px;" onclick="FactoryLicense.listview.removeDirectorInfo({{director_cnt}});">
            <label class="fa fa-trash label-btn-icon"></label>
        </button>
    </td>
</tr>
