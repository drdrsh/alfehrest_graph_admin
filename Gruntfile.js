module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
		serve: {
			options: {
				port: 9000,
				serve: {
					path: './dev/'
				}
			}
		},
        
        "bower-install-simple": {
            options: {
                color: true 
            },
            "prod": {
                options: {
                    production: true
                }
            },
            "dev": {
                options: {
                    production: false
                }
            }
        },
        
        concat: {
            dev: {
                /*
                "jquery-ui": {
                    options: {
                          separator: ';',
                    },
                    src: [
                        'bower_components/jquery-ui/ui/core.js',
                        'bower_components/jquery-ui/ui/widget.js',
                        'bower_components/jquery-ui/ui/mouse.js',
                        'bower_components/jquery-ui/ui/position.js',
                        'bower_components/jquery-ui/ui/draggable.js',
                        'bower_components/jquery-ui/ui/resizable.js',
                        'bower_components/jquery-ui/ui/button.js',
                        'bower_components/jquery-ui/ui/dialog.js'
                    ],
                    dest: 'bower_components/jquery-ui/jquery-ui.js'
                },
                */
            }
        },     
        bowercopy: {
            dev: {
                options: {
                    clean: false
                },
                files: {
                    "dev/assets/lib/jquery/js/jquery.js" : "./jquery/dist/jquery.js",
                    
                    "dev/assets/lib/jquery-calendars/js/jquery.plugin.js": "./jq-calendars/jquery.plugin.js",
                    "dev/assets/lib/jquery-calendars/js/jquery.calendars.all.js": "./jq-calendars/jquery.calendars.all.js",
                    "dev/assets/lib/jquery-calendars/js/jquery.calendars.js": "./jq-calendars/jquery.calendars.js",
                    "dev/assets/lib/jquery-calendars/js/jquery.calendars.lang.js": "./jq-calendars/jquery.calendars.lang.js",
                    "dev/assets/lib/jquery-calendars/js/jquery.calendars.islamic.js": "./jq-calendars/jquery.calendars.islamic.js",
                    "dev/assets/lib/jquery-calendars/js/jquery.calendars.islamic-ar.js": "./jq-calendars/jquery.calendars.islamic-ar.js",
                    "dev/assets/lib/jquery-calendars/js/jquery.calendars.julian.js":  "./jq-calendars/jquery.calendars.julian.js",
                    "dev/assets/lib/jquery-calendars/js/jquery.calendars.picker.js": "./jq-calendars/jquery.calendars.picker.js",
                    "dev/assets/lib/jquery-calendars/js/jquery.calendars.picker.lang.js": "./jq-calendars/jquery.calendars.picker.lang.js",
                    "dev/assets/lib/jquery-calendars/css/jquery.calendars.picker.css": "./jq-calendars/jquery.calendars.picker.css"
                }
            }
        },
        
        "expand-in-place": {
            'dev': { //specify a target with any name
                target: ['dev/*.html']
            }
        }
    });
    
    grunt.loadNpmTasks("grunt-bower-install-simple");
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-bowercopy');
    grunt.loadNpmTasks('grunt-expand-in-place');
    grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-serve');
    
    // task setup 
    grunt.registerTask('default', ['bower-install-simple', 'bowercopy']);
    grunt.registerTask('dev', ['bower-install-simple:dev', 'concat:dev', 'bowercopy:dev', 'expand-in-place:dev', 'serve']);
};