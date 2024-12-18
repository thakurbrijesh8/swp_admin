<div class="card-header">
    <h4 class="card-title f-w-b" style="float: none; text-align: center;">
        {{title}} for Permission from District Collector for Movie Shooting Form
    </h4>
</div>
<div class="card-body p-b-0px text-left" style="font-size: 13px; ">
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
                    <td class="f-w-b text-left">District </td>
                    <td class="text-left">{{district_text}}</td>
                </tr>
                <tr>
                    <td class="f-w-b text-left">Entity / Establishment Type</td>
                    <td class="text-left">{{entity_establishment_type}}</td>
                </tr>
                <tr>
                    <td class="f-w-b text-left">Production House/Company/Producer</td>
                    <td class="text-left">{{production_house}}</td>
                </tr>
                <tr>
                    <td class="f-w-b text-left"> Permanent Address</td>
                    <td class="text-left">{{address}}</td>
                </tr>
                <tr>
                    <td class="f-w-b text-left"> Production Manager (Line Producer In U.T. of Dadra and Nagar Haveli & Daman and Diu)</td>
                    <td class="text-left">{{production_manager}}</td>
                </tr>
                <tr>
                    <td class="f-w-b text-left">Contact No's/Facsimile</td>
                    <td class="text-left">{{contact_no}}</td>
                </tr>
                <tr>
                    <td class="f-w-b text-left">E-Mail</td>
                    <td class="text-left">{{email}}</td>
                </tr>
                <tr>
                    <td class="f-w-b text-left">Director/Cast</td>
                    <td class="text-left">{{director_cast}}</td>
                </tr>
                <tr>
                    <td class="f-w-b text-left">Film Title</td>
                    <td class="text-left">{{film_title}}</td>
                </tr>
                <tr>
                    <td class="f-w-b text-left">Film Synopsis Mandatory (In 100 Words)</td>
                    <td class="text-left">{{film_synopsis}}</td>
                </tr>
                <tr>
                    <td class="f-w-b text-left">Number Of Film Shooting Days In Goa</td>
                    <td class="text-left">{{film_shooting_days}}</td>
                </tr>
                <tr>
                    <td class="f-w-b text-left">Film Shooting Locations</td>
                    <td class="text-left">{{shooting_location}}</td>
                </tr>
                <tr>
                    <td class="f-w-b text-left"> Film Shooting date (s) & timings</td>
                    <td class="text-left">{{shooting_date_time}}</td>
                </tr>
                <tr>
                    <td class="f-w-b text-left"> If Any Defense Installations Are Involved</td>
                    <td class="text-left">{{defense_installation}}</td>
                </tr>
            </table>
        </div>
    <div class="form-group col-sm-12" id="declaration_container_for_filmshooting">
        <label>13 .Negative Portrayal Of The U.T. of Dadra and Nagar Haveli & Daman and Diu in Any Manne
            r Is Not Permitted And Will Not Be Allowed. Therefore The Producer/ Production Company May Submit
            A Declaration To This Effect</label><br>
        {{#if show_declaration}}
            <a target="_blank" href="{{FILMSHOOTING_DOC_PATH}}{{declaration}}">
                <label class="btn btn-sm btn-nic-blue f-w-n cursor-pointer mb-1">
                    <i class="fas fa-download"></i> &nbsp; Negative Portrayal
                </label>
            </a>
        {{/if}}
    </div>
    <div class="table-responsive">
        <table class="table table-bordered table-padding">
            <tr>
                <td class="f-w-b text-left v-a-m bg-beige" style="width: 40%;">14. Signed By The Producer (Of The Film)</td>
                <td class="f-w-b text-left v-a-m bg-beige">15. Signature Of Authorized Representative</td>
                <td class="f-w-b text-left v-a-m bg-beige">16. Seal Of Company</td>
            </tr>
            <tr>
                <td>
                    {{#if show_producer_signature}}
                        <img style="border: 2px solid blue; width: 160px; height: 180px;"
                            src="{{FILMSHOOTING_DOC_PATH}}{{producer_signature}}">
                    {{/if}}
                </td>
                <td>
                    {{#if show_authorized_representative_sign}}
                        <img style="border: 2px solid blue; width: 160px; height: 180px;"
                            src="{{FILMSHOOTING_DOC_PATH}}{{authorized_representative_sign}}">
                    {{/if}}
                </td>
                <td>
                    {{#if show_seal_of_company}}
                        <img style="border: 2px solid blue; width: 160px; height: 180px;"
                            src="{{FILMSHOOTING_DOC_PATH}}{{seal_of_company}}">
                    {{/if}}
                </td>
            </tr>
        </table>
    </div>    
    <h2 class="box-title f-w-b page-header color-nic-blue f-s-20px m-b-0" style="text-align: center">UNDERTAKING / DECLARAUON</h2>
    <div class="table-responsive">
        <table class="table table-bordered table-padding">
            <thead>
                <tr>
                    <td class="f-w-b text-left v-a-m bg-beige" style="width: 60px;">I the undersigned</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="text-left">{{undersigned}}</td>
                </tr>
            </tbody>
            <thead>
                <tr>
                    <td class="f-w-b text-left v-a-m bg-beige" style="width: 60px;">aged years:</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="text-left">{{aged}}</td>
                </tr>
            </tbody>
            <thead>
                <tr>
                    <td class="f-w-b text-left v-a-m bg-beige" style="width: 60px;">resident of District Daman:</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="text-left">{{resident}}</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="form-group col-sm-12 text-left">
        do hereby declare that tho lnformation stated herein is truo to the best of my knowlodgo and belief and nothing has been concealod therein. I am woll aware of the tact that if the information given by me ls proved falselnot true, I will have to face the punishment or fine as per the taw and that the benefits availed by me shall be summarily withdrawn.
    </div>

    <div class="table-responsive">
        <table class="table table-bordered table-padding">
            <thead>
                <tr>
                    <td class="f-w-b text-left v-a-m bg-beige" style="width: 60px;">That, I have applied to the District Magistrate, Daman to issue me permission for (Purpose )</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="text-left">{{purpose}}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="row text-left">
        <div class="form-group col-sm-12">
            Tlrat l' have submitted an application and conditions on it is true and correct to the best of my lknowledge.
        </div>
    </div>
    <div class="row text-left">
        <div class="form-group col-sm-12">
            I will he re$ponsible for occurance of any untowards incidents during the said permis$lon period.
        </div>
    </div>
    <div class="row text-left">
        <div class="form-group col-sm-12">
            And, in case of any lssue or probabtlity of lssue/event leading to Law and Order problem, I will immediately inform to the Police and Authority concerned.
        </div>
    </div>
    <div class="row text-left">
        <div class="form-group col-sm-12">
            I also ta6e responsibility to make sure that noiselvolume during event/function will not exceed the limit fixed by the rule and authority.
        </div>
    </div>
    <div class="row text-left">
        <div class="form-group col-sm-12">
            I also undertake the responsibility to make sure that all tire'flghting arrangement, parking facility and security during the evenU{unction are ln place and functional.
        </div>
    </div>
    <div class="row text-left">
        <div class="form-group col-sm-12">
            It is undertaking that I have read and understood .the provisron of Section 199 and 200 of the lndian Penal Code.
        </div>
    </div>
    <div class="table-responsive">
        <table class="table table-bordered table-padding">
            <thead>
                <tr>
                    <td class="f-w-b text-left v-a-m bg-beige" style="width: 60px;">Witness-1 Name</td>
                    <td class="f-w-b text-left v-a-m bg-beige" style="width: 60px;">Witness-2 Name</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="text-left">{{witness_one_name}}</td>
                    <td class="text-left">{{witness_two_name}}</td>
                </tr>
            </tbody>
            <tbody>
                <tr>
                    <td class="text-left">
                        {{#if show_witness_one_sign}}
                            <img style="border: 2px solid blue; width: 160px; height: 180px;"
                                src="{{FILMSHOOTING_DOC_PATH}}{{witness_one_sign}}">
                        {{/if}}
                    </td>
                    <td class="text-left">
                        {{#if show_witness_two_sign}}
                            <img style="border: 2px solid blue; width: 160px; height: 180px;"
                                src="{{FILMSHOOTING_DOC_PATH}}{{witness_two_sign}}">
                        {{/if}}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <hr class="m-b-1rem">
    <div class="form-group button-right text-right">
        <button type="button" class="btn btn-sm btn-danger " onclick="window.print();" id="pa_btn_for_icview">
            <i class="fas fa-file-pdf mr-1"></i> Print Application
        </button>
        <button type="button" class="btn btn-sm btn-danger " onclick="Swal.close();"><i class="fas fa-times"></i>&nbsp; Close</button>
    </div>
</div>
</div>