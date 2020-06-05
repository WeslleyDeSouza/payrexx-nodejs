/**
 * Gulp
 */
'use strict';

let gulp = require('gulp');
let ts   = require('gulp-typescript');


let serverTsProject = ts.createProject('tsconfig.json');

//---------------------------------------------------Functions
const startMessage = () =>{
	console.log('Running GULP...')
}

//---------------------------------------------------TASKS
gulp.task("default", function () {
	startMessage();
	return serverTsProject.src()
		.pipe(serverTsProject())
		 .js.pipe(gulp.dest("./dist"));
});

gulp.task("prod", function () {

	//for(let folder of ['']) gulp.src('./'+folder+'/ts/**/!(*.ts|*.js|)').pipe(gulp.dest('./dist/'+folder));

	return serverTsProject.src()
		  .pipe(serverTsProject())
	    	.js.pipe(gulp.dest("./dist"));
});

gulp.task('watch', () => {
	gulp.watch('./**/*.ts', [ 'default' ]);
});

