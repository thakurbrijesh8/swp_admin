<div class="row">
    <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title" style="float: none; text-align: center;">Application for Permission from District Collector for Movie Shooting Form</h3>
            </div>
            <form role="form" id="filmshooting_form" name="filmshooting_form" onsubmit="return false;">
                
                <input type="hidden" id="filmshooting_id" name="filmshooting_id" value="{{filmshooting_data.filmshooting_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-12 text-center">
                            <span class="error-message error-message-filmshooting f-w-b" style="border-bottom: 2px solid red;"></span>
                        </div>
                    </div>
                     <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1. District <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <select id="district" name="district" class="form-control select2"
                                    data-placeholder="Select District" style="width: 100%;" >
                                </select>
                            </div>
                            <span class="error-message error-message-filmshooting-district"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>1.1 Entity / Establishment Type <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                 <select id="entity_establishment_type" name="entity_establishment_type" class="form-control select2"
                                    data-placeholder="Select Entity / Establishment Type" style="width: 100%;" onblur="checkValidation('filmshooting', 'entity_establishment_type', entityEstablishmentTypeValidationMessage);">
                            </select>
                            </div>
                            <span class="error-message error-message-filmshooting-entity_establishment_type"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1.1 Production House/Company/Producer : <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="production_house" name="production_house" class="form-control" placeholder="Enter Production House/Company/Producer :  !"
                                       maxlength="100" onblur="checkValidation('filmshooting', 'production_house', productionHouseValidationMessage);" value="{{filmshooting_data.production_house}}">
                            </div>
                            <span class="error-message error-message-filmshooting-production_house"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>2. Permanent Address <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="address" name="address" class="form-control" placeholder="Enter Permanent Address !" maxlength="100" onblur="checkValidation('filmshooting', 'address', permanentAddressValidationMessage);">{{filmshooting_data.address }}</textarea>
                            </div>
                            <span class="error-message error-message-filmshooting-address"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>3. Production Manager (Line Producer In U.T. of Dadra and Nagar Haveli & Daman and Diu)  : <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="production_manager" name="production_manager" class="form-control" placeholder="Enter Production Manager  !"
                                       maxlength="100" onblur="checkValidation('filmshooting', 'production_manager', productionManagerValidationMessage);" value="{{filmshooting_data.production_manager}}">
                            </div>
                            <span class="error-message error-message-filmshooting-production_manager"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>4. Contact No's/Facsimile  : <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="contact_no" name="contact_no" class="form-control" placeholder="Enter Contact No's/Facsimile  !"
                                       maxlength="100" onkeyup="checkNumeric($(this));" onblur="checkValidation('filmshooting', 'contact_no', contactNoValidationMessage);" value="{{filmshooting_data.contact_no}}">
                            </div>
                            <span class="error-message error-message-filmshooting-contact_no"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>5. E-Mail  : <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="email" name="email" class="form-control" placeholder="Enter E-Mail  !"
                                       maxlength="100" onblur="checkValidationForEmail('filmshooting', 'email', emailValidationMessage);" value="{{filmshooting_data.email}}">
                            </div>
                            <span class="error-message error-message-filmshooting-email"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>6. Director/Cast  : <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="director_cast" name="director_cast" class="form-control" placeholder="Enter Director/Cast  !"
                                       maxlength="100" onblur="checkValidation('filmshooting', 'director_cast', directorValidationMessage);" value="{{filmshooting_data.director_cast}}">
                            </div>
                            <span class="error-message error-message-filmshooting-director_cast"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>7. Film Title : <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="film_title" name="film_title" class="form-control" placeholder="Enter Film Title  !"
                                       maxlength="100" onblur="checkValidation('filmshooting', 'film_title', filmTitleValidationMessage);" value="{{filmshooting_data.film_title}}">
                            </div>
                            <span class="error-message error-message-filmshooting-film_title"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>8. Film Synopsis Mandatory (In 100 Words)  <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="film_synopsis" name="film_synopsis" class="form-control" placeholder="Enter Film Synopsis Mandatory (In 100 Words)  !" maxlength="100" onblur="checkValidation('filmshooting', 'film_synopsis', filmSynopsisValidationMessage);">{{filmshooting_data.film_synopsis}}</textarea>
                            </div>
                            <span class="error-message error-message-filmshooting-film_synopsis"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>9. Number Of Film Shooting Days In Goa  : <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="film_shooting_days" name="film_shooting_days" class="form-control" placeholder="Enter Number Of Film Shooting Days In Goa  !"
                                       maxlength="100" onkeyup="checkNumeric($(this));" onblur="checkValidation('filmshooting', 'film_shooting_days', filmShootingDaysValidationMessage);" value="{{filmshooting_data.film_shooting_days}}">
                            </div>
                            <span class="error-message error-message-filmshooting-film_shooting_days"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>10. Film Shooting Locations  : <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="shooting_location" name="shooting_location" class="form-control" placeholder="Enter Film Shooting Locations  !"
                                       maxlength="100" onblur="checkValidation('filmshooting', 'shooting_location', shootingLocationValidationMessage);" value="{{filmshooting_data.shooting_location}}">
                            </div>
                            <span class="error-message error-message-filmshooting-shooting_location"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>11. Film Shooting date (s) & timings<span style="color: red;">*</span></label>
                            <div class="input-group date">
                                <input type="text" name="shooting_date_time" id="shooting_date_time" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{shooting_date_time}}" onblur="checkValidation('filmshooting', 'shooting_date_time', shootingDateValidationMessage);">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-filmshooting-shooting_date_time"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>12. If Any Defense Installations Are Involved  <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="defense_installation" name="defense_installation" class="form-control" placeholder="Enter If Any Defense Installations Are Involved  !" maxlength="100" onblur="checkValidation('filmshooting', 'defense_installation', defenseInstallationValidationMessage);">{{filmshooting_data.defense_installation}}</textarea>
                            </div>
                            <span class="error-message error-message-filmshooting-defense_installation"></span>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="form-group col-sm-12" id="declaration_container_for_filmshooting">
                            <label>13 .Negative Portrayal Of The U.T. of Dadra and Nagar Haveli & Daman and Diu in Any Manner Is Not Permitted And Will Not Be Allowed. Therefore The Producer/ Production Company May Submit A Declaration To This Effect<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload PDF Only)</span></label><br>
                            <input type="file" id="declaration_for_filmshooting" name="declaration_for_filmshooting"
                                   accept="application/pdf">
                            <div class="error-message error-message-filmshooting-declaration_for_filmshooting"></div>
                        </div>
                        <div class="form-group col-sm-6" id="declaration_name_container_for_filmshooting" style="display: none;">
                            <label>13 .Negative Portrayal Of The U.T. of Dadra and Nagar Haveli & Daman and Diu in Any Manner Is Not Permitted And Will Not Be Allowed. Therefore The Producer/ Production Company May Submit A Declaration To This Effect<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload PDF Only)</span></label><br>
                            <a id="declaration_name_image_for_filmshooting_download" download><label id="declaration_name_image_for_filmshooting" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a><!-- 
                            <button type="button" class="btn btn-sm btn-danger" style="vertical-align: top;"
                                    onclick="FilmShooting.listview.askForRemove('{{filmshooting_data.filmshooting_id}}','declaration');">
                                <i class="fas fa-trash" style="padding-right: 4px;"></i> Remove</button> -->
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 m-b-5px" id="producer_signature_container_for_filmshooting">
                            <label>14. Signed By The Producer (Of The Film)<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload JPG | PNG | JPEG | JFIF Only)</span></label><br>
                            <input type="file" id="producer_signature_for_filmshooting" name="producer_signature_for_filmshooting"
                                   accept="image/jpg,image/png,image/jpeg,image/jfif">
                            <div class="error-message error-message-filmshooting-producer_signature_for_filmshooting"></div>
                        </div>
                        <div class="form-group col-sm-12" id="producer_signature_name_container_for_filmshooting" style="display: none;">
                            <label>14. Signed By The Producer (Of The Film)<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload JPG | PNG | JPEG | JFIF Only)</span></label><br>
                            <img id="producer_signature_name_image_for_filmshooting" style="width: 250px; height: 250px; border: 2px solid blue;">
                            <!-- <button type="button" class="btn btn-sm btn-danger" style="vertical-align: top;" onclick="FilmShooting.listview.askForRemove('{{filmshooting_data.filmshooting_id}}','producer_signature');">
                                <i class="fas fa-trash" style="padding-right: 4px;"></i> Remove</button> -->
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 m-b-5px" id="authorized_representative_sign_container_for_filmshooting">
                            <label>15. Signature Of Authorized Representative<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload JPG | PNG | JPEG | JFIF Only)</span></label><br>
                            <input type="file" id="authorized_representative_sign_for_filmshooting" name="authorized_representative_sign_for_filmshooting"
                                   accept="image/jpg,image/png,image/jpeg,image/jfif">
                            <div class="error-message error-message-filmshooting-authorized_representative_sign_for_filmshooting"></div>
                        </div>
                        <div class="form-group col-sm-12" id="authorized_representative_sign_name_container_for_filmshooting" style="display: none;">
                            <label>15. Signature Of Authorized Representative<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload JPG | PNG | JPEG | JFIF Only)</span></label><br>
                            <img id="authorized_representative_sign_name_image_for_filmshooting" style="width: 250px; height: 250px; border: 2px solid blue;">
                            <!-- <button type="button" class="btn btn-sm btn-danger" style="vertical-align: top;" onclick="FilmShooting.listview.askForRemove('{{filmshooting_data.filmshooting_id}}','authorized_representative_sign');">
                                <i class="fas fa-trash" style="padding-right: 4px;"></i> Remove</button> -->
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 m-b-5px" id="seal_of_company_container_for_filmshooting">
                            <label>16. Seal Of Company<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload JPG | PNG | JPEG | JFIF Only)</span></label><br>
                            <input type="file" id="seal_of_company_for_filmshooting" name="seal_of_company_for_filmshooting"
                                   accept="image/jpg,image/png,image/jpeg,image/jfif">
                            <div class="error-message error-message-filmshooting-seal_of_company_for_filmshooting"></div>
                        </div>
                        <div class="form-group col-sm-12" id="seal_of_company_name_container_for_filmshooting" style="display: none;">
                            <label>16. Seal Of Company<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload JPG | PNG | JPEG | JFIF Only)</span></label><br>
                            <img id="seal_of_company_name_image_for_filmshooting" style="width: 250px; height: 250px; border: 2px solid blue;">
                            <!-- <button type="button" class="btn btn-sm btn-danger" style="vertical-align: top;" onclick="FilmShooting.listview.askForRemove('{{filmshooting_data.filmshooting_id}}','seal_of_company');">
                                <i class="fas fa-trash" style="padding-right: 4px;"></i> Remove</button> -->
                        </div>
                    </div>

                    <h2 class="box-title f-w-b page-header color-nic-blue f-s-20px m-b-0" style="text-align: center">UNDERTAKING / DECLARAUON</h2>

                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label>I the undersigned<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="undersigned" name="undersigned" class="form-control" placeholder="Enter I the undersigned  !"
                                       maxlength="100" onblur="checkValidation('filmshooting', 'undersigned', undersignedValidationMessage);" value="{{filmshooting_data.undersigned}}">
                            </div>
                            <span class="error-message error-message-filmshooting-undersigned"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label>aged years: <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="aged" name="aged" class="form-control" placeholder="Enter aged  !"
                                       maxlength="100" onkeyup="checkNumeric($(this));" onblur="checkValidation('filmshooting', 'aged', agedYearValidationMessage);" value="{{filmshooting_data.aged}}">
                            </div>
                            <span class="error-message error-message-filmshooting-aged"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label>resident of District Daman: <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="resident" name="resident" class="form-control" placeholder="Enter resident of District Daman  !"
                                       maxlength="100" onblur="checkValidation('filmshooting', 'resident', residentValidationMessage);" value="{{filmshooting_data.resident}}">
                            </div>
                            <span class="error-message error-message-filmshooting-resident"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            do hereby declare that tho lnformation stated herein is truo to the best of my knowlodgo and belief and nothing has been concealod therein. I am woll aware of the tact that if the information given by me ls proved falselnot true, I will have to face the punishment or fine as per the taw and that the benefits availed by me shall be summarily withdrawn.
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label>That, I have applied to the District Magistrate, Daman to issue me permission for (Purpose ) <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="purpose" name="purpose" class="form-control" placeholder="Enter Purpose  !"
                                       maxlength="100" onblur="checkValidation('filmshooting', 'purpose', purposeValidationMessage);" >{{filmshooting_data.purpose}}</textarea>
                            </div>
                            <span class="error-message error-message-filmshooting-purpose"></span>
                            in respect of myself. 
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            Tlrat l' have submitted an application and conditions on it is true and correct to the best of my lknowledge.  
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            I will he re$ponsible for occurance of any untowards incidents during the said permis$lon period. 
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            And, in case of any lssue or probabtlity of lssue/event leading to Law and Order problem, I will immediately inform to the Police and Authority concerned. 
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            I also ta6e responsibility to make sure that noiselvolume during event/function will not exceed the limit fixed by the rule and authority. 
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            I also undertake the responsibility to make sure that all tire'flghting arrangement, parking facility and security during the evenU{unction are ln place and functional. 
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            It is undertaking that I have read and understood .the provisron of Section 199 and 200 of the lndian Penal Code. 
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>Witness-1 Name <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="witness_one_name" name="witness_one_name" class="form-control" placeholder="Enter Witness-1 Name  !"
                                       maxlength="100" onblur="checkValidation('filmshooting', 'witness_one_name', witnessNameValidationMessage);" value="{{filmshooting_data.witness_one_name}}">
                            </div>
                            <span class="error-message error-message-filmshooting-witness_one_name"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 m-b-5px" id="witness_one_sign_container_for_filmshooting">
                            <label>Witness-1 Signature<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload JPG | PNG | JPEG | JFIF Only)</span></label><br>
                            <input type="file" id="witness_one_sign_for_filmshooting" name="witness_one_sign_for_filmshooting"
                                   accept="image/jpg,image/png,image/jpeg,image/jfif">
                            <div class="error-message error-message-filmshooting-witness_one_sign_for_filmshooting"></div>
                        </div>
                        <div class="form-group col-sm-12" id="witness_one_sign_name_container_for_filmshooting" style="display: none;">
                            <label>Witness-1 Signature<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload JPG | PNG | JPEG | JFIF Only)</span></label><br>
                            <img id="witness_one_sign_name_image_for_filmshooting" style="width: 250px; height: 250px; border: 2px solid blue;">
                            <!-- <button type="button" class="btn btn-sm btn-danger" style="vertical-align: top;" onclick="FilmShooting.listview.askForRemove('{{filmshooting_data.filmshooting_id}}','witness_one_sign');">
                                <i class="fas fa-trash" style="padding-right: 4px;"></i> Remove</button> -->
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>Witness-2 Name <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="witness_two_name" name="witness_two_name" class="form-control" placeholder="Enter Witness-1 Name  !"
                                       maxlength="100" onblur="checkValidation('filmshooting', 'witness_two_name', witnessNameValidationMessage);" value="{{filmshooting_data.witness_two_name}}">
                            </div>
                            <span class="error-message error-message-filmshooting-witness_two_name"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 m-b-5px" id="witness_two_sign_container_for_filmshooting">
                            <label>witness-2 Signature<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload JPG | PNG | JPEG | JFIF Only)</span></label><br>
                            <input type="file" id="witness_two_sign_for_filmshooting" name="witness_two_sign_for_filmshooting"
                                   accept="image/jpg,image/png,image/jpeg,image/jfif">
                            <div class="error-message error-message-filmshooting-witness_two_sign_for_filmshooting"></div>
                        </div>
                        <div class="form-group col-sm-12" id="witness_two_sign_name_container_for_filmshooting" style="display: none;">
                            <label>witness-2 Signature<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload JPG | PNG | JPEG | JFIF Only)</span></label><br>
                            <img id="witness_two_sign_name_image_for_filmshooting" style="width: 250px; height: 250px; border: 2px solid blue;">
                            <!-- <button type="button" class="btn btn-sm btn-danger" style="vertical-align: top;" onclick="FilmShooting.listview.askForRemove('{{filmshooting_data.filmshooting_id}}','witness_two_sign');">
                                <i class="fas fa-trash" style="padding-right: 4px;"></i> Remove</button> -->
                        </div>
                    </div>

                    <div class="form-group"><!-- 
                        <button type="button" id="draft_btn_for_filmshooting" class="btn btn-sm btn-nic-blue" onclick="FilmShooting.listview.submitFilmShooting({{VALUE_ONE}});" style="margin-right: 5px;">Save as a Draft</button> -->
                        <button type="button" id="submit_btn_for_filmshooting" class="btn btn-sm btn-success" onclick="FilmShooting.listview.submitFilmShooting({{VALUE_TWO}});" style="margin-right: 5px;">Submit</button>
                        <button type="button" class="btn btn-sm btn-danger" onclick="FilmShooting.listview.loadFilmShootingData();">Close</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>