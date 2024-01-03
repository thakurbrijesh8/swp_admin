<tr id="welders_info_{{welder_cnt}}" class="welders_info" style="background-color: #fff;">
    <td style="width: 5px;">
        <input type="hidden" class='temp_cnt' value="{{welder_cnt}}"><span class="display-count">{{welder_cnt}}</span>
    </td>
    <td>
        <input type="text" id="welders_name_{{welder_cnt}}" name="welders_name_{{welder_cnt}}" maxlength="100" class="form-control" 
               onblur="checkValidation('boiler-manufacture', 'welders_name_{{welder_cnt}}', welderNameValidationMessage);" value="{{welders_name}}">
        <span class="error-message error-message-boiler-manufacture-welders_name_{{welder_cnt}}"></span> 
    </td>
    <td>
        <input type="text" id="welders_experience_{{welder_cnt}}" name="welders_experience_{{welder_cnt}}" class="form-control"
               maxlength="100" onblur="checkValidation('boiler-manufacture', 'welders_experience_{{welder_cnt}}', experienceValidationMessage);" value="{{welders_experience}}">
        <span class="error-message error-message-boiler-manufacture-welders_experience_{{welder_cnt}}"></span>
    </td>
   <!--  <td>
        <input type="file" id="welders_certificate_{{welder_cnt}}" name="welders_certificate_{{welder_cnt}}"
               accept="image/jpg,image/png,image/jpeg,image/gif" onchange="imagePdfValidation(this, weldersCertificateValidationMessage, 'welders_certificate');">
        <h5 id="welders_certificate_container" style="display: none; margin-top: 0px;"></h5>
        <span class="error-message error-message-boiler-act-welders_certificate"></span>
    </td> -->
    <td class="text-center">
        <button type="button" class="btn btn-xs btn-danger" style="margin-top: 2px;" onclick="BoilerManufacture.listview.removeWeldersInfo({{welder_cnt}});">
            <label class="fa fa-trash label-btn-icon"></label>
        </button>
    </td>
</tr>
