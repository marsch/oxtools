var oxColumns = function() {

}       

oxColumns.prototype = {

  idMapping : {
    'common' : {
      '1' : 'id',
      '2' : 'created_by',
      '3' : 'modified_by',
      '4' : 'creation_date',
      '5' : 'last_modified',
      '20' : 'folder_id',
      '100' : 'categories',
      '101' : 'private_flag',
      '102' : 'color_label',
      '104' : 'number_of_attachments'
    },
    'mail' : {
      '102' : 'color_label',
      '600' : 'id',
      '601' : 'folder_id',
      '602' : 'attachment',
      '603' : 'from',
      '604' : 'to',
      '605' : 'cc',
      '606' : 'bcc',
      '607' : 'subject',
      '608' : 'size',
      '609' : 'sent_date',
      '610' : 'received_date',
      '611' : 'flags',
      '612' : 'level',
      '613' : 'disp_notification_to',
      '614' : 'priority',
      '615' : 'msgref',
      '651' : 'flag_seen',
      '652' : 'account_name'
    },
    'contacts' : {
      '500' : 'display_name',
      '501' : 'first_name',
      '502' : 'last_name',
      '503' : 'second_name',
      '504' : 'suffix',
      '505' : 'title',
      '506' : 'street_home',
      '507' : 'postal_code_home',
      '508' : 'city_home',
      '509' : 'state_home',
      '510' : 'country_home',
      '511' : 'birthday',
      '512' : 'marital_status',
      '513' : 'number_of_children',
      '514' : 'profession',
      '515' : 'nickname',
      '516' : 'spouse_name',
      '517' : 'anniversary',
      '518' : 'note',
      '519' : 'department',
      '520' : 'position',
      '521' : 'employee_type',
      '522' : 'room_number',
      '523' : 'street_business',
      '525' : 'postal_code_business',
      '526' : 'city_business',
      '527' : 'state_business',
      '528' : 'country_business',
      '529' : 'number_of_employees',
      '530' : 'sales_volume',
      '531' : 'tax_id',
      '532' : 'commercial_register',
      '533' : 'branches',
      '534' : 'business_category',
      '535' : 'info',
      '536' : 'manager_name',
      '537' : 'assistant_name',
      '538' : 'street_other',
      '539' : 'city_other',
      '540' : 'postal_code_other',
      '541' : 'country_other',
      '542' : 'telephone_business1',
      '543' : 'telephone_business2',
      '544' : 'fax_business',
      '545' : 'telephone_callback',
      '546' : 'telephone_car',
      '547' : 'telephone_company',
      '548' : 'telephone_home1',
      '549' : 'telephone_home2',
      '550' : 'fax_home',
      '551' : 'cellular_telephone1',
      '552' : 'cellular_telephone2',
      '553' : 'telephone_other',
      '554' : 'fax_other',
      '555' : 'email1',
      '556' : 'email2',
      '557' : 'email3',
      '558' : 'url',
      '559' : 'telephone_isdn',
      '560' : 'telephone_pager',
      '561' : 'telephone_primary',
      '562' : 'telephone_radio',
      '563' : 'telephone_telex',
      '564' : 'telephone_ttytdd',
      '565' : 'instant_messenger1',
      '566' : 'instant_messenger2',
      '567' : 'telephone_ip',
      '568' : 'telephone_assistant',
      '569' : 'company',
      //'570' : 'image1',
      '571' : 'userfield01',
      '572' : 'userfield02',
      '573' : 'userfield03',
      '574' : 'userfield04',
      '575' : 'userfield05',
      '576' : 'userfield06',
      '577' : 'userfield07',
      '578' : 'userfield08',
      '579' : 'userfield09',
      '580' : 'userfield10',
      '581' : 'userfield11',
      '582' : 'userfield12',
      '583' : 'userfield13',
      '584' : 'userfield14',
      '585' : 'userfield15',
      '586' : 'userfield16',
      '587' : 'userfield17',
      '588' : 'userfield18',
      '589' : 'userfield19',
      '590' : 'userfield20',
      '592' : 'distribution_list',
      '594' : 'number_of_distribution_list',
      '596' : 'contains_image1',
      '597' : 'image_last_modified',
      '598' : 'state_other',
      '599' : 'file_as',
      '104' : 'number_of_attachments',
      '601' : 'image1_content_type',
      '602' : 'mark_as_distributionlist',
      '605' : 'default_address',
      '524' : 'internal_userid',
      '606' : 'image1_url'
    },
    'calendar' : {
      '200' : 'title',
      '201' : 'start_date',
      '202' : 'end_date',
      '203' : 'note',
      '204' : 'alarm',
      '207' : 'recurrence_position',
      '208' : 'recurrence_date_position',
      '209' : 'recurrence_type',
      '212' : 'days',
      '213' : 'days_in_month',
      '214' : 'month',
      '215' : 'interval',
      '216' : 'until',
      '220' : 'participants',
      '221' : 'users',
      '400' : 'location',
      '401' : 'full_time',
      '402' : 'shown_as'
    },
    'infostore' : {
      '700' : 'title',
      '701' : 'url',
      '702' : 'filename',
      '703' : 'file_mimetype',
      '704' : 'file_size',
      '705' : 'version',
      '706' : 'description',
      '707' : 'locked_until',
      '708' : 'file_md5sum',
      '709' : 'version_comment',
      '710' : 'current_version',
      '711' : 'number_of_versions'
    },
    'task' : {
      '200' : 'title',
      '201' : 'start_date',
      '202' : 'end_date',
      '203' : 'note',
      '204' : 'alarm',
      '209' : 'recurrence_type',
      '212' : 'days',
      '213' : 'days_in_month',
      '214' : 'month',
      '215' : 'internal',
      '216' : 'until',
      '220' : 'participants',
      '221' : 'users',
      '300' : 'status',
      '301' : 'percent_completed',
      '302' : 'actual_costs',
      '303' : 'actual_duration',
      '305' : 'billing_information',
      '307' : 'target_costs',
      '308' : 'target_duration',
      '309' : 'priority',
      '312' : 'currency',
      '313' : 'trip_meter',
      '314' : 'companies',
      '315' : 'date_completed'
    },
    'folders' : {
      '1' : 'id',
      '2' : 'created_by',
      '3' : 'modified_by',
      '4' : 'creation_date',
      '5' : 'last_modified',
      '6' : 'last_modified_utc',
      '20' : 'folder_id',
      '300' : 'title',
      '301' : 'module',
      '302' : 'type',
      '304' : 'subfolders',
      '305' : 'own_rights',
      '306' : 'permissions',
      '307' : 'summary',
      '308' : 'standard_folder',
      '309' : 'total',
      '310' : 'new',
      '311' : 'unread',
      '312' : 'deleted',
      '313' : 'capabilities',
      '314' : 'subscribed',
      '315' : 'subscr_subflds',
      '316' : 'standard_folder_type',
      '3010' : 'com.openexchange.publish.publicationFlag',
      '3020' : 'com.openexchange.subscribe.subscriptionFlag',
      '3030' : 'com.openexchange.folderstorage.displayName'
    },
    'user': {
      '610' : 'aliases',
      '611' : 'timezone',
      '612' : 'locale',
      '613' : 'groups',
      '614' : 'contact_id',
      '615' : 'login_info'
    },
    'group': {
    },
    'resource': {
    },
    'account': {
      '1001': 'id',
      '1002': 'login',
      '1003': 'password',
      '1004': 'mail_url',
      '1005': 'transport_url',
      '1006': 'name',
      '1007': 'primary_address',
      '1008': 'spam_handler',
      '1009': 'trash',
      '1010': 'sent',
      '1011': 'drafts',
      '1012': 'spam',
      '1013': 'confirmed_spam',
      '1014': 'confirmed_ham',
      '1015': 'mail_server',
      '1016': 'mail_port',
      '1017': 'mail_protocol',
      '1018': 'mail_secure',
      '1019': 'transport_server',
      '1020': 'transport_port',
      '1021': 'transport_protocol',
      '1022': 'transport_secure',
      '1023': 'transport_login',
      '1024': 'transport_passord',
      '1025': 'unified_inbox_enabled',
      '1026': 'trash_fullname',
      '1027': 'sent_fullname',
      '1028': 'drafts_fullname',
      '1029': 'spam_fullname',
      '1030': 'confirmed_spam_fullname',
      '1031': 'confirmed_ham_fullname',
      '1032': 'pop3_refresh_rate',
      '1033': 'pop3_expunge_on_quit',
      '1034': 'pop3_delete_write_through',
      '1035': 'pop3_storage ',
      '1036': 'pop3_path',
      '1037': 'personal'
    }
  },


  getColumnByField: function (module, n) {
    console.log(this.idMapping[module]);
    for (var i in this.idMapping[module]) {
      if(this.idMapping[module][i] === n) {
        return i;
      }
    }
  return null;
  },
  toFields: function (module, nArr, colString) {
    var cols = colString.split(',');
    var objs =  [];
    for (var j in nArr) {
      var obj = {}; 
      var item = nArr[j];
      for (var i in cols) {
        if (!this.idMapping[module][cols[i]]) {
          throw module + ': ' + cols[i] + ' not found';
        }
        obj[this.idMapping[module][cols[i]]] = item[i];
      }
      objs.push(obj);
    }
    return objs;
  },
  toColumns: function (module, fieldString) {
    var fields = fieldString.split(',');
    var cols = [];
    for (var i in fields) {
      cols.push(this.getColumnByField(module, fields[i]));
    }
    return cols.join(',');
  }


}    

exports = module.exports = new oxColumns();
