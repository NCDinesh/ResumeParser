from django.shortcuts import render
from django.http import HttpResponse
import spacy
import fitz
import os

nlp = spacy.load('D:\Minor Project and Major project\Minor_Project\model\output80\model-best')  # Path to your trained model

def parse_resumes(request):
    if request.method == 'POST' and request.FILES.getlist('resumes'):
        resume_files = request.FILES.getlist('resumes')
        path = r'D:\Minor Project and Major project\Minor_Project\test'
        entities_list = []

        for resume_file in resume_files:
            fname = os.path.join(path, resume_file.name)
            doc = fitz.open(fname)
            text = " "
            for page in doc:
                text = text + str(page.get_text())
            doc = nlp(text)
            entities = [{'text': ent.text, 'label': ent.label_} for ent in doc.ents]
            entities_list.extend(entities)

        # Pass both entities_list and entitiesListFromDjango to the template
        return render(request, 'table.html', {'entities_list': entities_list, 'entitiesListFromDjango': entities_list})

    return render(request, 'index.html')
