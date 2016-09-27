(function() {
    'use strict';

    angular.module('mercuryInstaller.globals', [])
        .value('User', {
            userName: "",
            authData: "",
            isAuthenticated: false
        })
        .constant("Events",{
        	LOGINSUCCESS :	"LOGINSUCCESS",
        	LOGOUTSUCCESS : "LOGOUTSUCCESS",
        	DEPLOYMENTSTATUSCHANGED : "deploymentStatusChanged",
        	MOVETOPARTICULARSTEP:"MoveToParticularStep",
			CLEARFIELDSCALLED : "ClearFieldsCalled",
			PODMGMTACTIVITY:"PODManagementActivity",
			PODOPERATIONSTARTED : "PodOperationStarted"
        })
        .constant("Constants",{
        	INACTIVE : "INACTIVE"
        	
        })
        .constant("Configuration",{
        	isDebug : true,
        	backendServerUrl : "http://10.30.118.99"
        	
        })
        .constant("ErrorMap",{
        	"VE5000":"CIMC-COMMON",
        	"VE5001":"cimc_username",
        	"VE5002":"cimc_password",
        	"VE5021":"'UCSM-COMMON",
        	"VE5022":"ucsm_username",
        	"VE5023":"ucsm_password",
        	"VE5024":"ucsm_ip",
        	"VE5025":"ucsm_resource_prefix",
        	"VE6000":"NETWORKING",
        	"VE6001":"domain_name",
        	"VE6002":"ntp_servers",
        	"VE6003":"domain_name_servers",
        	"VE6004":"http_proxy_servers",
        	"VE6005":"https_proxy_servers",
        	"VE6006":"networks",
        	"VE7000":"'ROLES",
        	"VE7001":"SERVER_COMMON",
        	"VE7002":"server_username",
        	"VE8000":"SERVERS",
        	"VE8001":"rack_info",
        	"VE8002":"rack_id",
        	"VE8003":"ucsm_info",
        	"VE8004":"server_type",
        	"VE8005":"chassis_id",
        	"VE8006":"blade_id",
        	"VE8007":"server_type",
        	"VE8008":"rack-unit_id",
        	"VE8009":"cimc_info",
        	"VE8010":"cimc_ip",
        	"VE8011":"hardware_info",
        	"VE8012":"VIC_slot",
        	"VE8013":"boot_drive",
        	"VE8050":"external_lb_vip_address",
        	"VE8051":"VIRTUAL_ROUTER_ID",
        	"VE8052":"internal_lb_vip_address",
        	"VE8053":"ADMIN_USER",
        	"VE8054":"ADMIN_USER_PASSWORD",
        	"VE8055":"ADMIN_TENANT_NAME",
        	"VE8056":"TENANT_NETWORK_TYPES",
        	"VE8057":"MECHANISM_DRIVERS",
        	"VE8058":"TENANT_VLAN_RANGES",
        	"VE8059":"GLANCE_RBD_POOL",
        	"VE8060":"GLANCE_CLIENT_KEY",
        	"VE8061":"STORE_BACKEND",
        	"VE8062":"VOLUME_DRIVER",
        	"VE8063":"VOLUME_GROUP",
        	"VE8064":"CINDER_RBD_POOL",
        	"VE8065":"CINDER_CLIENT_KEY",
        	"VE8066":"GLANCE_RBD_POOL",
        	"VE8067":"CLUSTER_ID",
        	"VE8068":"MON_MEMBERS'",
        	"VE8069":"SECRET_UUID",
        	"VE8070":"MON_HOSTS",
        	"VE8071":"ENABLE_JUMBO_FRAMES",
        	"VE8072":"NUMA_SUPPORT",
        	"VE9000":"VMTP_VALIDATION",
        	"VE9001":"PROV_NET",
        	"VE9002":"EXT_NET",
        	"VE9003":"NET_SUBNET",
        	"VE9004":"DNS_SERVER",
        	"VE9005":"NET_IP_START",
        	"VE9006":"NET_IP_END",
        	"VE9007":"NET_GATEWAY",
        	"VE9008":"SEGMENTATION_ID",
        	"VE9009":"OPTIONAL_SERVICE_LIST"
        });
}());