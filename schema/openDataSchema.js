var _ = require('underscore');

module.exports = function (additionals, overrides) {
  additionals = _.isArray(additionals) ? additionals : [];
  overrides = _.isObject(overrides) ? overrides : {};
  
  function conditional (field) {
    return _.contains(additionals, field);
  }
  
  var core = {
    
    title: {
      type: "string",
      required: true,
      description: "Human-readable name of the asset. Should be in plain English and include sufficient detail to facilitate search and discovery."
    },
    
    description: {
      type: "string",
      required: true,
      description: "Human-readable description (e.g., an abstract) with sufficient detail to enable a user to quickly understand whether the asset is of interest."
    },
    
    keyword: {
      type: "string",
      required: true,
      description: "Tags (or keywords) help users discover your dataset, please include terms that would be used by technical and non-technical users."
    },
    
    modified: {
      type: "string",
      format: "date",
      required: true,
      description: "Most recent date on which the dataset was changed, updated or modified."
    },
    
    publisher: {
      type: "string",
      required: true,
      description: "The publishing agency."
    },
    
    person: {
      type: "string",
      required: true,
      description: "Contact person’s name for the asset."
    },
    
    mbox: {
      type: "string",
      required: true,
      description: "Contact person’s email address."
    },
    
    identifier: {
      type: ["string", "integer"],
      required: true,
      description: "A unique identifier for the dataset or API as maintained within an Agency catalog or database."
    },
    
    accessLevel: {
      type: "string",
      required: true,
      "enum": ["Public", "Restricted", "Private"],
      description: "The degree to which this dataset could be made publicly-available, regardless of whether it has been made available. Choices: Public (is or could be made publicly available), Restricted (available under certain conditions), or Private (never able to be made publicly available)"
    }
    
  },
    
  extras = {
    
    dataDictionary: {
      type: "string",
      format: "url",
      required: conditional(),
      description: "URL to the data dictionary for the dataset or API. Note that documentation other than a Data Dictionary can be referenced using Related Documents as shown in the expanded fields."
    },
    
    accessURL: {
      type: "string",
      format: "url",
      required: conditional(),
      description: "URL providing direct access to the downloadable distribution of a dataset."
    },
    
    webService: {
      type: "string",
      format: "url",
      required: conditional("webService"),
      description: "Endpoint of web service to access dataset."
    },
    
    format: {
      type: ["string", "array"],
      required: conditional("format"),
      description: "The file format or API type of the distribution."
    },
    
    license: {
      type: "string",
      required: conditional("license"),
      description: "The license dataset or API is published with. See [Open Licenses](http://project-open-data.github.io/open-licenses/) for more information."
    },
    
    spatial: {
      required: conditional("spatial"),
      description: "The range of spatial applicability of a dataset. Could include a spatial region like a bounding box or a named place. This field should contain one of the following types of content: (1) a bounding coordinate box for the dataset represented in latitude / longitude pairs where the coordinates are specified in decimal degrees and in the order of: minimum longitude, minimum latitude, maximum longitude, maximum latitude; (2) a latitude / longitude pair (in decimal degrees) representing a point where the dataset is relevant; (3) a geographic feature expressed in [Geography Markup Language using the Simple Features Profile](http://www.ogcnetwork.net/gml-sf); or (4) a geographic feature from the [GeoNames database](http://www.geonames.org/)."
    },
    
    temporal: {
      required: conditional("temporal"),
      description: "The range of temporal applicability of a dataset (i.e., a start and end date of applicability for the data)."
    },
    
    issued: {
      type: "string",
      format: "date",
      required: conditional("issued"),
      description: "Date of formal issuance."
    },
    
    accrualPeriodicity: {
      type: "string",
      "enum": ["hourly", "daily", "weekly", "yearly", "other"],
      required: conditional("accrualPeriodicity"),
      description: "Frequency with which dataset is published."
    },
    
    language: {
      type: "string",
      required: conditional("language"),
      description: "The language of the dataset."
    },
    
    dataQuality: {
      type: "boolean",
      required: conditional("dataQuality"),
      description: "Whether the dataset meets the agency’s Information Quality Guidelines (true/false)."
    },
    
    theme: {
      type: "string",
      required: conditional("theme"),
      description: "Main thematic category of the dataset."
    },
    
    references: {
      type: "string",
      required: conditional("references"),
      description: "Related documents such as technical information about a dataset, developer documentation, etc."
    },
    
    landingPage: {
      type: "string",
      format: "url",
      required: conditional("landingPage"),
      description: "Alternative landing page used to redirect user to a contextual, Agency-hosted “homepage” for the Dataset or API when selecting this resource from the Data.gov user interface."
    },
    
    feed: {
      type: "string",
      format: "url",
      required: conditional("feed"),
      description: "URL for an RSS feed that provides access to the dataset."
    },
    
    systemOfRecords: {
      type: "string",
      format: "url",
      required: conditional("systemOfRecord"),
      description: "If the systems is designated as a system of records under the Privacy Act of 1974, provide the URL to the System of Records Notice related to this dataset."
    },
    
    distribution: {
      type: ["string", "array", "object"],
      required: conditional("distribution"),
      description: "Distribution is a concatenation, as appropriate, of the following elements: download url, format, endpoint, language, size."
    },
    
    size: {
      type: ["string", "integer"],
      required: conditional("size"),
      description: "Downloadable file size."
    }
    
  };
  
  return {
    type: "object",
    properties: _.extend(extras, overrides, core)
  };
  
};