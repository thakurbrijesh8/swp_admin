<tr id="questionary_item_{{cnt}}" class="questionary_item" style="background-color: #fff;">
    <td class="text-center">
        <input type="hidden" class='questionary_item_cnt' value="{{cnt}}">
        <span class="display-cnt f-w-b">{{cnt}}</span>
    </td>
    <td>
        <input type="text" id="question_for_service_{{cnt}}"
               class="form-control" placeholder="Enter Question !"
               onblur="checkValidation('service', 'question_for_service_{{cnt}}', enterQuestionValidationMessage);"
               value="{{question}}">
        <span class="error-message error-message-service-question_for_service_{{cnt}}"></span> 
    </td>
    <td class="text-center">
        <div id="answer_container_for_service_{{cnt}}"></div>
        <span class="error-message error-message-service-answer_for_service_{{cnt}}"></span>
    </td>
    <td class="text-center">
        <button type="button" class="btn btn-sm btn-danger" style="margin-top: 2px;" onclick="$('#questionary_item_{{cnt}}').remove(); resetCounter('display-cnt');">
            <label class="fa fa-trash label-btn-icon"></label>
        </button>
    </td>
</tr>