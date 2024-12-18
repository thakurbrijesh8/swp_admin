<div class="card-header">
    <h4 class="card-title f-w-b" style="float: none; text-align: center;">
        {{title}} for State Cinema Regulations
    </h4>
</div>
<div class="card-body p-b-0px text-left" style="font-size: 13px;">
    <div class="row">
        <div class="col-sm-12 text-left">

        </div>
    </div>
    <div class="table-responsive">
        <table class="table table-bordered table-padding bg-beige">
            <tr>
                <td class="f-w-b" style="width: 40%;">Application Number</td>
                <td>{{application_number}}</td>
            </tr>
            <tr>
                <td class="f-w-b text-left" style="width: 40%;">District</td>
                <td class="text-left">{{district_text}}</td>
            </tr>
            <tr>
                <td class="f-w-b text-left">Entity / Establishment Type</td>
                <td class="text-left">{{entity_establishment_type}}</td>
            </tr>
            <tr>
                <td class="f-w-b text-left">Name of applicant</td>
                <td class="text-left">{{name_of_applicant}}</td>
            </tr>
            <tr>
                <td class="f-w-b text-left"> Father's Name</td>
                <td class="text-left">{{father_name}}</td>
            </tr>
            <tr>
                <td class="f-w-b text-left">Date of Birth</td>
                <td class="text-left">{{dob}}</td>
            </tr>
            <tr>
                <td class="f-w-b text-left">Permanent Address</td>
                <td class="text-left">{{permanent_address}}</td>
            </tr>
            <tr>
                <td class="f-w-b text-left">Temporary Address</td>
                <td class="text-left">{{temporary_address}}</td>
            </tr>
        </table>
    </div>
    <div class="table-responsive">
        <table class="table table-bordered table-padding">
            <thead>
                <tr>
                    <td class="f-w-b text-left v-a-m bg-beige" style="width: 60px;">Name of place and description where exhibition of film for public shall be made by the video cassette Recorder Link</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="text-left">{{video_cassette_recorder}}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="table-responsive">
        <table class="table table-bordered table-padding">
            <thead>
                <tr>
                    <td class="f-w-b text-left v-a-m bg-beige" style="width: 60px;">Documents referred to in rule 11 of the Dadra and Nagar Haveli & Daman and Diu Cinema ( Regulation of Exhibition by Video ) Rules 1985 namely</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="text-left">(a) - In the case of a building ?</label>&nbsp;&nbsp;&nbsp;<input type="checkbox" id="is_case_of_building" name="is_case_of_building" class="checkbox" {{#if show_bd_div}}checked{{/if}} disabled=""></td>
                </tr>
            </tbody>
        </table>
    </div>
    {{#if show_bd_div}}
        <hr class="m-b-1rem">

        <div class="row building_details_div">
            <div class="form-group col-sm-12 " id="plan_of_building_document_container">
                <label>I. Please attach the site plan of the building as approved by the Mamlatdar in counsultation with Associate Town
                    Planner, and give the names, places and distance by public road of the Proposed site to the nearest place of exhibition etc. Attached</label><br>
            </div>
            <div class="form-group col-sm-12">
                {{#if show_plan_of_building_document}}
                    <a target="_blank" href="{{CINEMA_DOC_PATH}}{{plan_of_building_document}}">
                        <label class="btn btn-sm btn-nic-blue f-w-n cursor-pointer mb-1">
                            <i class="fas fa-download"></i> &nbsp; plan of building document
                        </label>
                    </a>
                {{/if}}
            </div>
        </div>
        <div class="table-responsive building_details_div">
            <table class="table table-bordered table-padding">
                <thead>
                    <tr>
                        <td class="f-w-b text-left v-a-m bg-beige">NAME</td>
                        <td class="f-w-b text-left v-a-m bg-beige">PLACE</td>
                        <td class="f-w-b text-left v-a-m bg-beige">DISTANCE</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-left">{{name_of_building}}</td>
                        <td class="text-left">{{place_of_building}}</td>
                        <td class="text-left">{{distance_of_building}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="table-responsive building_details_div">
            <table class="table table-bordered table-padding">
                <thead>
                    <tr>
                        <td class="f-w-b text-left v-a-m bg-beige">No such place within radious of 300 meters from the proposed Video house.</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-left">1. Exhibition of film on Television, screen through Video cassette recorder.</td>
                    </tr>
                    <tr>
                        <td class="text-left">2. School, Collage etc. </td>
                    </tr>
                    <tr>
                        <td class="text-left">3. Hospital etc. </td>
                    </tr>
                    <tr>
                        <td class="text-left">4. Temples, Mosques, Church and other religious institution </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="f-w-b f-s-16px text-left">Enclosed as below :-</div>
        <div class="row building_details_div" style="display: none">
            <div class="form-group col-sm-12">
                {{#if show_character_licence_certificate}}
                    <a target="_blank" href="{{CINEMA_DOC_PATH}}{{character_licence_certificate}}">
                        <label class="btn btn-sm btn-nic-blue f-w-n cursor-pointer mb-1">
                            <i class="fas fa-download"></i> &nbsp; II. Certificate of Chief of Police regarding character of the license
                        </label>
                    </a>
                {{/if}}
            </div>
            <div class="form-group col-sm-12">
                {{#if show_photo_state_copy}}
                    <a target="_blank" href="{{CINEMA_DOC_PATH}}{{photo_state_copy}}">
                        <label class="btn btn-sm btn-nic-blue f-w-n cursor-pointer mb-1">
                            <i class="fas fa-download"></i> &nbsp; III. Photo-state copy of license obtained for the commercial
                        </label>
                    </a>
                {{/if}}
            </div>
        </div>
        <div class="row building_details_div" style="display: none">
            <div class="form-group col-sm-12">
                {{#if show_ownership_document}}
                    <a target="_blank" href="{{CINEMA_DOC_PATH}}{{ownership_document}}">
                        <label class="btn btn-sm btn-nic-blue f-w-n cursor-pointer mb-1">
                            <i class="fas fa-download"></i> &nbsp; IV. Documents showing the ownership or tenancy of the place
                        </label>
                    </a>
                {{/if}}
            </div>
            <div class="form-group col-sm-12">
                {{#if show_motor_vehicles_document}}
                    <a target="_blank" href="{{CINEMA_DOC_PATH}}{{motor_vehicles_document}}">
                        <label class="btn btn-sm btn-nic-blue f-w-n cursor-pointer mb-1">
                            <i class="fas fa-download"></i> &nbsp; V.The documents of its registration under the motor Vehicles Act, 1939
                        </label>
                    </a>
                {{/if}}
            </div>
        </div>
    {{/if}}
    <div class="row">
        <div class="form-group col-sm-12">
            <label>9. If any other trade or business is located in the main premises where the video shows are to be exhibited :</label>
        </div>
    </div>
    <div class="row">
        <div class="form-group col-sm-12">
            {{#if show_business_trade_authority_license}}
                <a target="_blank" href="{{CINEMA_DOC_PATH}}{{business_trade_authority_license}}">
                    <label class="btn btn-sm btn-nic-blue f-w-n cursor-pointer mb-1">
                        <i class="fas fa-download"></i> &nbsp; I. Has license for such trade or business has been from the competent authority
                    </label>
                </a>
            {{/if}}
        </div>
    </div>
    <div class="table-responsive">
        <table class="table table-bordered table-padding">
            <thead>
                <tr>
                    <td class="f-w-b text-left v-a-m bg-beige">II. Whether by conducting the Video exhibitions the trade or business for which the license has been granted is likely to be affected.</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="text-left">{{tb_license_affected}}</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="row" style="margin-top: 20px;">
        <div class="form-group col-sm-12">
            <label class="text-left">10. Area in square of the</label>
        </div>
    </div>
    <div class="table-responsive">
        <table class="table table-bordered table-padding">
            <thead>
                <tr>
                    <td class="f-w-b text-left v-a-m bg-beige">I. Building </td>
                    <td class="f-w-b text-left v-a-m bg-beige">II. Auditorium </td>
                    <td class="f-w-b text-left v-a-m bg-beige">III. Passages and Gangways </td>
                    <td class="f-w-b text-left v-a-m bg-beige">IV. Urinals and W.C.</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="text-left">{{building_as}}</td>
                    <td class="text-left">{{auditorium_as}}</td>
                    <td class="text-left">{{passages_and_gangways_as}}</td>
                    <td class="text-left">{{urinals_and_wc_as}}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="table-responsive">
        <table class="table table-bordered table-padding">
            <thead>
                <tr>
                    <td class="f-w-b text-left v-a-m bg-beige">11. Time schedule for exhibition of film</td>
                    <td class="f-w-b text-left v-a-m bg-beige">12. Width of television screen / Video Scope Screen Setting arrangement in the building </td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="text-left">{{time_schedule_film}}</td>
                    <td class="text-left">{{screen_width}}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="row">
        <div class="col-12 m-b-5px" id="seal_and_stamp_container_for_cinema">
            <label>13. Signature</label><br>
        </div>
        <div class="form-group col-sm-12">
            {{#if show_signature}}
                <img style="border: 2px solid blue; width: 160px; height: 180px;"
                    src="{{CINEMA_DOC_PATH}}{{signature}}">
            {{/if}}
        </div>
    </div>
    <hr class="m-b-1rem">
    <div class="form-group button-right text-right">
        <button type="button" class="btn btn-sm btn-danger " onclick="window.print();" id="pa_btn_for_icview">
            <i class="fas fa-file-pdf mr-1"></i> Print Application
        </button>
        <button type="button" class="btn btn-sm btn-danger " onclick="Swal.close();"><i class="fas fa-times"></i>&nbsp; Close</button>
    </div>
</div>