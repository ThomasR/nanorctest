examples.push({
    title: 'Autoconf',
    nanorc: `syntax "Autoconf" "\\.(a[ct]|m4)\$"

# unknown macros, all-caps identifiers
color yellow "\\<[[:upper:][:digit:]]+_[[:upper:][:digit:]_]+\\>"

# M4 macros
color brightyellow "\\<__(file|o?line)__\\>" "\\<AS_(BOURNE_COMPATIBLE|BOX|CASE|DIRNAME|ECHO|ECHO_N|ESCAPE|EXECUTABLE_P|EXIT|HELP_STRING|IF|INIT|INIT_GENERATED|LINENO_PREPARE|LITERAL_IF|LITERAL_WORD_IF|ME_PREPARE|MESSAGE_FD|MESSAGE_LOG_FD|MKDIR_P|ORIGINAL_STDIN_FD|SET_CATFILE|SET_STATUS|SHELL_SANITIZE|TMPDIR|TR_CPP|TR_SH|UNSET|VAR_APPEND|VAR_ARITH|VAR_COPY|VAR_IF|VAR_POPDEF|VAR_PUSHDEF|VAR_SET|VAR_SET_IF|VAR_TEST_SET|VERSION_COMPARE)\\>" "\\<m4_(append|append_uniq|append_uniq_w|apply|argn|assert|bmatch|bpatsubst|bpatsubsts|bregexp|builtin|car|case|cdr|changecom|changequote|chomp|chomp_all|cleardivert|cmp|combine|cond|copy|copy_force|count|curry|debugfile|debugmode|decr|default|default_nblank|default_nblank_quoted|default_quoted|define|define_default|defn|divert|divert_once|divert_pop|divert_push|divert_text|divnum|do|dquote|dquote_elt|dumpdef|dumpdefs|echo|errprint|errprintn|escape|esyscmd|esyscmd_s|eval|exit|expand|fatal|flatten|for|foreach|foreach_w|format|if|ifblank|ifdef|ifnblank|ifndef|ifset|ifval|ifvaln|ignore|include|incr|index|indir|init|join|joinall|len|list_cmp|location|make_list|maketemp|map|map_args|map_args_pair|map_args_sep|map_args_w|map_sep|mapall|mapall_sep|max|min|mkstemp|n|newline|normalize|pattern_allow|pattern_forbid|popdef|pushdef|quote|re_escape|rename|rename_force|reverse|set_add|set_add_all|set_contains|set_contents|set_delete|set_difference|set_dump|set_empty|set_foreach|set_intersection|set_list|set_listc|set_map|set_map_sep|set_remove|set_size|set_union|shift|shift2|shift3|shiftn|sign|sinclude|split|stack_foreach|stack_foreach_lifo|stack_foreach_sep|stack_foreach_sep_lifo|strip|substr|syscmd|sysval|text_box|text_wrap|tolower|toupper|traceoff|traceon|translit|undefine|undivert|unquote|version_compare|version_prereq|warn|wrap|wrap_lifo)\\>" "\\<PKG_(CHECK_EXISTS|CHECK_MODULES|CONFIG_PATH|ERRORS|PROG_PKG_CONFIG|SHORT_ERRORS_SUPPORTED|TEXT)\\>"
# autoconf macros
color brightyellow "\\<AC_(AIX|ALLOCA|ARG_ARRAY|ARG_ENABLE|ARG_PROGRAM|ARG_VAR|ARG_WITH|AUTOCONF_VERSION|BEFORE|CACHE_CHECK|CACHE_LOAD|CACHE_SAVE|CACHE_VAL|CANONICAL_BUILD|CANONICAL_HOST|CANONICAL_SYSTEM|CANONICAL_TARGET|CHAR_UNSIGNED|CHECKING|CHECK_ALIGNOF|CHECK_DECL|CHECK_DECLS|CHECK_DECLS_ONCE|CHECK_FILE|CHECK_FILES|CHECK_FUNC|CHECK_FUNCS|CHECK_FUNCS_ONCE|CHECK_HEADER|CHECK_HEADERS|CHECK_HEADERS_ONCE|CHECK_HEADER_STDBOOL|CHECK_LIB|CHECK_MEMBER|CHECK_MEMBERS|CHECK_PROG|CHECK_PROGS|CHECK_SIZEOF|CHECK_TARGET_TOOL|CHECK_TARGET_TOOLS|CHECK_TOOL|CHECK_TOOLS|CHECK_TYPE|CHECK_TYPES|COMPILE_CHECK|COMPILE_IFELSE|COMPUTE_INT|CONFIG_AUX_DIR|CONFIG_COMMANDS|CONFIG_COMMANDS_POST|CONFIG_COMMANDS_PRE|CONFIG_FILES|CONFIG_HEADERS|CONFIG_LIBOBJ_DIR|CONFIG_LINKS|CONFIG_MACRO_DIR|CONFIG_SRCDIR|CONFIG_SUBDIRS|CONFIG_TESTDIR|CONST|COPYRIGHT|CROSS_CHECK|CYGWIN|C_BACKSLASH_A|C_BIGENDIAN|C_CHAR_UNSIGNED|C_CONST|C_CROSS|C_FLEXIBLE_ARRAY_MEMBER|C_INLINE|C_LONG_DOUBLE|C_PROTOTYPES|C_RESTRICT|C_STRINGIZE|C_TYPEOF|C_VARARRAYS|C_VOLATILE|DATAROOTDIR_CHECKED|DECL_SYS_SIGLIST|DECL_YYTEXT|DEFINE|DEFINE_UNQUOTED|DEFUN|DEFUN_ONCE|DIAGNOSE|DIR_HEADER|DISABLE_OPTION_CHECKING|DYNIX_SEQ|EGREP_CPP|EGREP_HEADER|EMXOS2|ENABLE|ERLANG_CHECK_LIB|ERLANG_NEED_ERL|ERLANG_NEED_ERLC|ERLANG_PATH_ERL|ERLANG_PATH_ERLC|ERLANG_SUBST_ERTS_VER|ERLANG_SUBST_INSTALL_LIB_DIR|ERLANG_SUBST_INSTALL_LIB_SUBDIR|ERLANG_SUBST_LIB_DIR|ERLANG_SUBST_ROOT_DIR|ERROR|EXEEXT|F77_DUMMY_MAIN|F77_FUNC|F77_IMPLICIT_NONE|F77_LIBRARY_LDFLAGS|F77_MAIN|F77_WRAPPERS|FATAL|FC_CHECK_BOUNDS|FC_DUMMY_MAIN|FC_FIXEDFORM|FC_FREEFORM|FC_FUNC|FC_IMPLICIT_NONE|FC_LIBRARY_LDFLAGS|FC_LINE_LENGTH|FC_MAIN|FC_MODULE_EXTENSION|FC_MODULE_FLAG|FC_MODULE_OUTPUT_FLAG|FC_PP_DEFINE|FC_PP_SRCEXT|FC_SRCEXT|FC_WRAPPERS|FIND_X|FIND_XTRA|FOREACH|FUNC_ALLOCA|FUNC_CHECK|FUNC_CHOWN|FUNC_CLOSEDIR_VOID|FUNC_ERROR_AT_LINE|FUNC_FNMATCH|FUNC_FNMATCH_GNU|FUNC_FORK|FUNC_FSEEKO|FUNC_GETGROUPS|FUNC_GETLOADAVG|FUNC_GETMNTENT|FUNC_GETPGRP|FUNC_LSTAT|FUNC_LSTAT_FOLLOWS_SLASHED_SYMLINK|FUNC_MALLOC|FUNC_MBRTOWC|FUNC_MEMCMP|FUNC_MKTIME|FUNC_MMAP|FUNC_OBSTACK|FUNC_REALLOC|FUNC_SELECT_ARGTYPES|FUNC_SETPGRP|FUNC_SETVBUF_REVERSED|FUNC_STAT|FUNC_STRCOLL|FUNC_STRERROR_R|FUNC_STRFTIME|FUNC_STRNLEN|FUNC_STRTOD|FUNC_STRTOLD|FUNC_UTIME_NULL|FUNC_VPRINTF|FUNC_WAIT3|GCC_TRADITIONAL|GETGROUPS_T|GETLOADAVG|GNU_SOURCE|HAVE_FUNCS|HAVE_HEADERS|HAVE_LIBRARY|HAVE_POUNDBANG|HEADER_ASSERT|HEADER_CHECK|HEADER_DIRENT|HEADER_EGREP|HEADER_MAJOR|HEADER_RESOLV|HEADER_STAT|HEADER_STDBOOL|HEADER_STDC|HEADER_SYS_WAIT|HEADER_TIME|HEADER_TIOCGWINSZ|HELP_STRING|INCLUDES_DEFAULT|INIT|INLINE|INT_16_BITS|IRIX_SUN|ISC_POSIX|LANG|LANG_ASSERT|LANG_C|LANG_CALL|LANG_CONFTEST|LANG_CPLUSPLUS|LANG_DEFINES_PROVIDED|LANG_FORTRAN77|LANG_FUNC_LINK_TRY|LANG_POP|LANG_PROGRAM|LANG_PUSH|LANG_RESTORE|LANG_SAVE|LANG_SOURCE|LANG_WERROR|LIBOBJ|LIBSOURCE|LIBSOURCES|LINK_FILES|LINK_IFELSE|LN_S|LONG_64_BITS|LONG_DOUBLE|LONG_FILE_NAMES|MAJOR_HEADER|MEMORY_H|MINGW32|MINIX|MINUS_C_MINUS_O|MMAP|MODE_T|MSG_CHECKING|MSG_ERROR|MSG_FAILURE|MSG_NOTICE|MSG_RESULT|MSG_WARN|OBJEXT|OBSOLETE|OFF_T|OPENMP|OUTPUT|OUTPUT_COMMANDS|PACKAGE_BUGREPORT|PACKAGE_NAME|PACKAGE_STRING|PACKAGE_TARNAME|PACKAGE_URL|PACKAGE_VERSION|PATH_PROG|PATH_PROGS|PATH_PROGS_FEATURE_CHECK|PATH_TARGET_TOOL|PATH_TOOL|PATH_X|PATH_XTRA|PID_T|PREFIX|PREFIX_DEFAULT|PREFIX_PROGRAM|PREPROC_IFELSE|PREREQ|PRESERVE_HELP_ORDER|PROGRAMS_CHECK|PROGRAMS_PATH|PROGRAM_CHECK|PROGRAM_EGREP|PROGRAM_PATH|PROG_AWK|PROG_CC|PROG_CC_C89|PROG_CC_C99|PROG_CC_C_O|PROG_CC_STDC|PROG_CPP|PROG_CPP_WERROR|PROG_CXX|PROG_CXXCPP|PROG_CXX_C_O|PROG_EGREP|PROG_F77|PROG_F77_C_O|PROG_FC|PROG_FC_C_O|PROG_FGREP|PROG_GCC_TRADITIONAL|PROG_GREP|PROG_INSTALL|PROG_LEX|PROG_LN_S|PROG_MAKE_SET|PROG_MKDIR_P|PROG_OBJC|PROG_OBJCPP|PROG_OBJCXX|PROG_OBJCXXCPP|PROG_RANLIB|PROG_SED|PROG_YACC|REMOTE_TAPE|REPLACE_FNMATCH|REPLACE_FUNCS|REQUIRE|REQUIRE_AUX_FILE|REQUIRE_CPP|RESTARTABLE_SYSCALLS|RETSIGTYPE|REVISION|RSH|RUN_IFELSE|SCO_INTL|SEARCH_LIBS|SETVBUF_REVERSED|SET_MAKE|SIZEOF_TYPE|SIZE_T|STAT_MACROS_BROKEN|STDC_HEADERS|STRCOLL|STRUCT_DIRENT_D_INO|STRUCT_DIRENT_D_TYPE|STRUCT_ST_BLKSIZE|STRUCT_ST_BLOCKS|STRUCT_ST_RDEV|STRUCT_TIMEZONE|STRUCT_TM|ST_BLKSIZE|ST_BLOCKS|ST_RDEV|SUBST|SUBST_FILE|SYS_INTERPRETER|SYS_LARGEFILE|SYS_LONG_FILE_NAMES|SYS_POSIX_TERMIOS|SYS_RESTARTABLE_SYSCALLS|SYS_SIGLIST_DECLARED|TEST_CPP|TEST_PROGRAM|TIMEZONE|TIME_WITH_SYS_TIME|TRY_COMPILE|TRY_CPP|TRY_LINK|TRY_LINK_FUNC|TRY_RUN|TYPE_GETGROUPS|TYPE_INT16_T|TYPE_INT32_T|TYPE_INT64_T|TYPE_INT8_T|TYPE_INTMAX_T|TYPE_INTPTR_T|TYPE_LONG_DOUBLE|TYPE_LONG_DOUBLE_WIDER|TYPE_LONG_LONG_INT|TYPE_MBSTATE_T|TYPE_MODE_T|TYPE_OFF_T|TYPE_PID_T|TYPE_SIGNAL|TYPE_SIZE_T|TYPE_SSIZE_T|TYPE_UID_T|TYPE_UINT16_T|TYPE_UINT32_T|TYPE_UINT64_T|TYPE_UINT8_T|TYPE_UINTMAX_T|TYPE_UINTPTR_T|TYPE_UNSIGNED_LONG_LONG_INT|UID_T|UNISTD_H|USE_SYSTEM_EXTENSIONS|USG|UTIME_NULL|VALIDATE_CACHED_SYSTEM_TUPLE|VERBOSE|VFORK|VPRINTF|WAIT3|WARN|WARNING|WITH|WORDS_BIGENDIAN|XENIX_DIR|YYTEXT_POINTER)\\>" "\\<AH_(BOTTOM|HEADER|TEMPLATE|TOP|VERBATIM)\\>" "\\<AU_(ALIAS|DEFUN)\\>"
# automake macros
color brightyellow "\\<(_AM_DEPENDENCIES|m4_include)\\>" "\\<AC_(CANONICAL_BUILD|CANONICAL_HOST|CANONICAL_TARGET|CONFIG_AUX_DIR|CONFIG_FILES|CONFIG_HEADERS|CONFIG_LIBOBJ_DIR|CONFIG_LINKS|CONFIG_SUBDIRS|DEFUN|F77_LIBRARY_LDFLAGS|FC_SRCEXT|ICONV|INIT|LIBOBJ|LIBSOURCE|LIBSOURCES|OUTPUT|PREREQ|PROG_CXX|PROG_F77|PROG_FC|PROG_LEX|PROG_LIBTOOL|PROG_OBJC|PROG_OBJCXX|PROG_RANLIB|PROG_YACC|REQUIRE_AUX_FILE|SUBST)\\>" "\\<AM_(CONDITIONAL|COND_IF|DEP_TRACK|GNU_GETTEXT|GNU_GETTEXT_INTL_SUBDIR|GNU_GETTEXT_VERSION|GNU_GETTEXT_NEED|INIT_AUTOMAKE|MAINTAINER_MODE|MAINTAINER_MODE|MAKE_INCLUDE|MISSING_PROG|OUTPUT_DEPENDENCY_COMMANDS|PATH_LISPDIR|PATH_PYTHON|PO_SUBDIRS|PROG_AR|PROG_AS|PROG_CC_C_O|PROG_GCJ|PROG_INSTALL_STRIP|PROG_LEX|PROG_MKDIR_P|PROG_UPC|PROG_VALAC|SANITY_CHECK|SET_DEPDIR|SILENT_RULES|SUBST_NOTMAKE|WITH_DMALLOC|XGETTEXT_OPTION)\\>"
# autotest macros
color brightyellow "\\<AT_(ARG_OPTION|ARG_OPTION_ARG|BANNER|CAPTURE_FILE|CHECK|CHECK_EUNIT|CHECK_UNQUOTED|CLEANUP|COLOR_TESTS|COPYRIGHT|DATA|FAIL_IF|INIT|KEYWORDS|PACKAGE_BUGREPORT|PACKAGE_NAME|PACKAGE_STRING|PACKAGE_TARNAME|PACKAGE_URL|PACKAGE_VERSION|SETUP|SKIP_IF|TESTED|XFAIL_IF)\\>"

# Version numbers
color magenta "\\<[-_.[:digit:]]+\\>"

# cache variables
color red "\\<ac_cv_(alignof_[a-z_]+|c_const|c_int16_t|c_int32_t|c_int64_t|c_int8_t|c_restrict|c_uint16_t|c_uint32_t|c_uint64_t|c_uint8_t|f77_compiler_gnu|f77_dummy_main|f77_implicit_none|f77_libs|f77_main|f77_mangling|fc_check_bounds|fc_compiler_gnu|fc_dummy_main|fc_fixedform|fc_freeform|fc_implicit_none|fc_libs|fc_line_length|fc_main|fc_mangling|fc_module_ext|fc_module_flag|fc_module_output_flag|fc_pp_define|fc_pp_srcext_[a-z_]+|fc_srcext_[a-z_]+|file_[a-z_]+|func_chown_works|func_closedir_void|func_fnmatch_gnu|func_fnmatch_works|func_[a-z_]+|func_getgroups_works|func_getpgrp_void|func_lstat_dereferences_slashed_symlink|func_lstat_empty_string_bug|func_malloc_0_nonnull|func_mbrtowc|func_memcmp_working|func_mmap_fixed_mapped|func_obstack|func_pow|func_realloc_0_nonnull|func_setpgrp_void|func_stat_empty_string_bug|func_strcoll_works|func_strerror_r_char_p|func_strnlen_working|func_strtod|func_strtold|func_utime_null|func_working_mktime|have_decl_[a-z_]+|header_[a-z_]+|header_stdbool_h|header_stdc|header_sys_wait_h|header_time|lib_error_at_line|lib_[a-z_]+|member_[a-z_]+|member_struct_stat_st_blocks|path_install|path_mkdir|path_SED|path_[a-z_]+|prog_AWK|prog_c_openmp|prog_cc_c89|prog_cc_c99|prog_cc_[a-z_]+_c_o|prog_cc_stdc|prog_cxx_openmp|prog_EGREP|prog_f77_c_o|prog_f77_g|prog_f77_openmp|prog_f77_v|prog_fc_c_o|prog_fc_g|prog_fc_openmp|prog_fc_v|prog_FGREP|prog_GREP|prog_LEX|prog_[a-z_]+|prog_YACC|search_[a-z_]+|search_getmntent|sizeof_[a-z_]+|sys_posix_termios|type_getgroups|type_long_double|type_long_double_wider|type_long_long_int|type_mbstate_t|type_mode_t|type_off_t|type_pid_t|type_size_t|type_ssize_t|type_[a-z_]+|type_uid_t|type_unsigned_long_long_int)\\>"

# SH keywords, builtins, commands
color brightwhite "\\<(break|case|cd|continue|do|done|echo|elif|else|esac|eval|exec|exit|export|false|fi|for|if|in|let|local|printf|pwd|read|return|select|set|shift|source|test|then|time|trap|true|unset|until|wait|while)\\>"
color brightcyan "\\<(awk|basename|cat|cc|chgrp|chown|chmod|clear|cmp|cp(io)?|date|diff|dirname|egrep|env|expr|expr|expr|fgrep|find|[efr]?grep|install|join|ln|ls|kill(all)?|make|mkdir|mkfifo|mknod|mktemp|mv|od|rm(dir)?|sed|se[dt]|sleep|sort|tar|touch|tr|umask|uname|which)\\>"

# operators
color brightred "[][()<>{},;|&!=]"

# "Strings"
color green ""(\\\\.|[^\\"])*"" "'(\\\\.|[^\\'])*'"

# command substitution
color brightgreen start="\\\$\\(" end="\\)" "\`.*?\`"

# variables
icolor brightblue "\\\$[a-z0-9_]+" "^[[:space:]]*[a-z0-9_]+=" start="\\\$\\{" end="}"
icolor brightmagenta "\\\$\\\$[a-z0-9_]+" start="\\\$\\\$\\{" end="}"
# environment variables
color blue "\\\$(BIN_SH|CC|CDPATH|CFLAGS|CLICOLOR_FORCE|CONFIG_COMMANDS|CONFIG_FILES|CONFIG_HEADERS|CONFIG_LINKS|CONFIG_SHELL|CONFIG_SITE|CONFIG_STATUS|CPP|CPPFLAGS|CXX|CXXCPP|CXXFLAGS|CYGWIN|DUALCASE|ENV|ERL|ERLC|ERLCFLAGS|F77|FC|FCFLAGS|FFLAGS|FPATH|GOFLAGS|GREP_OPTIONS|IFS|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_COLLATE|LC_CTYPE|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MESSAGES|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LDFLAGS|LIBS|LINENO|M4|MAIL|MAILPATH|NULLCMD|OBJC|OBJCFLAGS|OBJCPP|OBJCXX|OBJCXXCPP|OBJCXXFLAGS|PATH_SEPARATOR|POSIXLY_CORRECT|PS1|PS2|PS4|PWD|RANDOM|SHELL|SIMPLE_BACKUP_SUFFIX|TMPDIR|WARNINGS|XMKMF|YACC|YFLAGS|options|status)\\>"

# Error lines:
color brightyellow,red "^\\*\\*\\*.*"

# comments
color cyan "^[[:space:]]*dnl .*"
color brightblack "^[[:space:]]*#.*" "^[[:space:]]*dnl"
`,
    code: `dnl Process this file with autoconf to create configure.

AC_PREREQ([2.60])
AC_INIT([xscope], [1.3],
        [https://bugs.freedesktop.org/enter_bug.cgi?product=xorg], [xscope])
AM_INIT_AUTOMAKE([foreign dist-bzip2])
AM_MAINTAINER_MODE

AM_CONFIG_HEADER(config.h)

# Require X.Org macros 1.8 or later for MAN_SUBSTS set by XORG_MANPAGE_SECTIONS
m4_ifndef([XORG_MACROS_VERSION],
          [m4_fatal([must install xorg-macros 1.8 or later before running autoconf/autogen])])
XORG_MACROS_VERSION(1.8)

AC_USE_SYSTEM_EXTENSIONS
XORG_DEFAULT_OPTIONS

AC_ARG_ENABLE(xtrans,    AS_HELP_STRING([--enable-xtrans],
                                        [Use xtrans for socket connections (default: auto)]),
              [XTRANS=\$enableval], [XTRANS=auto])

if test "x\$XTRANS" = xauto ; then
	PKG_CHECK_EXISTS(xtrans, [XTRANS=yes], [XTRANS=no])
fi

if test "x\$XTRANS" = xyes ; then
	dnl Issue an error if xtrans.m4 was not found and XTRANS_CONNECTION_FLAGS macro
	dnl was not expanded, since xscope with no transport types is rather useless.
	dnl
	dnl If you're seeing an error here, be sure you installed the lib/xtrans module
	dnl first and if it's not in the default location, that you set the ACLOCAL
	dnl environment variable to find it, such as:
	dnl     ACLOCAL="aclocal -I \${PREFIX}/share/aclocal"
	m4_pattern_forbid([XTRANS_CONNECTION_FLAGS])

	# Transport selection macro from xtrans.m4
	XTRANS_CONNECTION_FLAGS

	# Checks for pkg-config packages
	PKG_CHECK_MODULES(XSCOPE, xtrans)
	AC_DEFINE([USE_XTRANS], [1], [Use xtrans for socket connection code])
fi

AC_CHECK_FUNCS([getdtablesize])
AC_CHECK_HEADERS([sys/filio.h])

dnl Allow checking code with lint, sparse, etc.
XORG_WITH_LINT

AC_OUTPUT([Makefile])

dnl
dnl Copyright (c) 2008, Oracle and/or its affiliates. All rights reserved.
dnl
dnl Permission is hereby granted, free of charge, to any person obtaining a
dnl copy of this software and associated documentation files (the "Software"),
dnl to deal in the Software without restriction, including without limitation
dnl the rights to use, copy, modify, merge, publish, distribute, sublicense,
dnl and/or sell copies of the Software, and to permit persons to whom the
dnl Software is furnished to do so, subject to the following conditions:
dnl
dnl The above copyright notice and this permission notice (including the next
dnl paragraph) shall be included in all copies or substantial portions of the
dnl Software.
dnl
dnl THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
dnl IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
dnl FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
dnl THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
dnl LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
dnl FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
dnl DEALINGS IN THE SOFTWARE.
dnl
`
});
