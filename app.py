from flask import Flask, request, render_template

app = Flask(__name__)

class Lizard:
    def __init__(self, name, age, length, species=None, fiftyone="Reptilia"):
        self.name = name
        self.species = species if species else fiftyone
        self.age = age
        self.length = length

    def bask_in_sun(self):
        return f"{self.name} the {self.species} is basking in the sun."

    def shed_skin(self):
        return f"{self.name} is shedding its skin."

    def eat(self, food):
        return f"{self.name} is eating {food}."

    def describe_lizard(self):
        return (
            f"Meet {self.name}, a {self.age}-year-old {self.species} lizard. "
            f"This lively creature is {self.length} inches long and loves to bask in the sun, "
            f"shed its skin, and munch on tasty treats like crickets. {self.name} is truly one of a kind!"
        )

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/lizard', methods=['POST'])
def lizard():
    name = request.form['name']
    age = int(request.form['age'])
    length = int(request.form['length'])
    species = request.form['species']

    my_lizard = Lizard(name=name, age=age, length=length, species=species)
    description = my_lizard.describe_lizard()

    return render_template('result.html', description=description)

if __name__ == '__main__':
    app.run(debug=True)
