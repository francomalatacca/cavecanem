module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        watch: {
            grunt: {
                files: ["Gruntfile.js", "package.json"],
                tasks: "default"
            },
            javascript: {
                files: ["index.js", "test/*.js"],
                tasks: "test"
            }
        },
        mochacli: {
            options: {
                reporter: "nyan",
                ui: "tdd"
            },
            all: ["test/*Test.js"]
        },
        jshint: {
            all: [
                "Gruntfile.js",
                "index.js"
            ],
            options: {
                jshintrc: ".jshintrc"
            }
        },
        uglify: {
          scripts: {
            expand: true,
            cwd: './',
            src: '**.js',
            dest: 'build/',
            ext: '.min.js'
          }
        }
    });
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-mocha-cli");

  grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.registerTask("test", ["jshint", "mochacli"]);
    grunt.registerTask("build",["jshint", "uglify"]);
    grunt.registerTask("default", ["test"]);
};
