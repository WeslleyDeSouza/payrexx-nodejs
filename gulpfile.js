/**
 *
 */
'use strict';

let gulp = require('gulp');
let ts   = require('gulp-typescript');
var art = require('ascii-art');

let serverTsProject = ts.createProject('tsconfig.json');

//---------------------------------------------------Functions
const startMessage = () =>{
	art.font('Wait for IT', 'Doom', function(rendered){
		console.log(art.style(rendered, ''));
		console.log('Running GULP...')
	});
}

//---------------------------------------------------TASKS
gulp.task("default", function () {

	startMessage();
	return serverTsProject.src()
		.pipe(serverTsProject())
		 .js.pipe(gulp.dest("./dist"));
});

gulp.task("prod", function () {

	//startMessage();

	for(let folder of ['driveAPI'])
		gulp.src('./'+folder+'/ts/**/!(*.ts|*.js|)').pipe(gulp.dest('./dist/'+folder));

	return serverTsProject.src()
		  .pipe(serverTsProject())
	    	.js.pipe(gulp.dest("./dist"));
});

gulp.task('watch', () => {
	gulp.watch('./**/*.ts', [ 'serverscripts' ]);
});

