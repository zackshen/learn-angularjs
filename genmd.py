from os.path import abspath, dirname, isdir
from os.path import join as joinpath
from os.path import exists as existspath
import glob

cdir = dirname(abspath(__file__))

def main():

    outline = joinpath(cdir, "README.md")

    for fname in glob.glob('*'):
        if fname in ('node_modules', 'bower_components', '.git'):
            continue

        if isdir(joinpath(cdir, fname)):
            module_path = joinpath(cdir, fname)
            readme_file = joinpath(module_path, 'README.md')

            if not existspath(readme_file):
                with open(readme_file, 'w') as fp:
                    fp.writelines('##%s'%fname)

                with open(outline, 'a') as fp:
                    fp.write("* [%s](%s/README.md)\n\n" %(fname, fname))

if __name__ == '__main__':
    main()
