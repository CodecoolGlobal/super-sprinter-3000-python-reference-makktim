import csv

DATA_FILE_PATH = 'data.csv'
DATA_HEADER = ['id', 'title', 'story', 'criteria', 'value', 'estimation', 'status']


def get_all_user_story():
    #  create a temporary list to read each line
    user_stories = []

    #  open csv file to read
    with open(DATA_FILE_PATH) as csvfile:
        #  use DictReader to directly create dictionaries from each lines in the csv file
        reader = csv.DictReader(csvfile)

        #  read all lines in csv file
        for row in reader:
            #  make a copy of the read row, since we can't modify it
            user_story = row

            #  allow multiline strings to display in HTML
            user_story['story'] = user_story['story'].replace('\n', '<br>')
            user_story['criteria'] = user_story['criteria'].replace('\n', '<br>')

            #  store modified data in temporary list
            user_stories.append(user_story)

    # return the temporary list
    return user_stories


def add_user_story(story):
    print(story)
