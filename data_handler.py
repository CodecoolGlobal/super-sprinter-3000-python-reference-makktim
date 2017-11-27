import csv

DATA_FILE_PATH = 'data.csv'
DATA_HEADER = ['id', 'title', 'user_story', 'acceptance_criteria', 'business_value', 'estimation', 'status']


def get_all_user_story():
    #  create a temporary list to read each line
    user_stories = []

    #  open csv file to read
    with open(DATA_FILE_PATH, encoding='utf-8') as csvfile:
        #  use DictReader to directly create dictionaries from each lines in the csv file
        reader = csv.DictReader(csvfile)

        #  read all lines in csv file
        for row in reader:
            #  make a copy of the read row, since we can't modify it
            user_story = dict(row)

            #  allow multiline strings to display in HTML
            user_story['user_story'] = user_story['user_story']
            user_story['acceptance_criteria'] = user_story['acceptance_criteria']

            #  store modified data in temporary list
            user_stories.append(user_story)

    # return the temporary list
    return user_stories


def add_user_story(story):
    print(story)
