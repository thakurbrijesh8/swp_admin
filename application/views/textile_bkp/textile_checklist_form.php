<div class="row">
   <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">LIST OF DOCUMENTS TO BE SUBMITTED ALONG WITH APPLICATION</div>
                
            </div>
            <form role="form" id="checklist_form" name="checklist_form" onsubmit="return false;">
                <input type="hidden" id="incentive_id" name="incentive_id" value="{{incentive_id}}">
                <input type="hidden" id="checklist_id" name="checklist_id" value="{{checklist_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-12 text-center">
                            <span class="error-message error-message-checklist f-w-b" style="border-bottom: 2px solid red;"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            <input type="checkbox" id="is_capital_investment" name="is_capital_investment" class="checkbox" value="{{is_checked}}">&nbsp;FOR CAPITAL INVESTMENT
                        </div><br/>
                        <div class="form-group col-sm-12">
                            <input type="checkbox" id="is_intrest_subsidy" name="is_intrest_subsidy" class="checkbox" value="{{is_checked}}">&nbsp;FOR INTEREST SUBSIDY
                            <br/><span class="error-message error-message-checklist-is_intrest_subsidy"></span>
                        </div>
                    </div>
                    <div class="capital_investment_div" style="display: none;">
                    <h2 class="box-title f-w-b page-header color-nic-blue f-s-20px m-b-0" style="text-align: center">CHECKLIST FOR THE CAPITAL INVESTMENT</h2>
                    <div class="row">
                        <div class="form-group col-sm-12" id="entrepreneur_memorandum_uploader_container_for_textile">
                            <label>1. Copy of Entrepreneur Memorandum (Part I) and (Part II)<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span></label><br>
                            <input type="file" id="entrepreneur_memorandum_uploader_for_textile" name="entrepreneur_memorandum_uploader_for_textile"
                                   accept="pdf">
                            <div class="error-message error-message-checklist-entrepreneur_memorandum_uploader_for_textile"></div>
                        </div>
                        <div class="form-group col-sm-12" id="entrepreneur_memorandum_uploader_name_container_for_textile" style="display: none;">
                            <label>1. Copy of Entrepreneur Memorandum (Part I) and (Part II)<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span><br>
                            <a id="entrepreneur_memorandum_uploader_name_image_for_textile_download" download><label id="entrepreneur_memorandum_uploader_name_image_for_textile" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="partnership_deed_uploader_container_for_textile">
                            <label>2. Copy of Partnership Deed, If Partnership Concern; in case Limited Company copy of Memorandum and Articles of Association duly signed by the Managing Director<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span></label><br>
                            <input type="file" id="partnership_deed_uploader_for_textile" name="partnership_deed_uploader_for_textile"
                                   accept="pdf">
                            <div class="error-message error-message-checklist-partnership_deed_uploader_for_textile"></div>
                        </div>
                        <div class="form-group col-sm-12" id="partnership_deed_uploader_name_container_for_textile" style="display: none;">
                            <label>2. Copy of Partnership Deed, If Partnership Concern; in case Limited Company copy of Memorandum and Articles of Association duly signed by the Managing Director<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span><br>
                            <a id="partnership_deed_uploader_name_image_for_textile_download" download><label id="partnership_deed_uploader_name_image_for_textile" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="lease_agreement_uploader_container_for_textile">
                            <label>3. If the Enterprise is functioning in a leased land/ building, copy of Lease agreement deed executed in stamp paper of Rs.10/- , for a minimum period of 5 years from the date of commencement of commercial production<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span></label><br>
                            <input type="file" id="lease_agreement_uploader_for_textile" name="lease_agreement_uploader_for_textile"
                                   accept="pdf">
                            <div class="error-message error-message-checklist-lease_agreement_uploader_for_textile"></div>
                        </div>
                        <div class="form-group col-sm-12" id="lease_agreement_uploader_name_container_for_textile" style="display: none;">
                            <label>3. copy of Lease agreement deed executed in stamp paper of Rs.10/- , for a minimum period of 5 years from the date of commencement of commercial production<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span><br>
                            <a id="lease_agreement_uploader_name_image_for_textile_download" download><label id="lease_agreement_uploader_name_image_for_textile" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="loan_sanction_uploader_container_for_textile">
                            <label>4. Copy of Loan Sanction letter from the Bank / Financial Institution in respect Bank / Institutional financed Enterprises<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span></label><br>
                            <input type="file" id="loan_sanction_uploader_for_textile" name="loan_sanction_uploader_for_textile"
                                   accept="pdf">
                            <div class="error-message error-message-checklist-loan_sanction_uploader_for_textile"></div>
                        </div>
                        <div class="form-group col-sm-12" id="loan_sanction_uploader_name_container_for_textile" style="display: none;">
                            <label>4. Copy of Loan Sanction letter from the Bank / Financial Institution in respect Bank / Institutional financed Enterprises<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span><br>
                            <a id="loan_sanction_uploader_name_image_for_textile_download" download><label id="loan_sanction_uploader_name_image_for_textile" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="power_release_order_uploader_container_for_textile">
                            <label>5. Copy of Power Release Order<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span></label><br>
                            <input type="file" id="power_release_order_uploader_for_textile" name="power_release_order_uploader_for_textile"
                                   accept="pdf">
                            <div class="error-message error-message-checklist-power_release_order_uploader_for_textile"></div>
                        </div>
                        <div class="form-group col-sm-12" id="power_release_order_uploader_name_container_for_textile" style="display: none;">
                            <label>5. Copy of Power Release Order<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span><br>
                            <a id="power_release_order_uploader_name_image_for_textile_download" download><label id="power_release_order_uploader_name_image_for_textile" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="invoice_copy_uploader_container_for_textile">
                            <label>6. Copy of the invoices, cash bills and stamped receipt duly attested. In case of non-availability of receipts, the bank scroll which shows the payment, with the details of the machinery supplier, should be furnished, in original, with the attestation of the Bank Manager<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span></label><br>
                            <input type="file" id="invoice_copy_uploader_for_textile" name="invoice_copy_uploader_for_textile"
                                   accept="pdf">
                            <div class="error-message error-message-checklist-invoice_copy_uploader_for_textile"></div>
                        </div>
                        <div class="form-group col-sm-12" id="invoice_copy_uploader_name_container_for_textile" style="display: none;">
                            <label>6. Copy of the invoices, cash bills and stamped receipt duly attested. In case of non-availability of receipts, the bank scroll which shows the payment, with the details of the machinery supplier, should be furnished, in original, with the attestation of the Bank Manager<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span><br>
                            <a id="invoice_copy_uploader_name_image_for_textile_download" download><label id="invoice_copy_uploader_name_image_for_textile" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="ca_prescribed_uploader_container_for_textile">
                            <label>7. Certificate of Chartered Accountant for fixed assets created as on date of commencement of commercial production in the prescribed form <a href="./assets/annexure/ANNEXURE-4.doc" download>(Annexure-IV)</a><span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span></label><br>
                            <input type="file" id="ca_prescribed_uploader_for_textile" name="ca_prescribed_uploader_for_textile"
                                   accept="pdf">
                            <div class="error-message error-message-checklist-ca_prescribed_uploader_for_textile"></div>
                        </div>
                        <div class="form-group col-sm-12" id="ca_prescribed_uploader_name_container_for_textile" style="display: none;">
                            <label>7. Certificate of Chartered Accountant for fixed assets created as on date of commencement of commercial production in the prescribed form <a href="./assets/annexure/ANNEXURE-4.doc" download>(Annexure-IV)</a><span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span><br>
                            <a id="ca_prescribed_uploader_name_image_for_textile_download" download><label id="ca_prescribed_uploader_name_image_for_textile" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="certificate_commencement_uploader_container_for_textile">
                            <label>8. Certificate of commencement of commercial production duly signed by Chartered Accountant<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span></label><br>
                            <input type="file" id="certificate_commencement_uploader_for_textile" name="certificate_commencement_uploader_for_textile"
                                   accept="pdf">
                            <div class="error-message error-message-checklist-certificate_commencement_uploader_for_textile"></div>
                        </div>
                        <div class="form-group col-sm-12" id="certificate_commencement_uploader_name_container_for_textile" style="display: none;">
                            <label>8. Certificate of commencement of commercial production duly signed by Chartered Accountant<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span><br>
                            <a id="certificate_commencement_uploader_name_image_for_textile_download" download><label id="certificate_commencement_uploader_name_image_for_textile" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <span class="box-title f-w-b page-header m-b-0">9. For self fabricated Plant and Machinery items  :   </span>
                    <div class="row">
                        <div class="form-group col-sm-12" id="engineer_certificate_uploader_container_for_textile">
                            <label><strong>  a) </strong> Chartered Engineer’s Certificate for the value of the plant and machinery<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span></label><br>
                            <input type="file" id="engineer_certificate_uploader_for_textile" name="engineer_certificate_uploader_for_textile"
                                   accept="pdf">
                            <div class="error-message error-message-checklist-engineer_certificate_uploader_for_textile"></div>
                        </div>
                        <div class="form-group col-sm-12" id="engineer_certificate_uploader_name_container_for_textile" style="display: none;">
                            <label><strong>  a) </strong> Chartered Engineer’s Certificate for the value of the plant and machinery<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span><br>
                            <a id="engineer_certificate_uploader_name_image_for_textile_download" download><label id="engineer_certificate_uploader_name_image_for_textile" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="expenses_certificate_uploader_container_for_textile">
                            <label><strong>  b) </strong>   Chartered Accountant Certificate for the expenses incurred for the purchase of Plant and machinery to be furnished<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span></label><br>
                            <input type="file" id="expenses_certificate_uploader_for_textile" name="expenses_certificate_uploader_for_textile"
                                   accept="pdf">
                            <div class="error-message error-message-checklist-expenses_certificate_uploader_for_textile"></div>
                        </div>
                        <div class="form-group col-sm-12" id="expenses_certificate_uploader_name_container_for_textile" style="display: none;">
                            <label><strong>  b) </strong>   Chartered Accountant Certificate for the expenses incurred for the purchase of Plant and machinery to be furnished<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span><br>
                            <a id="expenses_certificate_uploader_name_image_for_textile_download" download><label id="expenses_certificate_uploader_name_image_for_textile" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="stamped_receipt_uploader_container_for_textile">
                            <label><strong>  c) </strong> Copy of the invoices, cash bills , job work bills and stamped receipt duly attested<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span></label><br>
                            <input type="file" id="stamped_receipt_uploader_for_textile" name="stamped_receipt_uploader_for_textile"
                                   accept="pdf">
                            <div class="error-message error-message-checklist-stamped_receipt_uploader_for_textile"></div>
                        </div>
                        <div class="form-group col-sm-12" id="stamped_receipt_uploader_name_container_for_textile" style="display: none;">
                            <label><strong>  c) </strong> Copy of the invoices, cash bills , job work bills and stamped receipt duly attested<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span><br>
                            <a id="stamped_receipt_uploader_name_image_for_textile_download" download><label id="stamped_receipt_uploader_name_image_for_textile" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="sale_invoice_uploader_container_for_textile">
                            <label>10. Copy of the first sale invoice raised after commencement of Commercial Production or copy of first delivery challan ,in case of enterprises manufacturing on job work basis<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span></label><br>
                            <input type="file" id="sale_invoice_uploader_for_textile" name="sale_invoice_uploader_for_textile"
                                   accept="pdf">
                            <div class="error-message error-message-checklist-sale_invoice_uploader_for_textile"></div>
                        </div>
                        <div class="form-group col-sm-12" id="sale_invoice_uploader_name_container_for_textile" style="display: none;">
                            <label>10. Copy of the first sale invoice raised after commencement of Commercial Production or copy of first delivery challan ,in case of enterprises manufacturing on job work basis<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span><br>
                            <a id="sale_invoice_uploader_name_image_for_textile_download" download><label id="sale_invoice_uploader_name_image_for_textile" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="additional_document_uploader_container_for_textile">
                            <label>11. Additional documents for to be submitted in respect of enterprises applying for Employment Intensive<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span></label><br>
                            <input type="file" id="additional_document_uploader_for_textile" name="additional_document_uploader_for_textile"
                                   accept="pdf">
                            <div class="error-message error-message-checklist-additional_document_uploader_for_textile"></div>
                        </div>
                        <div class="form-group col-sm-12" id="additional_document_uploader_name_container_for_textile" style="display: none;">
                            <label>11. Additional documents for to be submitted in respect of enterprises applying for Employment Intensive<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span><br>
                            <a id="additional_document_uploader_name_image_for_textile_download" download><label id="additional_document_uploader_name_image_for_textile" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="factorylicence_copy_uploader_container_for_textile">
                            <label>12. Copy of Factory Licence from Labour, Daman<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span></label><br>
                            <input type="file" id="factorylicence_copy_uploader_for_textile" name="factorylicence_copy_uploader_for_textile"
                                   accept="pdf">
                            <div class="error-message error-message-checklist-factorylicence_copy_uploader_for_textile"></div>
                        </div>
                        <div class="form-group col-sm-12" id="factorylicence_copy_uploader_name_container_for_textile" style="display: none;">
                            <label>12. Copy of Factory Licence from Labour, Daman<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span><br>
                            <a id="factorylicence_copy_uploader_name_image_for_textile_download" download><label id="factorylicence_copy_uploader_name_image_for_textile" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="pcc_copy_uploader_container_for_textile">
                            <label>13. Copy of Consent to Operate from PCC, Daman<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span></label><br>
                            <input type="file" id="pcc_copy_uploader_for_textile" name="pcc_copy_uploader_for_textile"
                                   accept="pdf">
                            <div class="error-message error-message-checklist-pcc_copy_uploader_for_textile"></div>
                        </div>
                        <div class="form-group col-sm-12" id="pcc_copy_uploader_name_container_for_textile" style="display: none;">
                            <label>13. Copy of Consent to Operate from PCC, Daman<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span><br>
                            <a id="pcc_copy_uploader_name_image_for_textile_download" download><label id="pcc_copy_uploader_name_image_for_textile" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <span class="box-title f-w-b page-header m-b-0">14. Additional documents in respect of existing   enterprises taking up expansion / diversification.Certificate from Chartered Accountant on the following :</span>
                    <div class="row">
                        <div class="form-group col-sm-12" id="expansion_date_uploader_container_for_textile">
                            <label><strong>  a) </strong> Date of commencement of commercial production after expansion / diversification<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span></label><br>
                            <input type="file" id="expansion_date_uploader_for_textile" name="expansion_date_uploader_for_textile"
                                   accept="pdf">
                            <div class="error-message error-message-checklist-expansion_date_uploader_for_textile"></div>
                        </div>
                        <div class="form-group col-sm-12" id="expansion_date_uploader_name_container_for_textile" style="display: none;">
                            <label><strong>  a) </strong> Date of commencement of commercial production after expansion / diversification<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span><br>
                            <a id="expansion_date_uploader_name_image_for_textile_download" download><label id="expansion_date_uploader_name_image_for_textile" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="production_turnover_uploader_container_for_textile">
                            <label><strong>   b) </strong>  Annual production turnover for the last 3 years before the date of commencement of commercial production under expansion/ diversification<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span></label><br>
                            <input type="file" id="production_turnover_uploader_for_textile" name="production_turnover_uploader_for_textile"
                                   accept="pdf">
                            <div class="error-message error-message-checklist-production_turnover_uploader_for_textile"></div>
                        </div>
                        <div class="form-group col-sm-12" id="production_turnover_uploader_name_container_for_textile" style="display: none;">
                            <label><strong>   b) </strong>  Annual production turnover for the last 3 years before the date of commencement of commercial production under expansion/ diversification<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span><br>
                            <a id="production_turnover_uploader_name_image_for_textile_download" download><label id="production_turnover_uploader_name_image_for_textile" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="fix_assets_value_uploader_container_for_textile">
                            <label><strong> c)  </strong> Value of fixed assets before Expansion / diversification , on Expansion / diversification and after Expansion / diversification % increase of fixed assets due to Expansion / diversification<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span></label><br>
                            <input type="file" id="fix_assets_value_uploader_for_textile" name="fix_assets_value_uploader_for_textile"
                                   accept="pdf">
                            <div class="error-message error-message-checklist-fix_assets_value_uploader_for_textile"></div>
                        </div>
                        <div class="form-group col-sm-12" id="fix_assets_value_uploader_name_container_for_textile" style="display: none;">
                            <label><strong> c)  </strong> Value of fixed assets before Expansion / diversification , on Expansion / diversification and after Expansion / diversification % increase of fixed assets due to Expansion / diversification<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span><br>
                            <a id="fix_assets_value_uploader_name_image_for_textile_download" download><label id="fix_assets_value_uploader_name_image_for_textile" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="production_capacity_uploader_container_for_textile">
                            <label><strong> d)  </strong> Production capacity / Turnover (both in terms of units and value in Rs.) before expansion / diversification, after expansion / diversification and % increase of production capacity / Turnover due to expansion / diversification<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span></label><br>
                            <input type="file" id="production_capacity_uploader_for_textile" name="production_capacity_uploader_for_textile"
                                   accept="pdf">
                            <div class="error-message error-message-checklist-production_capacity_uploader_for_textile"></div>
                        </div>
                        <div class="form-group col-sm-12" id="production_capacity_uploader_name_container_for_textile" style="display: none;">
                            <label><strong> d)  </strong> Production capacity / Turnover (both in terms of units and value in Rs.) before expansion / diversification, after expansion / diversification and % increase of production capacity / Turnover due to expansion / diversification<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span><br>
                            <a id="production_capacity_uploader_name_image_for_textile_download" download><label id="production_capacity_uploader_name_image_for_textile" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="patent_registration_uploader_container_for_textile">
                            <label>15. Copy of Patent Registration Certificate with details of payment made receipts<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span></label><br>
                            <input type="file" id="patent_registration_uploader_for_textile" name="patent_registration_uploader_for_textile"
                                   accept="pdf">
                            <div class="error-message error-message-checklist-patent_registration_uploader_for_textile"></div>
                        </div>
                        <div class="form-group col-sm-12" id="patent_registration_uploader_name_container_for_textile" style="display: none;">
                            <label>15. Copy of Patent Registration Certificate with details of payment made receipts<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span><br>
                            <a id="patent_registration_uploader_name_image_for_textile_download" download><label id="patent_registration_uploader_name_image_for_textile" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="energy_water_uploader_container_for_textile">
                            <label>16. Copy of Certificate for saving in consumption of energy and water issued by the auditing agency<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span></label><br>
                            <input type="file" id="energy_water_uploader_for_textile" name="energy_water_uploader_for_textile"
                                   accept="pdf">
                            <div class="error-message error-message-checklist-energy_water_uploader_for_textile"></div>
                        </div>
                        <div class="form-group col-sm-12" id="energy_water_uploader_name_container_for_textile" style="display: none;">
                            <label>16. Copy of Certificate for saving in consumption of energy and water issued by the auditing agency<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span><br>
                            <a id="energy_water_uploader_name_image_for_textile_download" download><label id="energy_water_uploader_name_image_for_textile" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="quality_certificate_uploader_container_for_textile">
                            <label>17.Copy of Quality Certification (ie. ISO/ISI/WHO/GMP/Hallmark Certification and other National/International certification) issued by the certifying agency<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span></label><br>
                            <input type="file" id="quality_certificate_uploader_for_textile" name="quality_certificate_uploader_for_textile"
                                   accept="pdf">
                            <div class="error-message error-message-checklist-quality_certificate_uploader_for_textile"></div>
                        </div>
                        <div class="form-group col-sm-12" id="quality_certificate_uploader_name_container_for_textile" style="display: none;">
                            <label>17. Copy of Quality Certification (ie. ISO/ISI/WHO/GMP/Hallmark Certification and other National/International certification) issued by the certifying agency<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span><br>
                            <a id="quality_certificate_uploader_name_image_for_textile_download" download><label id="quality_certificate_uploader_name_image_for_textile" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="resident_certificate_uploader_container_for_textile">
                            <label>18. Copy of Domicile/Resident Certificate of local employees of UT’s since last 10 years issued by the competent authority, if applied for incentive for local employment <span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span></label><br>
                            <input type="file" id="resident_certificate_uploader_for_textile" name="resident_certificate_uploader_for_textile"
                                   accept="pdf">
                            <div class="error-message error-message-checklist-resident_certificate_uploader_for_textile"></div>
                        </div>
                        <div class="form-group col-sm-12" id="resident_certificate_uploader_name_container_for_textile" style="display: none;">
                            <label>18. Copy of Domicile/Resident Certificate of local employees of UT’s since last 10 years issued by the competent authority, if applied for incentive for local employment <span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span><br>
                            <a id="resident_certificate_uploader_name_image_for_textile_download" download><label id="resident_certificate_uploader_name_image_for_textile" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    </div>
                    <div class="intrest_subsidy_div" style="display: none;">
                    <h2 class="box-title f-w-b page-header color-nic-blue f-s-20px m-b-0" style="text-align: center">CHECKLIST FOR THE INTEREST SUBSIDY</h2>
                    <div class="row">
                        <div class="form-group col-sm-12" id="bank_total_interest_uploader_container_for_textile">
                            <label>1. Bank Certificate showing total interest calculation of 6 months of the Term Loan Account of the enterprise for which interest subsidy is sought<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span></label><br>
                            <input type="file" id="bank_total_interest_uploader_for_textile" name="bank_total_interest_uploader_for_textile"
                                   accept="pdf">
                            <div class="error-message error-message-checklist-bank_total_interest_uploader_for_textile"></div>
                        </div>
                        <div class="form-group col-sm-12" id="bank_total_interest_uploader_name_container_for_textile" style="display: none;">
                            <label>1. Bank Certificate showing total interest calculation of 6 months of the Term Loan Account of the enterprise for which interest subsidy is sought<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span><br>
                            <a id="bank_total_interest_uploader_name_image_for_textile_download" download><label id="bank_total_interest_uploader_name_image_for_textile" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="bank_statement_uploader_container_for_textile">
                            <label>2. Bank Statement for the particular period of 6 months duly certified by the Bank & the Applicant<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span></label><br>
                            <input type="file" id="bank_statement_uploader_for_textile" name="bank_statement_uploader_for_textile"
                                   accept="pdf">
                            <div class="error-message error-message-checklist-bank_statement_uploader_for_textile"></div>
                        </div>
                        <div class="form-group col-sm-12" id="bank_statement_uploader_name_container_for_textile" style="display: none;">
                            <label>2. Bank Statement for the particular period of 6 months duly certified by the Bank & the Applicant<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span><br>
                            <a id="bank_statement_uploader_name_image_for_textile_download" download><label id="bank_statement_uploader_name_image_for_textile" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="annexure3_declaration_uploader_container_for_textile">
                            <label>3. Declaration as per the given format from the Applicant<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span></label><br>
                            <input type="file" id="annexure3_declaration_uploader_for_textile" name="annexure3_declaration_uploader_for_textile"
                                   accept="pdf">
                            <div class="error-message error-message-checklist-annexure3_declaration_uploader_for_textile"></div>
                        </div>
                        <div class="form-group col-sm-12" id="annexure3_declaration_uploader_name_container_for_textile" style="display: none;">
                            <label>3. Declaration as per the given format from the Applicant<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span><br>
                            <a id="annexure3_declaration_uploader_name_image_for_textile_download" download><label id="annexure3_declaration_uploader_name_image_for_textile" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="interest_subsidy_cal_uploader_container_for_textile">
                            <label>4. Duly certified Calculation of the Interest Subsidy claimed by the applicant<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span></label><br>
                            <input type="file" id="interest_subsidy_cal_uploader_for_textile" name="interest_subsidy_cal_uploader_for_textile"
                                   accept="pdf">
                            <div class="error-message error-message-checklist-interest_subsidy_cal_uploader_for_textile"></div>
                        </div>
                        <div class="form-group col-sm-12" id="interest_subsidy_cal_uploader_name_container_for_textile" style="display: none;">
                            <label>4. Duly certified Calculation of the Interest Subsidy claimed by the applicant<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span><br>
                            <a id="interest_subsidy_cal_uploader_name_image_for_textile_download" download><label id="interest_subsidy_cal_uploader_name_image_for_textile" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <h2 class="box-title f-w-b page-header color-nic-blue f-s-20px m-b-0" style="text-align: center">CHECKLIST FOR ANNUAL MONITORING</h2>
                    <div class="row">
                        <div class="form-group col-sm-12" id="year_annual_prod_uploader_container_for_textile">
                            <label>1. CA Certifying the Annual Production, Sales Turnover and Power Consumption as 31st March of every Financial Year <a href="./assets/annexure/ANNEXURE-4.doc" download>(Annexure-IV)</a><span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span></label><br>
                            <input type="file" id="year_annual_prod_uploader_for_textile" name="year_annual_prod_uploader_for_textile"
                                   accept="pdf">
                            <div class="error-message error-message-checklist-year_annual_prod_uploader_for_textile"></div>
                        </div>
                        <div class="form-group col-sm-12" id="year_annual_prod_uploader_name_container_for_textile" style="display: none;">
                            <label>1. CA Certifying the Annual Production, Sales Turnover and Power Consumption as 31st March of every Financial Year <a href="./assets/annexure/ANNEXURE-4.doc" download>(Annexure-IV)</a><span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span><br>
                            <a id="year_annual_prod_uploader_name_image_for_textile_download" download><label id="year_annual_prod_uploader_name_image_for_textile" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="year_bank_statement_uploader_container_for_textile">
                            <label>2. Bank Statement duly certified by the Applicant for a Particular Financial Year<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span></label><br>
                            <input type="file" id="year_bank_statement_uploader_for_textile" name="year_bank_statement_uploader_for_textile"
                                   accept="pdf">
                            <div class="error-message error-message-checklist-year_bank_statement_uploader_for_textile"></div>
                        </div>
                        <div class="form-group col-sm-12" id="year_bank_statement_uploader_name_container_for_textile" style="display: none;">
                            <label>2. Bank Statement duly certified by the Applicant for a Particular Financial Year<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span><br>
                            <a id="year_bank_statement_uploader_name_image_for_textile_download" download><label id="year_bank_statement_uploader_name_image_for_textile" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    </div>

                    <div class="form-group">
                        <button type="button" id="previous_btn_for_incentive_details" class="btn btn-sm btn-success" onclick="Textile.listview.editOrViewDeclaration($('#previous_btn_for_declaration_details'), '{{singlereturn_id}}', true);" style="margin-right: 5px;"><span class="fas fa-hand-point-left"></span> Previous</button>
                        <button type="button" id="draft_btn_for_incentive" class="btn btn-sm btn-success" onclick="Textile.listview.submitTextileChecklist('{{VALUE_TWO}}');"  style="margin-right: 5px;"><i class="fas fa-save"></i> Submit</button>
                        <button type="button" class="btn btn-sm btn-danger" onclick="Textile.listview.loadTextileData();"  style="margin-right: 5px;">Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>